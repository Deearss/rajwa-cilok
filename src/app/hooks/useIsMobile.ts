import { create } from "zustand";

interface IsMobileState {
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
}

const useIsMobile = create<IsMobileState>((set) => ({
  isMobile: true,
  setIsMobile: (value: boolean) => set({ isMobile: value }),
}));

export default useIsMobile;
