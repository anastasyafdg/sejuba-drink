"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

type ToastType = "success" | "error";

function Field({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
}: {
    label: string;
    type?: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-widest">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#5E8E1B] focus:ring-2 focus:ring-[#5E8E1B]/15 transition bg-white"
            />
        </div>
    );
}

export default function ProfilPage() {
    const { pembeli, login, isLoggedIn } = useAuth();
    const router = useRouter();
    const { t } = useLanguage();

    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [telepon, setTelepon] = useState("");

    const [passLama, setPassLama] = useState("");
    const [passBaru, setPassBaru] = useState("");
    const [passKonfirmasi, setPassKonfirmasi] = useState("");

    const [fetching, setFetching] = useState(true);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ msg: string; type: ToastType } | null>(null);

    // Guard
    useEffect(() => {
        if (!isLoggedIn) router.replace("/pembeli/login?from=/pembeli/profil");
    }, [isLoggedIn, router]);

    // Fetch profil
    useEffect(() => {
        if (!pembeli) return;
        fetch(`${API}/api/pembeli/profil`, {
            headers: { Accept: "application/json", "X-Pembeli-Id": String(pembeli.id_pembeli) },
        })
            .then((r) => r.json())
            .then((data) => {
                if (data.success) {
                    setNama(data.data.nama_pembeli ?? "");
                    setEmail(data.data.email ?? "");
                    setTelepon(data.data.no_telepon ?? "");
                }
            })
            .catch(() => showToast(t("profile.toast_load_error"), "error"))
            .finally(() => setFetching(false));
    }, [pembeli]);

    const showToast = (msg: string, type: ToastType) => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pembeli) return;

        // Validasi password jika diisi
        const isChangingPassword = passLama || passBaru || passKonfirmasi;
        if (isChangingPassword && passBaru !== passKonfirmasi) {
            showToast(t("profile.toast_pass_mismatch"), "error");
            return;
        }
        if (isChangingPassword && passBaru.length < 8) {
            showToast(t("profile.toast_pass_too_short"), "error");
            return;
        }

        setLoading(true);
        try {
            // 1. Update profil
            const resProfil = await fetch(`${API}/api/pembeli/profil`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-Pembeli-Id": String(pembeli.id_pembeli),
                },
                body: JSON.stringify({ nama_pembeli: nama, email, no_telepon: telepon }),
            });
            const dataProfil = await resProfil.json();
            if (!dataProfil.success) {
                showToast(dataProfil.message ?? t("profile.toast_load_error"), "error");
                return;
            }

            // Update context agar Navbar ikut berubah
            login({ ...pembeli, nama_pembeli: nama, email, no_telepon: telepon });

            // 2. Update password (hanya jika field diisi)
            if (isChangingPassword) {
                const resPass = await fetch(`${API}/api/pembeli/password`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-Pembeli-Id": String(pembeli.id_pembeli),
                    },
                    body: JSON.stringify({
                        password_lama: passLama,
                        password_baru: passBaru,
                        password_confirmation: passKonfirmasi,
                    }),
                });
                const dataPass = await resPass.json();
                if (!dataPass.success) {
                    showToast(dataPass.message ?? t("profile.toast_load_error"), "error");
                    return;
                }
                setPassLama(""); setPassBaru(""); setPassKonfirmasi("");
            }

            showToast(
                isChangingPassword ? t("profile.toast_save_with_pass") : t("profile.toast_save_success"),
                "success"
            );
        } catch {
            showToast(t("profile.toast_server_error"), "error");
        } finally {
            setLoading(false);
        }
    };

    if (!isLoggedIn) return null;

    return (
        <>
            {/* ── HERO ── */}
            <section
                className="relative bg-[#f8f8f3] pt-48 pb-8 md:pt-56 md:pb-10"
                style={{
                    backgroundImage: "url('/images/pattern/beranda1.png')",
                    backgroundRepeat: "repeat",
                    backgroundSize: "auto",
                }}
            >
                <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-b from-transparent to-[#f3f3ee]" />
                <div className="relative max-w-2xl mx-auto px-6 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#5E8E1B]/10 ring-4 ring-[#5E8E1B]/20">
                        <span className="material-symbols-outlined text-[36px] text-[#5E8E1B]">account_circle</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">
                        {fetching ? <span className="inline-block w-32 h-8 rounded-lg bg-gray-200 animate-pulse" /> : (nama || t("profile.title"))}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {fetching ? <span className="inline-block w-48 h-3.5 rounded bg-gray-200 animate-pulse mt-1" /> : email}
                    </p>
                </div>
            </section>

            {/* ── FORM ── */}
            <section className="bg-[#f3f3ee] min-h-screen py-8">
                <div className="max-w-2xl mx-auto px-6">
                    {fetching ? (
                        <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8 space-y-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-12 rounded-xl bg-gray-100 animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">

                                {/* ── DATA PROFIL ── */}
                                <div className="px-8 pt-7 pb-6 border-b border-gray-100">
                                    <div className="flex items-center gap-2 mb-5">
                                        <span className="material-symbols-outlined text-[20px] text-[#5E8E1B]">person</span>
                                        <h2 className="text-[15px] font-semibold text-gray-700">{t("profile.data_section")}</h2>
                                    </div>
                                    <div className="space-y-4">
                                        <Field label={t("profile.full_name")} value={nama} onChange={setNama} placeholder={t("profile.placeholder_name")} />
                                        <Field label={t("profile.email")} type="email" value={email} onChange={setEmail} placeholder={t("profile.placeholder_email")} />
                                        <Field label={t("profile.phone")} value={telepon} onChange={setTelepon} placeholder={t("profile.placeholder_phone")} />
                                    </div>
                                </div>

                                {/* ── UBAH PASSWORD ── */}
                                <div className="px-8 pt-6 pb-7">
                                    <div className="flex items-center gap-2 mb-5">
                                        <span className="material-symbols-outlined text-[20px] text-[#F59B22]">lock</span>
                                        <h2 className="text-[15px] font-semibold text-gray-700">{t("profile.password_section")} <span className="text-xs font-normal text-gray-400">{t("profile.password_hint")}</span></h2>
                                    </div>
                                    <div className="space-y-4">
                                        <Field label={t("profile.old_pass")} type="password" value={passLama} onChange={setPassLama} placeholder={t("profile.placeholder_old_pass")} />
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <Field label={t("profile.new_pass")} type="password" value={passBaru} onChange={setPassBaru} placeholder={t("profile.placeholder_new_pass")} />
                                            <Field label={t("profile.confirm_pass")} type="password" value={passKonfirmasi} onChange={setPassKonfirmasi} placeholder={t("profile.placeholder_confirm")} />
                                        </div>

                                        {/* Password strength */}
                                        {passBaru.length > 0 && (
                                            <div className="flex items-center gap-2">
                                                <div className={`h-1.5 flex-1 rounded-full transition-all ${passBaru.length < 8 ? "bg-red-300" : passBaru.length < 12 ? "bg-yellow-300" : "bg-green-400"}`} />
                                                <span className={`text-xs font-medium ${passBaru.length < 8 ? "text-red-500" : passBaru.length < 12 ? "text-yellow-600" : "text-green-600"}`}>
                                                    {passBaru.length < 8 ? t("profile.pass_weak") : passBaru.length < 12 ? t("profile.pass_medium") : t("profile.pass_strong")}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* ── SUBMIT ── */}
                                <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex items-center gap-2 bg-[#5E8E1B] hover:bg-[#4a7015] text-white font-semibold text-sm px-8 py-3 rounded-full shadow transition hover:scale-[1.02] active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                                    >
                                        {loading ? (
                                            <>
                                                <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                                                {t("profile.saving")}
                                            </>
                                        ) : (
                                            <>
                                                <span className="material-symbols-outlined text-[18px]">save</span>
                                                {t("profile.save_btn")}
                                            </>
                                        )}
                                    </button>
                                </div>

                            </div>
                        </form>
                    )}
                </div>
            </section>

            {/* ── TOAST ── */}
            {toast && (
                <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3.5 rounded-full shadow-xl text-sm font-semibold ${toast.type === "success" ? "bg-[#5E8E1B] text-white" : "bg-red-500 text-white"}`}>
                    <span className="material-symbols-outlined text-[18px]">
                        {toast.type === "success" ? "check_circle" : "error"}
                    </span>
                    {toast.msg}
                </div>
            )}
        </>
    );
}
