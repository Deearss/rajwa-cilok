"use client";

// Import React dan hooks yang diperlukan
import React from "react";
// Import custom hook untuk mendapatkan jam buka/tutup
import { useStoreHoursPanel } from "./StoreHoursFunction/useStoreHoursPanel";
// Import komponen-komponen utama dari folder ini
import StoreStatusIcon from "./StoreStatusIcon"; // Corrected import
import StoreStatusDetail from "./StoreStatusDetail"; // Corrected import
import HideNotificationButton from "./HideNotificationButton"; // Corrected import
import { showConfirm } from "../../app/hooks/useConfirmStore"; // Corrected path
import useIsMobile from "@/app/hooks/useIsMobile";

// Komponen utama StoreHours
const StoreHours = () => {
  // Gunakan custom hook untuk seluruh state dan logic panel
  const {
    openHour,
    openMinute,
    closeHour,
    closeMinute,
    isOpen,
    expanded,
    setExpanded,
    ref,
    countdown,
    hidden,
    setHidden,
  } = useStoreHoursPanel();

  const { isMobile } = useIsMobile();

  // Jika disembunyikan, tidak render apapun
  if (hidden) return null;

  // Menentukan kelas dinamis berdasarkan state
  let dynamicContainerClasses = "";
  if (expanded) {
    if (!isMobile) {
      // Expanded state on Desktop
      dynamicContainerClasses =
        "w-[400px] !right-[50%] !bottom-[75%] h-66 px-6 rounded-lg text-[1.2em]";
    } else {
      // Expanded state on Mobile
      dynamicContainerClasses =
        "w-[340px] !bottom-40 !right-[50%] h-60 px-6 rounded-lg text-[1em]";
    }
  } else {
    if (!isMobile) {
      dynamicContainerClasses = "!right-40 !bottom-32";
    } else {
      dynamicContainerClasses = "clicked";
    }
  }

  const bounceAnimationClass = !expanded && isOpen ? "animate-bounceku" : "";

  // Render UI utama
  return (
    <div
      id="tutorial-highlight-store-hours-section"
      ref={ref}
      className={`!fixed z-50 transall !duration-300 text-[0em] transcenter-b-r !bottom-16 !right-12 w-14 h-14 rounded-full flexc group overflow-hidden ${bounceAnimationClass} ${dynamicContainerClasses} bg-white shadow-xl`}
      style={{
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
      }}
      onClick={() => {
        if (!expanded) setExpanded((e) => !e); // Toggle expanded state
      }}
    >
      {/* Tombol untuk menyembunyikan notifikasi */}
      {expanded && (
        <HideNotificationButton
          onClick={(e) => {
            e.stopPropagation();

            showConfirm(
              "Apakah Anda yakin ingin menyembunyikan notifikasi jam **buka/tutup** warung?",
              () => {
                setHidden(true);
              },
              () => {}
            );
          }}
        />
      )}
      {/* Ikon status buka/tutup */}
      <StoreStatusIcon isOpen={isOpen} expanded={expanded} />
      {/* Detail status buka/tutup */}
      {expanded && (
        <StoreStatusDetail
          isOpen={isOpen}
          openHour={openHour}
          openMinute={openMinute}
          closeHour={closeHour}
          closeMinute={closeMinute}
          countdown={countdown}
        />
      )}
    </div>
  );
};

export default StoreHours;
