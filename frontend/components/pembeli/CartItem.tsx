interface CartItemProps {
  item: {
    name: string;
    image: string;
    price: number;
    size: string;
    qty: number;
  };
  onRemove: () => void;
  onQtyChange: (delta: number) => void;
}

export default function CartItem({ item, onRemove, onQtyChange }: CartItemProps) {
  return (
    <div className="flex items-center gap-3 py-1">

      {/* GAMBAR */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.name}
        className="w-14 h-14 rounded-xl bg-[#E5EFE7] object-contain shrink-0"
      />

      {/* DETAIL */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{item.name}</p>
        <p className="text-gray-400 text-xs">{item.size}</p>
        <p className="text-orange-500 text-xs font-semibold mt-0.5">
          Rp. {(item.price * item.qty).toLocaleString()}
        </p>

        {/* QTY CONTROLS */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => item.qty <= 1 ? onRemove() : onQtyChange(-1)}
            className="w-6 h-6 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 flex items-center justify-center transition"
          >
            <span className="material-symbols-outlined text-[13px]">remove</span>
          </button>

          <span className="w-6 text-center text-sm font-semibold text-gray-800">
            {item.qty}
          </span>

          <button
            onClick={() => onQtyChange(1)}
            className="w-6 h-6 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 flex items-center justify-center transition"
          >
            <span className="material-symbols-outlined text-[13px]">add</span>
          </button>
        </div>
      </div>

      {/* TRASH */}
      <button
        onClick={onRemove}
        className="text-gray-300 hover:text-red-500 transition shrink-0 self-start"
        title="Hapus item"
      >
        <span className="material-symbols-outlined text-[18px]">delete</span>
      </button>
    </div>
  );
}