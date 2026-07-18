import React from "react";
import CartItemQuantityActions from "./CartItemQuantityActions";
import CartItemRemoveActions from "./CartItemRemoveActions";
import { CartItemInterface } from "@/app/hooks/useCartStore";

const CartItemActions = ({
  item,
  updateQuantity,
  removeItem,
}: {
  item: CartItemInterface;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}) => {
  return (
    <div className={`w-full flexc !justify-between`}>
      {/* Tombol Remove Actions */}
      <CartItemRemoveActions item={item} removeItem={removeItem} />

      {/* Tombol Quantity Actions */}
      <CartItemQuantityActions
        item={item}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    </div>
  );
};

export default CartItemActions;
