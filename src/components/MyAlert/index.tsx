"use client";

import useAlertStore from "@/app/hooks/useAlertStore";
import { formatMessage } from "@/app/utils/formatMessage";
import React from "react";

const MyAlert: React.FC = () => {
  const { isOpen, message, closeAlert } = useAlertStore();

  if (!isOpen) {
    return null;
  }

  // Memproses pesan melalui pipeline pemformatan
  const formattedMessage = formatMessage(message);

  return (
    <div
      onClick={() => closeAlert()}
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] p-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-squish bg-white p-4.5 rounded-lg shadow-xl max-w-sm w-full mx-auto"
      >
        <div className="text-sm font-medium text-gray-800 mb-5 text-center">
          {formattedMessage} {/* Menggunakan pesan yang sudah diformat */}
        </div>
        <button
          onClick={closeAlert}
          className="clicked transall w-full flexc gap-2 text-[0.8em] py-2.5 px-2.5 rounded-lg text-sm bg-blue-500 hover:bg-blue-600 text-white font-bold focus:outline-none focus:shadow-outline !select-none"
        >
          <i className="fas fa-arrow-down animate-bounce"></i>
          {/* Icon untuk tombol tutup */}
          Tutup
          <i className="fas fa-arrow-down animate-bounce"></i>
          {/* Icon untuk tombol tutup */}
        </button>
      </div>
    </div>
  );
};

export default MyAlert;
