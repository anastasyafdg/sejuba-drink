"use client";
import { useState } from "react";

export default function ProductModal({ product, onClose, onAdd }: any) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(product.sizes[0]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      {/* MODAL */}
      <div className="bg-[#F4F4F4] rounded-[32px] px-12 py-8 w-[820px] relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-6 top-5 text-orange-500"
        >
          <span className="material-symbols-outlined text-[28px]">
            close
          </span>
        </button>

        {/* GRID */}
        <div className="grid grid-cols-[240px_1fr] gap-10 items-center">

          {/* ================= LEFT ================= */}
          <div className="flex flex-col items-start">

            <div className="bg-[#DCE5DE] rounded-[20px] flex items-center justify-center p-6 w-[220px] h-[220px]">
              <img src={product.image} className="w-[130px]" />
            </div>

            <div className="mt-5">
              <p className="text-xs text-gray-400 tracking-wide">
                COLD PRESSED JUICE
              </p>

              <h2 className="text-[20px] font-semibold mt-1">
                {product.name}
              </h2>
            </div>

          </div>

          {/* ================= RIGHT ================= */}
          <div className="flex flex-col items-center">

            {/* SIZE + PRICE */}
            <div className="flex gap-12 justify-start w-full">

              {product.sizes.map((s: any, i: number) => (
                <div
                  key={i}
                  onClick={() => setSize(s)}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <div
                    className={`px-6 py-2 rounded-full text-sm ${size.label === s.label
                      ? "bg-[#DCE5DE]"
                      : "bg-[#E6E6E6]"
                      }`}
                  >
                    {s.label}
                  </div>

                  <p className="mt-2 text-sm">
                    Rp. {s.price.toLocaleString()}
                  </p>
                </div>
              ))}

            </div>

            {/* QTY + BUTTON */}
            <div className="flex items-center justify-center gap-5 mt-8">

              {/* MINUS */}
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-9 h-9 border rounded-md flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">
                  remove
                </span>
              </button>

              {/* QTY */}
              <span className="text-base font-medium">{qty}</span>

              {/* PLUS */}
              <button
                onClick={() => setQty(qty + 1)}
                className="w-9 h-9 border rounded-md flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">
                  add
                </span>
              </button>

              {/* BUTTON */}
              <button
                onClick={() => {
                  onAdd({ ...product, ...size, qty });
                  onClose();
                }}
                className="ml-4 flex items-center gap-2 border border-orange-500 text-orange-500 px-5 py-2 rounded-lg hover:bg-orange-50 transition"
              >
                <span className="material-symbols-outlined text-[18px]">
                  shopping_cart
                </span>
                Masukan Keranjang
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}