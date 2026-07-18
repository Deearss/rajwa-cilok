const EmptyCart = () => (
  <div className="text-[20px] pt-5 pb-10 text-center font-bold flexcc gap-3 bg-white">
    <div className="relative size-[80px] text-[16px] scale-[0.8]">
      <span className="transcenter text-black text-[1em]">
        <i className="fas fa-shopping-cart text-[5em]"></i>
      </span>
      <div className="transcenter !left-[58.5%] !top-[31%] text-[1em]">
        <span className="transcenter text-[1em]">
          <i
            className="fas fa-times text-[2em] text-white"
            style={{ WebkitTextStroke: "1px white" }}
          />
        </span>
      </div>
    </div>
    <span className="font-bold">keranjangmu kosong...</span>
  </div>
);

export default EmptyCart;
