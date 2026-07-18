import React from "react";
import { CartItemInterface } from "@/app/hooks/useCartStore";
import CartItemImage from "./CartItemImage";
import CartItemLabels from "./CartItemLabels";

interface CartItemDescriptionsProps {
  item: CartItemInterface;
}

const CartItemDescriptions: React.FC<CartItemDescriptionsProps> = ({
  item,
}) => (
  <div className="text-[1em] flexc gap-2 w-full h-full !items-start p-1 mb-2">
    <CartItemImage item={item} />
    <CartItemLabels item={item} />
  </div>
);

export default CartItemDescriptions;
