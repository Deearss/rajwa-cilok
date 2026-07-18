"use client";

import React from "react";
import { useWhatsAppPermissionStore } from "../../app/hooks/useWhatsAppPermissionStore";

const WhatsAppPermissionPopup: React.FC = () => {
  const {
    isPopupOpen,
    grant,
    deny,
    // _pendingRedirectUrl, // Potentially use to customize message
  } = useWhatsAppPermissionStore();

  if (!isPopupOpen) {
    return null;
  }

  // const message = _pendingRedirectUrl
  //   ? "Situs ini ingin membuka WhatsApp untuk melanjutkan pesanan Anda. Izinkan?"
  //   : "Situs ini ingin meminta izin untuk dapat membuka WhatsApp saat Anda melakukan pemesanan di masa mendatang. Izinkan?";

  const message =
    "Situs ini meminta izin untuk membuka WhatsApp. Ini diperlukan agar kami dapat mengarahkan Anda ke WhatsApp untuk mengirim pesanan. Izinkan?";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[10002] p-5">
      <div
        onClick={(e) => e.stopPropagation()} // Prevent close on inner click
        className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-auto flex flex-col gap-4 animate-squish"
      >
        <h3 className="text-lg font-semibold text-gray-800">
          Izin Membuka WhatsApp
        </h3>
        <p className="text-sm text-gray-700">{message}</p>
        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={deny}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-150 text-sm flex items-center gap-2"
          >
            <i className="fas fa-times"></i>
            Tolak
          </button>
          <button
            onClick={grant}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-150 text-sm flex items-center gap-2"
          >
            <i className="fas fa-check"></i>
            Izinkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppPermissionPopup;
