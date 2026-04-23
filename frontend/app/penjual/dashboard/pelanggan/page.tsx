export default function PelangganPage() {
    return (
        <>
            <div className="flex justify-between items-center mt-1 mb-6">
                <h2 className="text-3xl text-[#35643d] font-bold ml-2">Manajemen Pelanggan</h2>
            </div>

            <div className="rounded-[24px] overflow-hidden bg-[#dce5de] shadow-sm">
                <div className="grid grid-cols-4 bg-[#356f3b] text-white px-8 py-5 text-lg font-medium">
                    <div className="text-left">ID User</div>
                    <div className="text-left">Nama Pembeli</div>
                    <div className="text-left">Email</div>
                    <div className="text-left">Jumlah Transaksi</div>
                </div>

                <div className="h-[520px] flex flex-col justify-center items-center text-[#35643d]">
                    <p className="text-xl font-medium">Belum ada pelanggan</p>
                </div>
            </div>
        </>
    );
}
