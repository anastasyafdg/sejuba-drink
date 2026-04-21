<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Penjual</title>
    @vite('resources/css/app.css')
</head>
<body class="relative min-h-screen overflow-hidden bg-[#f7f8f4]">

    {{-- Background pattern samar --}}
    <div
        class="absolute inset-0 opacity-20"
        style="
            background-image: url('{{ asset('images/pattern-bg.png') }}');
            background-repeat: repeat;
            background-size: 180px;
        "
    ></div>

    {{-- Blur hijau bawah --}}
    <div class="absolute bottom-[-80px] left-1/2 h-[300px] w-[1100px] -translate-x-1/2 rounded-full bg-[#b8d7b5] blur-3xl opacity-60"></div>

    <div class="relative z-10 min-h-screen px-6 py-8 md:px-10 md:py-8">
        <div class="mx-auto flex min-h-[calc(100vh-32px)] max-w-[1280px] flex-col">

            {{-- Logo kiri atas --}}
            <div class="mb-4">
                <img
                    src="{{ asset('images/logo/logo-sejuba.png') }}"
                    alt="Sejuba Drink"
                    class="h-auto w-[115px] md:w-[135px]"
                >
            </div>

            {{-- Konten utama --}}
            <div class="relative flex flex-1 flex-col justify-start">

                {{-- Judul kiri --}}
                <div class="ml-2 mt-2 md:mt-0">
                    <h1 class="max-w-[360px] text-[34px] font-bold leading-[1.35] text-[#f15a18] md:text-[44px]">
                        FRESHNESS FOR YOUR LIFESTYLE
                    </h1>
                </div>

                {{-- Area gambar + form --}}
                <div class="relative mx-auto mt-6 flex w-full max-w-[1100px] flex-1 items-center justify-center">

                    {{-- Gambar botol --}}
                    <div class="relative mt-24 w-full max-w-[880px]">
                        <img
                            src="{{ asset('images/beranda/produk2.png') }}"
                            alt="Produk Sejuba Drink"
                            class="mx-auto h-auto w-full object-contain"
                        >
                    </div>

                    {{-- Box login --}}
                    <div class="absolute top-[20px] z-20 w-full max-w-[560px] rounded-[38px] border border-white/40 bg-[#a8c9a8]/72 px-10 py-10 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md md:px-12 md:py-11">

                        {{-- Error dari session --}}
                        @if (session('error'))
                            <div class="mb-4 rounded-xl bg-red-100 px-4 py-3 text-sm text-red-700">
                                {{ session('error') }}
                            </div>
                        @endif

                        {{-- Error dari validasi --}}
                        @if ($errors->any())
                            <div class="mb-4 rounded-xl bg-red-100 px-4 py-3 text-sm text-red-700">
                                {{ $errors->first() }}
                            </div>
                        @endif

                        <form action="{{ route('penjual.login.submit') }}" method="POST" class="space-y-8">
                            @csrf

                            {{-- USERNAME --}}
                            <div>
                                <label class="mb-2 block text-[18px] font-semibold text-white md:text-[20px]">
                                    Username:
                                </label>
                                <input
                                    type="text"
                                    name="nama_penjual"
                                    value="{{ old('nama_penjual') }}"
                                    class="w-full border-0 border-b-2 border-white bg-transparent pb-2 text-base text-white outline-none placeholder:text-white/70"
                                    placeholder=""
                                    required
                                >
                            </div>

                            {{-- PASSWORD --}}
                            <div>
                                <label class="mb-2 block text-[18px] font-semibold text-white md:text-[20px]">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    class="w-full border-0 border-b-2 border-white bg-transparent pb-2 text-base text-white outline-none placeholder:text-white/70"
                                    placeholder=""
                                    required
                                >
                            </div>

                            {{-- BUTTON --}}
                            <div class="flex justify-center pt-1">
                                <button
                                    type="submit"
                                    class="min-w-[160px] rounded-full bg-[#ff5a14] px-10 py-3 text-[18px] font-bold text-white transition hover:scale-[1.02]"
                                >
                                    LOGIN
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>

</body>
</html>