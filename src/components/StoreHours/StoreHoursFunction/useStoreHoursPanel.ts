import { useState, useEffect, useRef } from "react";
import { getNextOpenClose } from "../StoreHoursFunction/getNextOpenClose";
import { getCountdown } from "../StoreHoursFunction/getCountdown";
import { useStoreHours } from "@/app/hooks/useStoreHours";
import { useStoreStatus } from "@/app/hooks/useStoreStatus";
import useIsMobile from "@/app/hooks/useIsMobile";

export function useStoreHoursPanel() {
  // Ambil jam buka dan tutup dari custom hook
  const { openHour, openMinute, closeHour, closeMinute } = useStoreHours();
  // Ambil dan set status warung dari zustand
  const { isOpen, nextOpen, nextClose, setStatus } = useStoreStatus();

  // State untuk mengatur apakah panel notifikasi diperluas atau tidak
  const [expanded, setExpanded] = useState(false);
  // Ref untuk mendeteksi klik di luar komponen
  const ref = useRef<HTMLDivElement>(null);
  // State untuk countdown ke buka/tutup berikutnya
  const [countdown, setCountdown] = useState(() =>
    getCountdown(isOpen ? nextClose : nextOpen)
  );
  // State untuk menyembunyikan notifikasi
  const [hidden, setHidden] = useState(false);

  const { isMobile } = useIsMobile();

  // Update status dan countdown setiap detik
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const nextState = getNextOpenClose(
        now,
        openHour,
        openMinute,
        closeHour,
        closeMinute
      );
      setStatus(nextState);
      setCountdown(
        getCountdown(
          nextState.isOpen ? nextState.nextClose : nextState.nextOpen
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [setStatus, openHour, openMinute, closeHour, closeMinute]);

  // Tutup panel jika klik di luar komponen saat expanded
  useEffect(() => {
    if (!expanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expanded, isMobile]);

  return {
    openHour,
    openMinute,
    closeHour,
    closeMinute,
    isOpen,
    nextOpen,
    nextClose,
    setStatus,
    expanded,
    setExpanded,
    ref,
    countdown,
    hidden,
    setHidden,
  };
}
