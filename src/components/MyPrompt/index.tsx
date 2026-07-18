"use client";

import usePromptStore from "@/app/hooks/usePromptStore";
import { formatMessage } from "@/app/utils/formatMessage";
import React, { useState, useEffect } from "react";

const MyPrompt: React.FC = () => {
  const { isOpen, message, defaultValue, onConfirm, onCancel, closePrompt } =
    usePromptStore();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (isOpen) {
      setInputValue(defaultValue || "");
    }
  }, [isOpen, defaultValue]);

  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    // Basic sanitization: allow alphanumeric, spaces, and some common punctuation.
    // This is a simple example and might need to be adjusted based on specific needs.
    const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9 .,?!'-]/g, "");
    if (onConfirm) onConfirm(sanitizedValue);
    closePrompt();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    closePrompt();
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleConfirm();
  };

  const formattedMessage = formatMessage(message);

  return (
    <div
      // onClick={handleCancel} // Optional: close on overlay click
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[10001] p-5"
    >
      <form
        onSubmit={handleSubmitForm}
        onClick={(e) => e.stopPropagation()}
        className="animate-squish bg-white p-4.5 rounded-lg shadow-xl max-w-md w-full mx-auto flex flex-col gap-4"
      >
        <div className="text-sm font-medium text-gray-800 mb-5 text-center">
          {formattedMessage}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="text-xs font-medium border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          autoFocus
          onKeyDown={(e) => {
            // if (e.key === 'Enter') { // Handled by form onSubmit
            //   handleConfirm();
            // }
            if (e.key === "Escape") {
              handleCancel();
            }
          }}
        />
        <div className="flex justify-end gap-3 !select-none">
          <button
            type="button" // Explicitly set type to prevent form submission if not intended
            onClick={handleCancel}
            className="clicked transall bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md text-sm"
          >
            Kembali
          </button>
          <button
            type="submit" // This button will trigger the form's onSubmit
            className="clicked transall bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md text-sm"
          >
            Oke
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyPrompt;
