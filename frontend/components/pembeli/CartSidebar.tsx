import CartItem from "./CartItem";

export default function CartSidebar({ open, setOpen, cart }: any) {
  const total = cart.reduce(
    (acc: number, item: any) => acc + item.price * item.qty,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-lg transition transform ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="bg-green-700 text-white p-4 flex justify-between">
        <span>🛒</span>
        <button onClick={() => setOpen(false)}>✕</button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto h-[70%]">
        {cart.map((item: any, i: number) => (
          <CartItem key={i} item={item} />
        ))}
      </div>

      <div className="absolute bottom-0 w-full">
        <div className="bg-green-700 text-white text-center py-3">
          Total: Rp. {total.toLocaleString()}
          <button className="block mx-auto mt-2 bg-white text-black px-4 py-1 rounded-full">
            Lanjut Belanja
          </button>
        </div>

        <button className="w-full bg-orange-500 text-white py-4 text-lg font-semibold">
          Beli Sekarang
        </button>
      </div>
    </div>
  );
}