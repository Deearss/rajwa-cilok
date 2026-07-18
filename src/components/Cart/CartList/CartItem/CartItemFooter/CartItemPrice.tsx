import React from "react";
import { formatRupiah } from "@/app/utils/formatRupiah";
import { CartItemInterface } from "@/app/hooks/useCartStore";

const CartItemPrice = ({
  item,
  className,
}: {
  item: CartItemInterface;
  className?: string;
}) => (
  <div
    className={`flexc !justify-start text-[0.9em] text-gray-400 ${className}`}
  >
    <span className="w-[4em]">Harga</span>
    <span className="w-[2em] text-center">:</span>
    <span className="text-[1em]">
      <span className="text-[0.75em] mr-0.5">Rp</span>
      <span className="text-[1em]">
        {formatRupiah(item.price).split("Rp")[1].trim()}
      </span>
    </span>
  </div>
);

export default CartItemPrice;
