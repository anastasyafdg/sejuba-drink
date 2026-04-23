export default function CartItem({ item }: any) {
  return (
    <div className="flex gap-4 items-center">
      <div className="bg-[#E5EFE7] p-3 rounded-xl">
        <img src={item.image} className="w-16" />
      </div>

      <div>
        <p className="font-medium">{item.name}</p>
        <p className="text-orange-500 font-semibold">
          Rp. {item.price.toLocaleString()}
        </p>
        <p className="text-sm text-gray-400">
          {item.label} • Qty: {item.qty}
        </p>
      </div>
    </div>
  );
}