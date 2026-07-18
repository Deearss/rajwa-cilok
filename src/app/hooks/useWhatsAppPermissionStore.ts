// src/app/hooks/useWhatsAppPermissionStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { showAlert } from "./useAlertStore";

interface WhatsAppPermissionState {
  isPermissionGranted: boolean | null; // null: not asked, true: granted, false: denied
  isPopupOpen: boolean;
  _pendingRedirectUrl: string | null; // Internal, for when popup is shown for a specific redirect
  _onRedirectSuccessCallback: (() => void) | null; // Internal

  // Actions
  showPopup: (options?: {
    redirectUrl?: string;
    onSuccess?: () => void;
  }) => void;
  grant: () => void;
  deny: () => void;
  close: () => void;
  requestRedirect: (url: string, onSuccess?: () => void) => void;
  initialize: () => void; // To load from storage and potentially show initial popup
}

export const useWhatsAppPermissionStore = create<WhatsAppPermissionState>()(
  persist(
    (set, get) => ({
      isPermissionGranted: null,
      isPopupOpen: false,
      _pendingRedirectUrl: null,
      _onRedirectSuccessCallback: null,

      initialize: () => {
        // Zustand's persist middleware handles loading `isPermissionGranted` from localStorage.
        // This function is called after rehydration.
        // If it's still null after loading, it means the user hasn't made a choice.
        // We then show the popup for general permission.
        if (get().isPermissionGranted === null) {
          set({
            isPopupOpen: true,
            _pendingRedirectUrl: null,
            _onRedirectSuccessCallback: null,
          });
        }
      },

      showPopup: (options?: {
        redirectUrl?: string;
        onSuccess?: () => void;
      }) => {
        set({
          isPopupOpen: true,
          _pendingRedirectUrl: options?.redirectUrl || null,
          _onRedirectSuccessCallback: options?.onSuccess || null,
        });
      },

      grant: () => {
        const { _pendingRedirectUrl, _onRedirectSuccessCallback } = get();
        set({ isPermissionGranted: true, isPopupOpen: false });

        if (_pendingRedirectUrl) {
          try {
            const newWindow = window.open(_pendingRedirectUrl, "_blank");
            if (newWindow) {
              newWindow.focus();
              if (_onRedirectSuccessCallback) _onRedirectSuccessCallback();
            } else {
              showAlert(
                "Gagal membuka WhatsApp. Pastikan popup blocker tidak aktif dan coba lagi. Anda mungkin perlu mengizinkan popup untuk situs ini secara manual di pengaturan browser Anda."
              );
            }
          } catch (error) {
            showAlert("Terjadi kesalahan saat mencoba membuka WhatsApp.");
            console.error("Error opening WhatsApp link:", error);
          }
        }
        set({ _pendingRedirectUrl: null, _onRedirectSuccessCallback: null });
      },

      deny: () => {
        set({
          isPermissionGranted: false,
          isPopupOpen: false,
          _pendingRedirectUrl: null,
          _onRedirectSuccessCallback: null,
        });
        showAlert(
          "Anda telah menolak izin untuk membuka WhatsApp saat ini. Anda dapat mengizinkan nanti jika diperlukan."
        );
      },

      close: () => {
        set({
          isPopupOpen: false,
          _pendingRedirectUrl: null,
          _onRedirectSuccessCallback: null,
        });
      },

      requestRedirect: (url: string, onSuccess?: () => void) => {
        const { isPermissionGranted } = get(); // get grant to call it directly if permission is true
        if (isPermissionGranted === true) {
          try {
            const newWindow = window.open(url, "_blank");
            if (newWindow) {
              newWindow.focus();
              if (onSuccess) onSuccess();
            } else {
              showAlert(
                "Gagal membuka WhatsApp. Pastikan popup blocker tidak aktif dan coba lagi. Anda mungkin perlu mengizinkan popup untuk situs ini secara manual di pengaturan browser Anda."
              );
            }
          } catch (error) {
            showAlert("Terjadi kesalahan saat mencoba membuka WhatsApp.");
            console.error("Error opening WhatsApp link:", error);
          }
        } else {
          if (isPermissionGranted === false) {
            showAlert(
              "Izin ke WhatsApp diperlukan untuk melanjutkan. Mohon izinkan pada dialog berikut."
            );
          }
          // Show popup to ask for permission for this specific redirect.
          // Pass the redirectUrl and onSuccess callback to be used if granted.
          set({
            isPopupOpen: true,
            _pendingRedirectUrl: url,
            _onRedirectSuccessCallback: onSuccess,
          });
        }
      },
    }),
    {
      name: "whatsapp-permission-storage", // Unique name for localStorage item
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isPermissionGranted: state.isPermissionGranted,
      }), // Only persist isPermissionGranted
      onRehydrateStorage: () => {
        // This is called when state is rehydrated from storage
        // We can call initialize here, but it's better to call it from a client component
        // to ensure it runs after the app is fully mounted.
        // console.log("WhatsApp permission state rehydrated:", state?.isPermissionGranted);
      },
    }
  )
);

// Export convenience functions for direct use
export const showWhatsAppPermissionPopup = (options?: {
  redirectUrl?: string;
  onSuccess?: () => void;
}) => {
  useWhatsAppPermissionStore.getState().showPopup(options);
};

export const requestWhatsAppRedirect = (
  url: string,
  onSuccess?: () => void
) => {
  useWhatsAppPermissionStore.getState().requestRedirect(url, onSuccess);
};

export const initializeWhatsAppLogic = () => {
  // The initialization logic (checking if isPermissionGranted is null and showing popup)
  // is now part of the `initialize` method in the store.
  // This function will call that method.
  // It's crucial this runs on the client side after hydration.
  useWhatsAppPermissionStore.getState().initialize();
};
