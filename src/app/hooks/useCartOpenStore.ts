import { create } from "zustand";

interface CartOpenState {
  isCartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
}

const useCartOpenStore = create<CartOpenState>()((set) => ({
  isCartOpen: false,
  setCartOpen: (isOpen: boolean) => set({ isCartOpen: isOpen }),
}));

export default useCartOpenStore;
