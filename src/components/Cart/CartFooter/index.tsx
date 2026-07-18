import React from "react";
import { CartItemInterface } from "@/app/hooks/useCartStore";
import CartFooterPromo from "./CartFooterPromo";
import CartFooterTotal from "./CartFooterTotal";
import CartFooterActions from "./CartFooterActions";

export interface CartFooterProps {
  items: Array<CartItemInterface>;
  clearCart: () => void;
  handleOrder: (
    items: Array<CartItemInterface>,
    totalCartPrice: number
  ) => void;
  totalCartPrice: number;
}

const CartFooter: React.FC<CartFooterProps> = ({
  items,
  clearCart,
  handleOrder,
  totalCartPrice,
}) => {
  return (
    <div className="flexcc px-8 py-4 w-full bg-white font-bold shadow-lg shadow-gray-800 rounded-t-xl border-t border-gray-100">
      <CartFooterPromo />

      <CartFooterTotal totalCartPrice={totalCartPrice} />

      <CartFooterActions
        items={items}
        clearCart={clearCart}
        handleOrder={handleOrder}
        totalCartPrice={totalCartPrice}
      />
    </div>
  );
};

export default CartFooter;
