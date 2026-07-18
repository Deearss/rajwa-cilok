import React from "react";
import { CartItemInterface } from "@/app/hooks/useCartStore";

interface CartItemLabelsProps {
  item: CartItemInterface;
  className?: string;
}

const TerlarisLabel: React.FC = () => (
  <span
    className="ps-2.5 pe-10 py-1 text-[0.5em] bg-orange-500 font-bold gap-1 flexc"
    style={{ color: "white", WebkitTextStroke: "0.2px white" }}
  >
    <span className="block size-3.5 flexc leading-none mr-1">
      <i
        style={{ WebkitTextStroke: "1px white" }}
        className="leading-none fas fa-fire text-transparent text-[1.7em]"
      />
    </span>
    <div className="leading-none flexcc !items-start uppercase py-1.5">
      <span>terlaris</span>
    </div>
  </span>
);

const FreeOngkirLabel: React.FC = () => (
  <span
    className="ps-2.5 pe-6 py-1 text-[0.5em] bg-green-600 font-bold gap-1 flexc"
    style={{ color: "white", WebkitTextStroke: "0.2px white" }}
  >
    <span className="block size-3.5 flexc leading-none mr-1">
      <i
        style={{ WebkitTextStroke: "0.9px white" }}
        className="leading-none fas fa-truck text-transparent text-[1.5em]"
      />
    </span>
    <div className="leading-none flexcc !items-start space-y-1 uppercase py-1">
      <span>gratis ongkir</span>
      <span className="normal-case">(Grand Purnama 2 dan sekitarnya)</span>
    </div>
  </span>
);

const CartItemLabels: React.FC<CartItemLabelsProps> = ({
  item,
  className = "",
}) => (
  <div
    className={`text-[1em] h-full w-full min-h-[30px] font-bold truncate flexcc !items-start !justify-start gap-1 ${className}`}
  >
    <span>
      {item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}
    </span>
    {item.category === "terlaris" && <TerlarisLabel />}
    {item.ongkir === "free" && <FreeOngkirLabel />}
  </div>
);

export default CartItemLabels;
