export default function LaporanPage() {
    return (
        <>
            <div className="flex justify-between items-center mt-1 mb-6">
                <h2 className="text-3xl text-[#35643d] font-bold ml-2">Laporan Penjualan</h2>
                <div className="flex gap-4">
                    <button className="bg-[#46684d] hover:bg-[#35533a] transition-colors text-white px-6 py-2 rounded-full font-semibold">
                        Export PDF
                    </button>
                    <button className="bg-[#f15a18] hover:bg-[#d04a11] transition-colors text-white px-6 py-2 rounded-full font-semibold">
                        Export Excel
                    </button>
                </div>
            </div>

            <div className="rounded-[24px] overflow-hidden bg-[#dce5de] shadow-sm p-8">
                <div className="bg-white rounded-xl h-[456px] flex justify-center items-center">
                    <p className="text-xl text-[#35643d] font-medium">Grafik penjualan akan ditampilkan disini</p>
                </div>
            </div>
        </>
    );
}
