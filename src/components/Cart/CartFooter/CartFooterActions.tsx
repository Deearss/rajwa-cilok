import React, { useEffect, useState } from "react"; // Added useEffect, useState
import { CartItemInterface } from "@/app/hooks/useCartStore";
import { showConfirm } from "@/app/hooks/useConfirmStore";
import { showAlert } from "@/app/hooks/useAlertStore";
import { useStoreStatus } from "@/app/hooks/useStoreStatus";
import { getCountdown } from "../../StoreHours/StoreHoursFunction/getCountdown"; // Import getCountdown
import useIsMobile from "@/app/hooks/useIsMobile";

interface CartFooterActionsProps {
  items: Array<CartItemInterface>;
  clearCart: () => void;
  handleOrder: (
    items: Array<CartItemInterface>,
    totalCartPrice: number
  ) => void;
  totalCartPrice: number;
}

const CartFooterActions: React.FC<CartFooterActionsProps> = ({
  items,
  clearCart,
  handleOrder,
  totalCartPrice,
}) => {
  const { isOpen, nextOpen } = useStoreStatus(); // Get store status and nextOpen
  const [countdownLabel, setCountdownLabel] = useState<string>("");

  const { isMobile } = useIsMobile();

  useEffect(() => {
    if (!isOpen && nextOpen) {
      const updateCountdown = () => {
        const newCountdown = getCountdown(new Date(nextOpen));
        setCountdownLabel(newCountdown);
      };

      updateCountdown(); // Initial call
      const intervalId = setInterval(updateCountdown, 1000);

      return () => clearInterval(intervalId); // Cleanup interval on component unmount or deps change
    } else {
      setCountdownLabel(""); // Clear countdown if store is open or nextOpen is not available
    }
  }, [isOpen, nextOpen]);

  return (
    <div
      className={`flexc ${
        !isMobile ? "!justify-start gap-3" : "!justify-between"
      } font-bold w-full ${isOpen ? "p-2" : "p-1 gap-2"}`}
    >
      {/* TOMBOL HAPUS SEMUA ITEM DI KERANJANG */}
      <button
        className={` bg-red-500 text-white px-4 rounded-md shadow ${
          !isMobile ? "text-[1.15em] py-4" : "text-[1em] py-3"
        }  flex items-center gap-2 flexc leading-none clicked transall`}
        onClick={() => {
          showConfirm(
            "Apakah Anda yakin ingin menghapus semua pesanan?",
            () => {
              // onConfirm
              clearCart();
              showAlert("Semua item dalam keranjang telah **dihapus**!");
            }
            // onCancel is not needed here
          );
        }}
      >
        <span className="size-5 flexc relative">
          <i className="transall fas fa-trash-alt text-[1em]" />
        </span>
        <span className="text-[0.9em]">Hapus Semua</span>
      </button>

      {/* TOMBOL KIRIM PESANAN KE WHATSAPP ADMIN */}
      <button
        className={`text-white px-4 rounded-md shadow max-w-[175px] ${
          !isMobile ? "text-[1.3em] py-4" : "text-[1em] py-3"
        }  flex items-center gap-2 flexc leading-none transall ${
          !isOpen
            ? "bg-gray-400 opacity-70 cursor-not-allowed flex-1"
            : "bg-green-600 clicked"
        }`}
        onClick={() => {
          if (!isOpen) {
            showAlert(
              "Mohon maaf, warung sedang tutup. Silahkan kembali saat jam operasional."
            );
            return;
          }
          handleOrder(items, totalCartPrice);
        }}
        disabled={!isOpen} // Disable button if store is closed
      >
        <span className="size-5 flexc relative">
          <i
            className={`transall text-[1.3em] ${
              !isOpen ? "fas fa-store-slash" : "fab fa-whatsapp"
            }`}
          />
        </span>
        {!isOpen ? (
          <div className="flex flex-col items-start ps-1 -my-1 w-full">
            <span className="text-[0.65em] leading-tight">Sedang Tutup</span>
            {countdownLabel && countdownLabel !== "segera" && (
              <span className="text-[0.5em] leading-tight opacity-80">
                Buka dalam {countdownLabel}
              </span>
            )}
            {countdownLabel === "segera" && (
              <span className="text-[0.5em] leading-tight opacity-80">
                Buka segera
              </span>
            )}
          </div>
        ) : (
          <span className="text-[0.9em]">Pesan</span>
        )}
      </button>
    </div>
  );
};

export default CartFooterActions;
