import QuantityField from "./CartItemQuantityField"; // Updated import path
import { showConfirm } from "@/app/hooks/useConfirmStore"; // Import showConfirm

const CartItemQuantityActions = ({
  item,
  updateQuantity,
  removeItem,
  className = "",
}: {
  item: any;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  className?: string;
}) => (
  <div className={`flex items-center gap-1 text-[0.85em] ${className}`}>
    {item.quantity <= 1 ? (
      <button
        className="bg-red-500 text-white size-[2em] flexc rounded shadow font-bold text-[1em] clicked transall hover:scale-105 select-none"
        onClick={() => {
          showConfirm(
            "Apakah Anda yakin ingin menghapus item ini dari keranjang?",
            () => {
              // onConfirm
              removeItem(item.id);
            }
            // onCancel is not needed here
          );
        }}
      >
        <i className="fas fa-trash-alt"></i>
      </button>
    ) : (
      <button
        className="bg-gray-900 text-white size-[2em] flexc rounded shadow font-bold text-[1em] clicked transall hover:scale-105 select-none"
        onClick={() => updateQuantity(item.id, item.quantity - 1)}
      >
        -
      </button>
    )}

    <QuantityField
      className="w-[3.5em] h-[2em] flexc font-bold text-[1em]"
      itemId={item.id}
      quantity={item.quantity}
      updateQuantity={updateQuantity}
      removeItem={removeItem}
    />

    <button
      className="bg-gray-900 text-white size-[2em] flexc rounded shadow font-bold text-[1em] clicked transall hover:scale-105 select-none"
      onClick={() => updateQuantity(item.id, item.quantity + 1)}
    >
      +
    </button>
  </div>
);

export default CartItemQuantityActions;
