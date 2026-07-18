import React from "react";
import { showConfirm } from "@/app/hooks/useConfirmStore"; // Updated import path

interface QuantityFieldProps {
  itemId: string;
  quantity: number;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  removeItem: (itemId: string) => void;
  className: string;
}

const QuantityField: React.FC<QuantityFieldProps> = ({
  itemId,
  quantity,
  updateQuantity,
  removeItem,
  className,
}) => {
  // const { showConfirm } = useConfirmStore(); // Use the hook

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const originalValue = e.target.value;
    const trimmedValue = originalValue.trim();
    const inputElement = e.target; // Cache input element for callbacks

    if (trimmedValue === "") {
      inputElement.blur(); // Blur the input field
      showConfirm(
        "Menghapus digit terakhir akan membuat jumlah menjadi 0. Apakah Anda yakin ingin menghapus item ini dari keranjang?",
        () => {
          // onConfirm
          removeItem(itemId);
        },
        () => {
          // onCancel
          inputElement.value = quantity.toString();
        }
      );
      return; // Stop further processing, as actions are handled by confirm
    }

    if (/^[0-9]*$/.test(originalValue)) {
      // originalValue is non-empty and contains only digits (due to regex and previous check)
      // parseInt will produce a valid number or NaN if originalValue is just spaces (but caught by trim check)
      const newQuantity = parseInt(originalValue, 10);

      // This check is technically not needed if originalValue passes ^[0-9]*$ and is not empty after trim,
      // as parseInt should yield a number. However, keeping it for robustness against unexpected states.
      if (isNaN(newQuantity)) {
        inputElement.value = quantity.toString(); // Reset if somehow NaN
        return;
      }

      if (newQuantity === 0) {
        inputElement.blur(); // Blur the input field
        showConfirm(
          "Jika Anda mengubah jumlah item menjadi 0, item akan dihapus. Apakah Anda yakin ingin menghapus item ini dari keranjang?",
          () => {
            // onConfirm
            removeItem(itemId);
            updateQuantity(itemId, 0); // As per original logic path
          },
          () => {
            // onCancel
            inputElement.value = quantity.toString();
          }
        );
        return; // Logic for 0 is fully handled by confirm callbacks
      } else {
        // newQuantity > 0
        updateQuantity(itemId, newQuantity);
      }
    } else {
      // Non-numeric input (and not empty after trim)
      inputElement.value = quantity.toString(); // Reset to current quantity
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    (e.target as HTMLFormElement).querySelector("input")?.blur();
  };

  return (
    <form onSubmit={handleSubmit} className={` ${className}`}>
      <input
        className="size-full text-center bg-white overflow-hidden border border-gray-800 rounded transall"
        id={`quantity-${itemId}`}
        type="text"
        inputMode="numeric"
        value={quantity.toString()}
        onChange={handleChange}
      />
    </form>
  );
};

export default QuantityField;
