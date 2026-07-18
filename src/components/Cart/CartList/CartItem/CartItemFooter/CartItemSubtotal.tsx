import React from "react";
import { formatRupiah } from "@/app/utils/formatRupiah";
import { CartItemInterface } from "@/app/hooks/useCartStore";

const CartItemSubtotal = ({
  item,
  className,
}: {
  item: CartItemInterface;
  className?: string;
}) => (
  <div className={`flexc !justify-start text-[0.9em] font-bold ${className}`}>
    <span className="w-[4em]">Subtotal</span>
    <span className="w-[2em] text-center">:</span>
    <span className="text-gray-600 text-[1em]">
      <span className="text-[0.75em] mr-0.5">Rp</span>
      <span className="text-[1em]">
        {formatRupiah(item.price).split("Rp")[1].trim()}
      </span>
    </span>
    <span className="text-[0.8em] text-gray-400 ml-2 w-[10em]">
      {`(${item.price} x ${item.quantity})`}
    </span>
  </div>
);

export default CartItemSubtotal;
