"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Palette } from "lucide-react";
import { useCabinetStore } from "../store/cabinet-store";

const AVATAR_COLORS = [
  "#0e7490", "#0f766e", "#7c3aed", "#b45309",
  "#be123c", "#1d4ed8", "#065f46", "#9333ea",
];

export default function CabinetProfileTab() {
  const t = useTranslations("cabinet");
  const { profile, updateProfile } = useCabinetStore();

  const [form, setForm] = useState({
    name: profile.name,
    phone: profile.phone,
    email: profile.email,
    city: profile.city,
  });
  const [saved, setSaved] = useState(false);
  const [showColors, setShowColors] = useState(false);

  const handleSave = () => {
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputClass =
    "h-12 w-full rounded-[14px] border border-white/10 bg-[#052637] px-4 text-[14px] text-white outline-none transition duration-300 placeholder:text-white/30 hover:border-cyan-200/20 focus:border-cyan-200/35";

  return (
    <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#071824] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(80,200,255,0.07),transparent_30%)]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/38">{t("profile_title")}</p>
            <h2 className="mt-1.5 text-[20px] font-semibold text-white sm:text-[22px]">{t("profile_title")}</h2>
            <p className="mt-1 text-[13px] text-white/55">{t("profile_subtitle")}</p>
          </div>

          {/* Avatar color picker */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowColors((p) => !p)}
              className="flex h-12 w-12 items-center justify-center rounded-[14px] text-[20px] font-bold text-white transition hover:scale-105"
              style={{ backgroundColor: profile.avatarColor }}
              title={t("profile_avatar_change")}
            >
              {profile.name ? profile.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() : "S"}
            </button>
            <button
              onClick={() => setShowColors((p) => !p)}
              className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#071824] bg-cyan-500"
            >
              <Palette size={10} className="text-white" />
            </button>

            {showColors && (
              <div className="absolute right-0 top-14 z-20 flex gap-1.5 rounded-[14px] border border-white/10 bg-[#071824] p-2 shadow-xl">
                {AVATAR_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => { updateProfile({ avatarColor: color }); setShowColors(false); }}
                    className="relative h-7 w-7 rounded-full transition hover:scale-110"
                    style={{ backgroundColor: color }}
                  >
                    {profile.avatarColor === color && (
                      <Check size={12} className="absolute inset-0 m-auto text-white" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-[12px] text-white/50">{t("profile_name")}</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder={t("profile_name_placeholder")}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-[12px] text-white/50">{t("profile_phone")}</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              placeholder={t("profile_phone_placeholder")}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-[12px] text-white/50">{t("profile_email")}</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              placeholder={t("profile_email_placeholder")}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-[12px] text-white/50">{t("profile_city")}</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
              placeholder={t("profile_city_placeholder")}
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSave}
            className={`inline-flex h-11 items-center gap-2 rounded-[14px] px-6 text-[14px] font-semibold text-white transition-all duration-300 ${
              saved
                ? "bg-emerald-600"
                : "bg-[linear-gradient(180deg,#15739c_0%,#0a4f70_100%)] hover:brightness-110"
            }`}
          >
            {saved && <Check size={15} />}
            {saved ? t("profile_saved") : t("profile_save")}
          </button>
        </div>
      </div>
    </div>
  );
}
