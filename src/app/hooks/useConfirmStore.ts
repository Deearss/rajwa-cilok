import { create } from "zustand";

interface ConfirmState {
  isOpen: boolean;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string; // e.g., 'green', 'red', or a hex code, or a class name
  onConfirm: (() => void) | null;
  onCancel: (() => void) | null;
  showConfirm: (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
    options?: {
      confirmButtonText?: string;
      cancelButtonText?: string;
      confirmButtonColor?: string;
    }
  ) => void;
  hideConfirm: () => void;
}

const useConfirmStore = create<ConfirmState>((set) => ({
  isOpen: false,
  message: "",
  confirmButtonText: "Ya, Lanjutkan", // Default confirm button text
  cancelButtonText: "Batal", // Default cancel button text
  confirmButtonColor: undefined, // Default confirm button color (will use standard button style)
  onConfirm: null,
  onCancel: null,
  showConfirm: (message, onConfirm, onCancel, options) => {
    set({
      isOpen: true,
      message,
      onConfirm,
      onCancel: onCancel || (() => set({ isOpen: false })), // Default onCancel closes the confirm
      confirmButtonText: options?.confirmButtonText || "Ya, Lanjutkan",
      cancelButtonText: options?.cancelButtonText || "Batal",
      confirmButtonColor: options?.confirmButtonColor,
    });
  },
  hideConfirm: () =>
    set({
      isOpen: false,
      onConfirm: null,
      onCancel: null,
      // Reset texts and color to default when hiding
      confirmButtonText: "Ya, Lanjutkan",
      cancelButtonText: "Batal",
      confirmButtonColor: undefined,
    }),
}));

export const showConfirm = (
  message: string,
  onConfirm: () => void,
  onCancel?: () => void,
  options?: {
    confirmButtonText?: string;
    cancelButtonText?: string;
    confirmButtonColor?: string;
  }
) => {
  useConfirmStore.getState().showConfirm(message, onConfirm, onCancel, options);
};

export default useConfirmStore;
