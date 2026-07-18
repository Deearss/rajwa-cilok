import { create } from "zustand";

interface AlertState {
  isOpen: boolean;
  message: string;
  openAlert: (message: string) => void;
  closeAlert: () => void;
}

const useAlertStore = create<AlertState>((set) => ({
  isOpen: false,
  message: "",
  openAlert: (message) => set({ isOpen: true, message }),
  closeAlert: () => set({ isOpen: false, message: "" }),
}));

export const showAlert = (message: string) => {
  useAlertStore.getState().openAlert(message);
};

export default useAlertStore;
