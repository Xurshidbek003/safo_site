"use client";

import { User, Crown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCabinetStore } from "../store/cabinet-store";
import { useOrdersStore } from "@/features/orders/store/orders-store";
import { useCartStore } from "@/features/cart/store/cart-store";

export default function CabinetHero() {
  const t = useTranslations("cabinet");
  const profile = useCabinetStore((s) => s.profile);
  const orders = useOrdersStore((s) => s.orders);
  const cartCount = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const initials = profile.name
    ? profile.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "S";

  const stats = [
    { label: t("stat_orders"), value: orders.length },
    { label: t("stat_cart"), value: cartCount },
    { label: t("stat_member_since"), value: profile.memberSince },
  ];

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#071824] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.22)] sm:p-8">
      {/* BG glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.10),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent" />

      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-5">
          {/* Avatar */}
          <div
            className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[20px] text-[26px] font-bold text-white shadow-[0_8px_24px_rgba(0,0,0,0.3)] sm:h-[80px] sm:w-[80px] sm:text-[30px]"
            style={{ backgroundColor: profile.avatarColor || "#0e7490" }}
          >
            {initials}
            <div className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#071824] bg-cyan-500">
              <Crown size={11} className="text-white" />
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">
              {t("hero_eyebrow")}
            </p>
            <h1 className="mt-1 text-[22px] font-semibold text-white sm:text-[26px]">
              {profile.name ? `${t("hero_title")}, ${profile.name.split(" ")[0]}` : t("hero_title")}
            </h1>
            {profile.email && (
              <p className="mt-0.5 text-[13px] text-white/50">{profile.email}</p>
            )}
          </div>
        </div>

        {/* Badge */}
        <div className="flex items-center gap-2 self-start rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 sm:self-auto">
          <Crown size={13} className="text-cyan-300" />
          <span className="text-[11px] font-semibold text-cyan-100">{t("hero_badge")}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-10 mt-6 grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[16px] border border-white/8 bg-white/[0.03] p-3 text-center sm:p-4"
          >
            <p className="text-[18px] font-semibold text-white sm:text-[22px]">
              {stat.value}
            </p>
            <p className="mt-0.5 text-[10px] text-white/45 sm:text-[11px]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
