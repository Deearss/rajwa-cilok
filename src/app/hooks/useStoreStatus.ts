import { create } from "zustand";

interface StoreStatusState {
  isOpen: boolean;
  nextOpen: Date;
  nextClose: Date;
  setStatus: (status: {
    isOpen: boolean;
    nextOpen: Date;
    nextClose: Date;
  }) => void;
}

export const useStoreStatus = create<StoreStatusState>((set) => ({
  isOpen: false,
  nextOpen: new Date(),
  nextClose: new Date(),
  setStatus: (status) => set(status),
}));
