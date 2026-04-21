<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Penjual</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-[#f5f5f5] min-h-screen">

    <div class="max-w-[1060px] mx-auto py-6">
        <div class="bg-white rounded-2xl shadow-md px-8 py-6 flex items-center justify-between">
            <img src="{{ asset('images/logo-sejuba.png') }}" alt="Logo Sejuba" class="w-36">

            <div class="flex items-center gap-6">
                <div class="w-11 h-11 rounded-full border-2 border-[#46684d] flex items-center justify-center text-[#46684d] text-xl">
                    👤
                </div>

                <form action="{{ route('penjual.logout') }}" method="POST">
                    @csrf
                    <button class="bg-[#46684d] text-white px-6 py-2 rounded-full text-sm">
                        LOGOUT
                    </button>
                </form>
            </div>
        </div>

        <div class="mt-4 grid grid-cols-[260px_1fr] gap-0">
            <aside class="bg-[#dce5de] min-h-[760px]">
                <div class="bg-[#46684d] text-white text-2xl font-semibold px-10 py-4">
                    DASHBOARD
                </div>

                <nav class="flex flex-col text-[#35643d] text-2xl font-medium">
                    <a href="#" class="px-10 py-7">PRODUK</a>
                    <a href="#" class="px-10 py-7">KONTEN</a>
                    <a href="#" class="px-10 py-7">PESANAN</a>
                    <a href="#" class="px-10 py-7">PELANGGAN</a>
                    <a href="#" class="px-10 py-7">LAPORAN</a>
                </nav>
            </aside>

            <main class="bg-[#f5f5f5] pl-8">
                <div class="grid grid-cols-3 gap-8 mt-1">
                    <div class="bg-[#dce5de] rounded-[30px] shadow-md py-5 text-center">
                        <div class="text-[#f15a18] text-4xl font-semibold">30</div>
                        <div class="text-[#35643d] text-2xl mt-2">PRODUK</div>
                    </div>

                    <div class="bg-[#dce5de] rounded-[30px] shadow-md py-5 text-center">
                        <div class="text-[#f15a18] text-4xl font-semibold">18</div>
                        <div class="text-[#35643d] text-2xl mt-2">PESANAN</div>
                    </div>

                    <div class="bg-[#dce5de] rounded-[30px] shadow-md py-5 text-center">
                        <div class="text-[#f15a18] text-4xl font-semibold">10</div>
                        <div class="text-[#35643d] text-2xl mt-2">PELANGGAN</div>
                    </div>
                </div>

                <div class="mt-14">
                    <h2 class="text-2xl font-semibold mb-6">Pesanan Terbaru</h2>

                    <div class="rounded-[24px] overflow-hidden bg-[#dce5de]">
                        <div class="grid grid-cols-4 bg-[#356f3b] text-white px-8 py-5 text-lg">
                            <div>ID</div>
                            <div>Nama Pelanggan</div>
                            <div>Produk</div>
                            <div>Status</div>
                        </div>

                        <div class="h-[520px] divide-y divide-gray-500/60">
                            <div class="h-[86px]"></div>
                            <div class="h-[86px]"></div>
                            <div class="h-[86px]"></div>
                            <div class="h-[86px]"></div>
                            <div class="h-[86px]"></div>
                            <div class="h-[86px]"></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

</body>
</html>