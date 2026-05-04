export default function CartItem({ item, onRemove }: any) {
  return (
    <div className="flex items-center justify-between gap-3">

      {/* LEFT */}
      <div className="flex gap-3 items-center">
        <img
          src={item.image}
          className="w-16 h-16 rounded-xl bg-[#E5EFE7]"
        />

        <div>
          <p className="font-medium text-sm">{item.name}</p>

          <p className="text-orange-500 text-sm font-semibold">
            Rp. {item.price.toLocaleString()}
          </p>

          <p className="text-gray-400 text-xs">
            {item.size} · Qty: {item.qty}
          </p>
        </div>
      </div>

      {/* DELETE ICON (subtle banget) */}
      <button
        onClick={onRemove}
        className="text-gray-300 hover:text-red-500 transition"
      >
        <span className="material-symbols-outlined text-[18px]">
          delete
        </span>
      </button>
    </div>
  );
}