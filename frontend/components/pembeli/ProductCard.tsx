export default function ProductCard({ product, onClick }: any) {
  return (
    <div className="group flex flex-col items-center">
      
      {/* CARD */}
      <div
        className="w-[284px] h-[282px] rounded-[20px] flex items-center justify-center transition-all duration-300 shadow-sm"
        style={{
          backgroundColor: "#E5EFE7",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = product.bg;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#E5EFE7";
        }}
      >
        {/* IMAGE */}
        <img
          src={product.image}
          className="w-[115px] transition-all duration-300 group-hover:scale-110"
        />
      </div>

      {/* TEXT */}
      <div className="w-[284px] mt-5">
        <p className="text-[10px] tracking-[1.5px] text-gray-400 uppercase">
          COLD PRESSED JUICE
        </p>

        <div className="flex justify-between items-center mt-1">
          <h3 className="text-[18px] font-medium text-gray-800">
            {product.name}
          </h3>

          <button
            onClick={() => onClick(product)}
            className="bg-orange-500 text-white p-2 rounded-lg shadow-sm hover:scale-105 transition"
          >
            <span className="material-symbols-outlined text-[18px]">
              shopping_cart
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}