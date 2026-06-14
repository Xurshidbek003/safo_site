"use client";

import { useState } from "react";
import { Bell, Globe, Moon, AlertTriangle, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useCabinetStore } from "../store/cabinet-store";
import { useCartStore } from "@/features/cart/store/cart-store";
import { useOrdersStore } from "@/features/orders/store/orders-store";

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative h-6 w-11 rounded-full transition-colors duration-200 flex-shrink-0 ${
        checked ? "bg-cyan-500" : "bg-white/15"
      }`}
    >
      <span
        className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full bg-white shadow-md transition-all duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function CabinetSettingsTab() {
  const t = useTranslations("cabinet");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { notifications, updateNotifications, clearAllData } = useCabinetStore();
  const clearCart = useCartStore((s) => s.clearCart);
  const clearOrders = useOrdersStore((s) => s.clearOrders);
  const [confirmClear, setConfirmClear] = useState(false);

  const handleClearAll = () => {
    clearAllData();
    clearCart();
    clearOrders();
    setConfirmClear(false);
  };

  const handleLocale = (next: "uz" | "ru") => {
    router.replace(pathname, { locale: next });
  };

  const cardClass = "rounded-[18px] border border-white/8 bg-white/[0.025] p-4 sm:p-5";

  return (
    <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#071824] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(80,200,255,0.06),transparent_30%)]" />

      <div className="relative z-10 space-y-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/38">{t("settings_title")}</p>
          <h2 className="mt-1.5 text-[20px] font-semibold text-white sm:text-[22px]">{t("settings_title")}</h2>
          <p className="mt-1 text-[13px] text-white/55">{t("settings_subtitle")}</p>
        </div>

        {/* Notifications */}
        <div className={cardClass}>
          <div className="flex items-center gap-2 text-[13px] font-medium text-white/70">
            <Bell size={14} className="text-cyan-300" />
            {t("settings_notifications")}
          </div>
          <div className="mt-4 space-y-3">
            {[
              { key: "orderStatus" as const, label: t("settings_notif_order") },
              { key: "promotions" as const, label: t("settings_notif_promo") },
              { key: "news" as const, label: t("settings_notif_news") },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between gap-3">
                <span className="text-[13px] text-white/65">{label}</span>
                <Toggle
                  checked={notifications[key]}
                  onChange={() => updateNotifications({ [key]: !notifications[key] })}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className={cardClass}>
          <div className="flex items-center gap-2 text-[13px] font-medium text-white/70">
            <Globe size={14} className="text-cyan-300" />
            {t("settings_language")}
          </div>
          <div className="mt-4 flex gap-2">
            {(["uz", "ru"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLocale(lang)}
                className={`flex-1 rounded-[12px] border py-2.5 text-[13px] font-semibold uppercase transition ${
                  locale === lang
                    ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-200"
                    : "border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.06]"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Theme */}
        <div className={cardClass}>
          <div className="flex items-center gap-2 text-[13px] font-medium text-white/70">
            <Moon size={14} className="text-cyan-300" />
            {t("settings_theme")}
          </div>
          <div className="mt-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 text-[12px] font-medium text-cyan-100">
              <Moon size={11} /> {t("settings_theme_dark")}
            </div>
          </div>
        </div>

        {/* Danger zone */}
        <div className={`${cardClass} border-rose-500/15`}>
          <div className="flex items-center gap-2 text-[13px] font-medium text-rose-300/80">
            <AlertTriangle size={14} />
            {t("settings_danger")}
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            {!confirmClear ? (
              <button
                onClick={() => setConfirmClear(true)}
                className="inline-flex items-center gap-2 rounded-[12px] border border-rose-400/15 bg-rose-400/[0.05] px-4 py-2.5 text-[13px] text-rose-300/70 transition hover:bg-rose-400/[0.08] hover:text-rose-300"
              >
                <AlertTriangle size={13} />
                {t("settings_clear_data")}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-rose-300/70">{t("settings_clear_confirm")}</span>
                <button
                  onClick={handleClearAll}
                  className="rounded-[12px] bg-rose-500/80 px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-rose-500"
                >
                  Ha
                </button>
                <button
                  onClick={() => setConfirmClear(false)}
                  className="rounded-[12px] border border-white/10 px-4 py-2 text-[12px] text-white/50 transition hover:bg-white/[0.04]"
                >
                  Yo'q
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}