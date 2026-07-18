import React from "react";
import { CartItemInterface } from "@/app/hooks/useCartStore";
import { showConfirm } from "@/app/hooks/useConfirmStore"; // Import showConfirm

const CartItemRemoveActions = ({
  item,
  removeItem,
}: {
  item: CartItemInterface;
  removeItem: (id: string) => void;
}) => (
  <button
    className="clicked transall bg-red-500 text-white size-[2em] flexc rounded shadow font-bold text-[1em]"
    onClick={() => {
      showConfirm(
        "Apakah Anda yakin ingin menghapus item ini dari keranjang?",
        () => {
          // onConfirm
          removeItem(item.id);
        }
        // onCancel is not needed here, so it can be omitted
      );
    }}
  >
    <i className="fas fa-trash-alt"></i>
  </button>
);

export default CartItemRemoveActions;
