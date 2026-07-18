import React from "react";
import CartItemPrice from "./CartItemPrice";
import CartItemSubtotal from "./CartItemSubtotal";
import { CartItemInterface } from "@/app/hooks/useCartStore";
import CartItemActions from "./CartItemActions/index";

interface CartItemFooterProps {
  item: CartItemInterface;
  isMobile: boolean;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

const CartItemFooter: React.FC<CartItemFooterProps> = ({
  item,
  isMobile,
  updateQuantity,
  removeItem,
}) => {
  return (
    <>
      <div className="flexcc w-full !items-start py-1 px-2 gap-5">
        {/* HARGA ITEM DAN SUBTOTALNYA */}
        <div className={`flex flex-col`}>
          <CartItemPrice
            className={`
            ${!isMobile && "w-[300px]"}
            `}
            item={item}
          />
          <CartItemSubtotal
            className={`
            ${!isMobile && "w-[300px]"}
            `}
            item={item}
          />
        </div>

        {/* TOMBOL MANIPULASI ITEM DI KERANJANG */}
        <CartItemActions
          item={item}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
      </div>
    </>
  );
};

export default CartItemFooter;
