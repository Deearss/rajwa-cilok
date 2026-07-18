import React from "react";

const HideNotificationButton = ({
  onClick,
}: {
  onClick: (e: React.MouseEvent) => void;
}) => (
  <button
    className="absolute top-1.5 left-1.5 text-gray-400 active:text-gray-700 text-3xl font-bold p-2 size-[30px] flexc clicked transall"
    aria-label="Sembunyikan notifikasi"
    onClick={onClick}
  >
    ×
  </button>
);

export default HideNotificationButton;
