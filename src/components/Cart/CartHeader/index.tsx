const CartHeader = ({ handleCloseCart }: { handleCloseCart: () => void }) => (
  <div className="bg-gray-900 px-2 py-5 w-full flexc">
    <div className="text-left w-full px-5">
      <h2 className="text-[20px] text-white font-bold text-center flexc gap-3">
        <i className="fas fa-shopping-cart"></i>
        Keranjangmu
      </h2>
    </div>
    <div className="px-5">
      <button
        className="text-gray-900 bg-white rounded-lg px-4 py-2 clicked transall shadow"
        onClick={handleCloseCart}
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  </div>
);

export default CartHeader;
