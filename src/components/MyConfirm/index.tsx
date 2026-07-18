"use client";

import React from "react";
import useConfirmStore from "@/app/hooks/useConfirmStore";
import { formatMessage } from "@/app/utils/formatMessage";

const MyConfirm: React.FC = () => {
  const {
    isOpen,
    message,
    onConfirm,
    onCancel,
    hideConfirm,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor,
  } = useConfirmStore();

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();

    hideConfirm();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();

    hideConfirm();
  };

  // Base classes for buttons
  const baseButtonClasses =
    "px-4 py-2 rounded font-bold text-sm clicked transall";
  const confirmButtonBaseClasses = `${baseButtonClasses} text-white`;
  const cancelButtonClasses = `${baseButtonClasses} bg-red-400 hover:bg-red-500 text-white`;

  // Determine confirm button color class
  // Default to blue if no color is specified
  let confirmButtonColorClass = "bg-blue-500 hover:bg-blue-600";
  if (confirmButtonColor) {
    if (confirmButtonColor.startsWith("bg-")) {
      // Assume it's a Tailwind background class
      confirmButtonColorClass = confirmButtonColor;
    } else {
      // You could add more sophisticated color mapping here if needed
      // For now, let's support a few predefined keywords or default
      switch (confirmButtonColor) {
        case "green":
          confirmButtonColorClass = "bg-green-500 hover:bg-green-600";
          break;
        case "red":
          confirmButtonColorClass = "bg-red-500 hover:bg-red-600";
          break;
        // Add more cases as needed
        default:
          // If a non-tailwind class or unknown keyword is provided,
          // you might want to log a warning or apply a default.
          // For now, it falls back to the initial blue.
          // Or, if you expect specific hex codes, handle them here.
          break;
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1002] p-5">
      <div className="bg-white p-4.5 rounded-lg shadow-xl w-full max-w-sm">
        <div className="text-gray-800 text-sm mb-4 whitespace-pre-wrap break-words font-medium">
          {formatMessage(message)}
        </div>
        <div className="flex justify-end space-x-3 !select-none">
          <button onClick={handleCancel} className={cancelButtonClasses}>
            <i className="fas fa-times mr-2"></i>
            {cancelButtonText || "Batal"}
          </button>
          <button
            onClick={handleConfirm}
            className={`${confirmButtonBaseClasses} ${confirmButtonColorClass}`}
          >
            <i className="fas fa-check mr-2"></i>
            {confirmButtonText || "Ya, Lanjutkan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyConfirm;
