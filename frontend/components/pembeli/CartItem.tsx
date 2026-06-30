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
    <div className="flex gap-3 p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">

      {/* ── GAMBAR ─────────────────────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.name}
        className="w-[60px] h-[60px] rounded-xl bg-[#EEF6EC] object-contain shrink-0 self-center"
      />

      {/* ── KONTEN TENGAH ──────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col justify-between gap-1">

        {/* Baris atas: nama + tombol hapus */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-semibold text-[13px] text-gray-800 leading-snug line-clamp-2">
              {item.name}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">{item.size}</p>
          </div>

          {/* Tombol hapus — pojok kanan atas, jelas dan tidak nabrak */}
          <button
            onClick={onRemove}
            title="Hapus item"
            className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              delete
            </span>
          </button>
        </div>

        {/* Baris bawah: harga + kontrol qty */}
        <div className="flex items-center justify-between mt-1">
          <p className="text-orange-500 text-[13px] font-bold">
            Rp {(item.price * item.qty).toLocaleString("id-ID")}
          </p>

          {/* Qty stepper — rapi dan proporsional */}
          <div className="flex items-center gap-1.5 bg-gray-50 rounded-lg p-0.5 border border-gray-200">
            <button
              onClick={() => (item.qty <= 1 ? onRemove() : onQtyChange(-1))}
              className="w-6 h-6 rounded-md flex items-center justify-center text-gray-500 hover:bg-white hover:text-orange-500 hover:shadow-sm transition-all"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                remove
              </span>
            </button>

            <span className="w-5 text-center text-[13px] font-bold text-gray-800 select-none">
              {item.qty}
            </span>

            <button
              onClick={() => onQtyChange(1)}
              className="w-6 h-6 rounded-md flex items-center justify-center text-gray-500 hover:bg-white hover:text-orange-500 hover:shadow-sm transition-all"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                add
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}