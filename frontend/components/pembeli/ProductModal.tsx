"use client";
import { useState } from "react";

export default function ProductModal({ product, onClose, onAdd }: any) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(product.sizes[0]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-[700px] relative">
        
        <button
          onClick={onClose}
          className="absolute right-6 top-4 text-orange-500 text-2xl"
        >
          ✕
        </button>

        <div className="flex gap-10 items-center">
          <div className="bg-[#E5EFE7] p-6 rounded-2xl">
            <img src={product.image} className="w-32" />
          </div>

          <div className="flex-1">
            <p className="text-gray-400 text-xs">COLD PRESSED JUICE</p>
            <h2 className="text-xl font-semibold">{product.name}</h2>

            {/* SIZE */}
            <div className="flex gap-4 mt-4">
              {product.sizes.map((s: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setSize(s)}
                  className={`px-4 py-1 rounded-full text-sm ${
                    size.label === s.label
                      ? "bg-green-200"
                      : "bg-gray-100"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* PRICE */}
            <p className="mt-3 text-orange-500 font-semibold">
              Rp. {size.price.toLocaleString()}
            </p>

            {/* QTY */}
            <div className="flex items-center gap-4 mt-6">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>

              <button
                onClick={() => {
                  onAdd({ ...product, ...size, qty });
                  onClose();
                }}
                className="ml-6 border border-orange-500 text-orange-500 px-4 py-1 rounded-lg"
              >
                🛒 Masukan Keranjang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}