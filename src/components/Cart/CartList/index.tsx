import React from "react";
import { CartItemInterface } from "@/app/hooks/useCartStore";
import CartItem from "./CartItem";

interface CartListProps {
  items: Array<CartItemInterface>;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  isMobile: boolean;
}

const CartList: React.FC<CartListProps> = ({
  items,
  updateQuantity,
  removeItem,
  isMobile,
}) => (
  <ul
    className={`overflow-y-auto 
      ${isMobile && "max-h-[45vh]"} 
      ${!isMobile && "max-h-[80vh]"} 
      ${!isMobile && "grid grid-cols-4 !justify-start"} 
      ${!isMobile && "scrollbar-custom"}
        w-full px-3`}
  >
    {items.map((item) => (
      <CartItem
        key={item.id}
        item={item}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    ))}
  </ul>
);

export default CartList;
