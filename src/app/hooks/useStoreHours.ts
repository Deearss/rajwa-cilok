import { create } from "zustand";

interface StoreHoursState {
  openHour: number;
  openMinute: number;
  closeHour: number;
  closeMinute: number;
  setOpenHour: (hour: number) => void;
  setOpenMinute: (minute: number) => void;
  setCloseHour: (hour: number) => void;
  setCloseMinute: (minute: number) => void;
}

export const useStoreHours = create<StoreHoursState>((set) => ({
  openHour: 14,
  openMinute: 0,
  closeHour: 22,
  closeMinute: 0,
  setOpenHour: (hour) => set({ openHour: hour }),
  setOpenMinute: (minute) => set({ openMinute: minute }),
  setCloseHour: (hour) => set({ closeHour: hour }),
  setCloseMinute: (minute) => set({ closeMinute: minute }),
}));
