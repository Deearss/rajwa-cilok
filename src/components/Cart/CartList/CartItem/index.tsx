import CartItemFooter from "./CartItemFooter/index";
import CartItemDescriptions from "./CartItemDescriptions";
import { CartItemInterface } from "@/app/hooks/useCartStore";
import useIsMobile from "@/app/hooks/useIsMobile";

const CartItem = ({
  item,
  updateQuantity,
  removeItem,
  className = "",
}: {
  item: CartItemInterface;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  className?: string;
}) => {
  const { isMobile } = useIsMobile();

  return (
    <li
      key={item.id}
      className={`flexc 
        ${isMobile && "text-[16px]"} 
        ${!isMobile && "text-[20px]"} 
        ${!isMobile && "max-w-[500px]"} 
        ${isMobile && "py-6 px-3.5"} 
        ${!isMobile && "py-14 px-5"} 
        border border-gray-200 overflow-hidden ${className}`}
    >
      <div className="text-[1em] flexcc gap-2 h-[250px] w-full !items-start">
        <CartItemDescriptions item={item} />

        <CartItemFooter
          item={item}
          isMobile={isMobile}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
      </div>
    </li>
  );
};

export default CartItem;
