import useIsMobile from "@/app/hooks/useIsMobile";
import React from "react";

const CartFooterPromo: React.FC = () => {
  const { isMobile } = useIsMobile();

  return (
    <div
      className={`w-full 
      ${isMobile && "text-[0.75em]"}
      ${!isMobile && "text-[0.9em]"}
      text-gray-500 flexcc !items-start gap-2 mb-3.5 pe-3`}
    >
      <div className="leading-none text-[1em]">
        <i className="me-1 fas fa-shopping-basket text-yellow-500 text-[1.2em]" />
        {` Pesanan Anda mendapatkan :`}
      </div>
      <div className="font-bold text-gray-500 text-[0.85em] relative ps-5">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center flexc">
          <i className="fas fa-gift text-red-500 text-[1.1em] relative z-0" />
          <i className="fas fa-pepper-hot text-red-600 text-[0.7em] absolute -top-1 -right-1 bg-white rounded-full p-[1.5px] shadow" />
        </span>
        <span>gratis saos kacang pedas/manis!</span>
      </div>
    </div>
  );
};

export default CartFooterPromo;
