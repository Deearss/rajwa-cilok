"use client";

import useCartStore from "@/app/hooks/useCartStore";
import useCartOpenStore from "@/app/hooks/useCartOpenStore";
import { useEffect } from "react";
import CartFooter from "./CartFooter";
import CartHeader from "./CartHeader";
import CartList from "./CartList";
import EmptyCart from "./EmptyCart";
import useIsMobile from "@/app/hooks/useIsMobile";
import { sendOrderToWhatsApp } from "@/app/utils/sendOrderToWhatsApp"; // Import fungsi baru

const Cart = () => {
  const { items, totalCartPrice, clearCart, updateQuantity, removeItem } =
    useCartStore();
  const { isCartOpen, setCartOpen } = useCartOpenStore();
  const { isMobile } = useIsMobile();

  const handleCloseCart = () => {
    setCartOpen(false);
  };

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add("overflow-hidden");
      if (isMobile) {
        document.body.style.height = "92vh";
      }
    } else {
      document.body.classList.remove("overflow-hidden");
      if (isMobile) {
        document.body.style.height = "100vh";
      }
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      // Ensure height is reset if it was potentially changed for mobile
      if (isMobile) {
        document.body.style.height = "100vh";
      }
    };
  }, [isCartOpen, isMobile]); // Added isMobile to dependencies

  if (!isCartOpen) return null;

  return (
    <div
      className="transcenter !fixed inset-0 p-10 bg-[rgba(0,0,0,0.87)] flexc w-[200vw] h-[200vh] z-[99] text-base font-semibold overflow-hidden"
      onClick={handleCloseCart}
    >
      <div
        className={`m-2 rounded-t-xl shadow-md animate-squish
          ${!isMobile ? "w-[1850px]" : "w-[384px]"} 
          overflow-hidden bg-white flexcc`}
        onClick={(e) => e.stopPropagation()}
      >
        <CartHeader handleCloseCart={handleCloseCart} />

        {items.length > 0 ? (
          <>
            <CartList
              items={items}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
              isMobile={isMobile}
            />

            <CartFooter
              items={items}
              totalCartPrice={totalCartPrice}
              clearCart={clearCart}
              handleOrder={() =>
                sendOrderToWhatsApp(items, totalCartPrice, clearCart)
              } // Panggil fungsi baru
            />
          </>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
};

export default Cart;
