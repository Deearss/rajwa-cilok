"use client";

import Image from "next/image";
import useCartStore from "@/app/hooks/useCartStore";
import { formatRupiah } from "@/app/utils/formatRupiah";
import { MenuItemInterface } from "@/app/interfaces/MenuItem.interface";

const MenuHeader = () => (
  <header className="pt-5 mb-5 relative">
    <div className="flexc relative">
      <Image
        alt={`cilok`}
        width={512}
        height={512}
        src={`/images/food-stall.png`}
        className="w-32 h-32"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-center gap-14 pt-4">
          <Image
            alt={`cilok`}
            width={512}
            height={512}
            src={`/images/meat-ball.png`}
            className="w-16 h-16"
          />

          <Image
            alt={`cil ok`}
            width={512}
            height={512}
            src={`/images/meat-ball.png`}
            className="w-16 h-16 scale-x-[-1]"
          />
        </div>
        <h1 className="absolute top-[65%] text-white text-xl font-bold">
          Menu
        </h1>
      </div>
    </div>
    <div className="w-48 h-2 transcenter !top-[92%] border-[4px] border-black mx-auto rounded-t-full"></div>
  </header>
);

const MenuItem = ({ item, handleAddToCart }: any) => {
  const { items } = useCartStore();

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const cartItem = items.find((cartItem: any) => cartItem.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="w-full max-w-[340px] rounded-lg overflow-hidden shadow shadow-gray-300 flex flex-col mx-auto m-2">
      <div className="size-[340px] relative mb-5 bg-gray-300 self-center">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            width={800}
            height={800}
            className="object-cover size-full"
          />
        ) : (
          <div className="w-full h-[300px] bg-gray-200 animate-pulse" />
        )}
      </div>

      <div className="px-5">
        <h3 className="text-[22px] lg:text-[24px] mb-1 text-gray-600 font-bold text-left">
          {truncateText(item.name, 30)}
        </h3>
        <div className="text-gray-900 font-bold text-2xl mb-4 text-left flexc !items-end !justify-start self-start">
          <span className="text-[22px] lg:text-[24px]">
            <span className="text-[0.75em] mr-0.5">Rp</span>
            <span className="text-[1em]">
              {formatRupiah(item.price).split("Rp")[1].trim()}
            </span>
          </span>
        </div>
        <div className="text-gray-500 text-sm mb-6 text-left min-h-[30px] font-semibold h-16">
          {item.description.length > 120
            ? `${item.description.slice(0, 120)}...`
            : item.description}
        </div>
      </div>

      <button
        className="bg-blue-500 h-[50px] w-[60px] text-white py-1.5 px-3 rounded-lg active:bg-blue-600 transall clicked flexc font-bold self-end m-5 relative"
        onClick={(event) => handleAddToCart(event, item)}
      >
        <i className="fas fa-shopping-basket text-[1.5em]" />
        {quantity > 0 && (
          <span
            className="absolute top-0.5 right-0.5 bg-blue-700 text-white font-bold rounded-md h-4 w-4 px-2 flexc"
            style={{
              fontSize: `${Math.max(
                10 - Math.floor(Math.log10(quantity)) * 2,
                6
              )}px`,
            }}
          >
            {quantity}
          </span>
        )}
      </button>
    </div>
  );
};

const MenuGrid = ({
  menuItems,
  handleAddToCart,
}: {
  menuItems: Array<MenuItemInterface>;
  handleAddToCart: (
    event: React.MouseEvent<HTMLButtonElement>,
    item: any
  ) => void;
}) => {
  const textSizeInPx = 13; // Ukuran teks dalam pixel
  const textSizeInEm = textSizeInPx / 16; // Konversi ke em (1em = 16px)

  return (
    <div
      id="tutorial-highlight-menu-grid"
      className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 lg:max-w-[1500px] m-auto rounded-t-xl"
      style={{ fontSize: `${textSizeInEm}em` }}
    >
      {menuItems.map((item, index) => (
        <MenuItem
          key={item.id}
          item={item}
          handleAddToCart={handleAddToCart}
          {...(index === 0 && { id: "tutorial-target-menu-item-1" })}
        />
      ))}
    </div>
  );
};

const Menu = ({ menuItems }: { menuItems: Array<MenuItemInterface> }) => {
  const { items, addItem, updateQuantity } = useCartStore();

  const handleAddToCart = (event: any, item: any) => {
    const isItemExist = items.find((cartItem: any) => cartItem.id === item.id);
    if (isItemExist) {
      updateQuantity(item.id, isItemExist.quantity + 1);
    } else {
      addItem({ ...item, quantity: 1 });
    }
  };

  return (
    <>
      <div className="w-full h-1 pt-[76px]" />
      <MenuHeader />
      <MenuGrid menuItems={menuItems} handleAddToCart={handleAddToCart} />
    </>
  );
};

export default Menu;
