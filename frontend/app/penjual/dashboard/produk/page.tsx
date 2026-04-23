export default function ProdukPage() {
    return (
        <>
            <div className="flex justify-between items-center mt-1 mb-6">
                <h2 className="text-3xl text-[#35643d] font-bold ml-2">Manajemen Produk</h2>
                <button className="bg-[#f15a18] hover:bg-[#d04a11] transition-colors text-white px-6 py-2 rounded-full font-semibold">
                    + Tambah Produk
                </button>
            </div>

            <div className="rounded-[24px] overflow-hidden bg-[#dce5de] shadow-sm">
                {/* Table Header */}
                <div className="grid grid-cols-5 bg-[#356f3b] text-white px-8 py-5 text-lg font-medium">
                    <div className="text-left">Foto</div>
                    <div className="text-left">Nama Produk</div>
                    <div className="text-left">Harga</div>
                    <div className="text-left">Stok</div>
                    <div className="text-left">Aksi</div>
                </div>

                {/* Empty state */}
                <div className="h-[520px] flex flex-col justify-center items-center text-[#35643d]">
                    <p className="text-xl font-medium">Belum ada produk terdaftar</p>
                </div>
            </div>
        </>
    );
}
