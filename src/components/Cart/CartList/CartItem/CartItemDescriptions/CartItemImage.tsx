import React from "react";
import Image from "next/image";
import { CartItemInterface } from "@/app/hooks/useCartStore";

interface CartItemImageProps {
  item: CartItemInterface;
  className?: string;
}

const CartItemImage: React.FC<CartItemImageProps> = ({
  item,
  className = "",
}) => (
  <div className={`p-1 flexc !items-start ${className}`}>
    <div
      className={`rounded-md overflow-hidden size-[7.5em] bg-gray-500
      ${item.ongkir === "free" && "outline-green-600 outline-3"}
      ${item.category === "terlaris" && "outline-orange-500 outline-3"}`}
    >
      <Image
        src={item.image as string}
        alt={item.name}
        width={500}
        height={500}
        className="object-cover size-full"
      />
    </div>
  </div>
);

export default CartItemImage;
