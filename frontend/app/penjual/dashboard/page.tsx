export default function DashboardHome() {
    return (
        <>
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-8 mt-1">
                {/* Card 1 */}
                <div className="bg-[#dce5de] rounded-[30px] shadow-sm py-5 text-center">
                    <div className="text-[#f15a18] text-4xl font-semibold">30</div>
                    <div className="text-[#35643d] text-2xl font-medium mt-2">PRODUK</div>
                </div>

                {/* Card 2 */}
                <div className="bg-[#dce5de] rounded-[30px] shadow-sm py-5 text-center">
                    <div className="text-[#f15a18] text-4xl font-semibold">18</div>
                    <div className="text-[#35643d] text-2xl font-medium mt-2">PESANAN</div>
                </div>

                {/* Card 3 */}
                <div className="bg-[#dce5de] rounded-[30px] shadow-sm py-5 text-center">
                    <div className="text-[#f15a18] text-4xl font-semibold">10</div>
                    <div className="text-[#35643d] text-2xl font-medium mt-2">PELANGGAN</div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="mt-14">
                <h2 className="text-2xl text-[#35643d] font-semibold mb-6 ml-2">Pesanan Terbaru</h2>

                <div className="rounded-[24px] overflow-hidden bg-[#dce5de] shadow-sm">
                    {/* Table Header */}
                    <div className="grid grid-cols-4 bg-[#356f3b] text-white px-8 py-5 text-lg font-medium">
                        <div className="text-left">ID</div>
                        <div className="text-left">Nama Pelanggan</div>
                        <div className="text-left">Produk</div>
                        <div className="text-left">Status</div>
                    </div>

                    {/* Table Body (Empty rows based on template) */}
                    <div className="h-[520px] divide-y divide-[#8da991]">
                        <div className="h-[86px] flex items-center px-8 grid-cols-4 grid"></div>
                        <div className="h-[86px] flex items-center px-8 grid-cols-4 grid"></div>
                        <div className="h-[86px] flex items-center px-8 grid-cols-4 grid"></div>
                        <div className="h-[86px] flex items-center px-8 grid-cols-4 grid"></div>
                        <div className="h-[86px] flex items-center px-8 grid-cols-4 grid"></div>
                        <div className="h-[86px] flex items-center px-8 grid-cols-4 grid"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
