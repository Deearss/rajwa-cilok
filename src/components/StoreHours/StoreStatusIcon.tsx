import useIsMobile from "@/app/hooks/useIsMobile";
import React from "react";

const StoreStatusIcon = ({
  isOpen,
  expanded,
}: {
  isOpen: boolean;
  expanded: boolean;
}) => {
  const { isMobile } = useIsMobile();

  return (
    <div
      className={`flexc transall !duration-300 select-none
      ${isOpen ? "bg-green-400" : "bg-red-400"}`}
      style={{
        width: expanded ? (!isMobile ? 70 : 56) : 40,
        height: expanded ? (!isMobile ? 70 : 56) : 40,
        minWidth: expanded ? (!isMobile ? 70 : 56) : 40,
        minHeight: expanded ? (!isMobile ? 70 : 56) : 40,
        fontSize: expanded ? "0.85em" : "0.7rem",
        borderRadius: "50%",
        marginRight: expanded ? 16 : 0,
      }}
    >
      <span className="text-white font-bold text-[1em]">
        {isOpen ? "Buka" : "Tutup"}
      </span>
    </div>
  );
};

export default StoreStatusIcon;
