import useIsMobile from "@/app/hooks/useIsMobile";
import { formatRupiah } from "@/app/utils/formatRupiah";
import React from "react";

interface CartFooterTotalProps {
  totalCartPrice: number;
}

const CartFooterTotal: React.FC<CartFooterTotalProps> = ({
  totalCartPrice,
}) => {
  const { isMobile } = useIsMobile();

  return (
    <div
      className={`w-full 
      ${!isMobile ? "text-[1.3em]" : "text-[1em]"} 
      border-transparent border-b-gray-400 border text-gray-700 flexc !justify-start gap-2 mb-3.5 pe-3 pb-2`}
    >
      <span>Total Pesanan</span>
      <span className="me-1">:</span>
      <span className="font-bold text-gray-900 text-[1em]">
        <span className="text-[0.75em] mr-0.5">Rp</span>
        <span className="text-[1em]">
          {formatRupiah(totalCartPrice).split("Rp")[1].trim()}
        </span>
      </span>
    </div>
  );
};

export default CartFooterTotal;
