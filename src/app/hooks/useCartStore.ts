import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItemInterface {
  id: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number; // Properti untuk menyimpan total harga item
  category?: "" | "terlaris" | "terbaru"; // Properti opsional untuk kategori
  image?: string; // Properti opsional untuk gambar
  ongkir?: "" | "free"; // Properti opsional untuk ongkir
  description?: string; // Properti opsional untuk deskripsi
}

interface CartState {
  items: Array<CartItemInterface>;
  totalCartPrice: number; // Properti untuk menyimpan total harga semua item di keranjang
  addItem: (item: CartItemInterface) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      totalCartPrice: 0,
      addItem: (item: CartItemInterface) =>
        set((state) => {
          const updatedItems = [
            ...state.items,
            { ...item, totalPrice: item.price * item.quantity },
          ];
          const updatedTotalCartPrice = updatedItems.reduce(
            (total, currentItem) => total + currentItem.totalPrice,
            0
          );
          return { items: updatedItems, totalCartPrice: updatedTotalCartPrice };
        }),
      removeItem: (id: string) =>
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);
          const updatedTotalCartPrice = updatedItems.reduce(
            (total, currentItem) => total + currentItem.totalPrice,
            0
          );
          return { items: updatedItems, totalCartPrice: updatedTotalCartPrice };
        }),
      updateQuantity: (id: string, quantity: number) =>
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === id
              ? { ...item, quantity, totalPrice: item.price * quantity }
              : item
          );
          const updatedTotalCartPrice = updatedItems.reduce(
            (total, currentItem) => total + currentItem.totalPrice,
            0
          );
          return { items: updatedItems, totalCartPrice: updatedTotalCartPrice };
        }),
      clearCart: () => set({ items: [], totalCartPrice: 0 }),
    }),
    {
      name: "cart-storage", // Nama untuk kunci di localStorage
    }
  )
);

export default useCartStore;
