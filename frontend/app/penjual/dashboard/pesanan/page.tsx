export default function PesananPage() {
    return (
        <>
            <div className="flex justify-between items-center mt-1 mb-6">
                <h2 className="text-3xl text-[#35643d] font-bold ml-2">Daftar Semua Pesanan</h2>
            </div>

            <div className="rounded-[24px] overflow-hidden bg-[#dce5de] shadow-sm">
                <div className="grid grid-cols-5 bg-[#356f3b] text-white px-8 py-5 text-lg font-medium">
                    <div className="text-left">ID Pesanan</div>
                    <div className="text-left">Pelanggan</div>
                    <div className="text-left">Tanggal</div>
                    <div className="text-left">Total Default</div>
                    <div className="text-left">Status</div>
                </div>

                <div className="h-[520px] divide-y divide-[#8da991]">
                    {/* Empty Space */}
                    <div className="flex justify-center items-center h-full text-[#35643d]">
                        <p className="text-xl font-medium">Belum ada history pesanan</p>
                    </div>
                </div>
            </div>
        </>
    );
}
