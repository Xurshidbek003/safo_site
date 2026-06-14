"use client";

import { Package, Clock, Truck, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useOrdersStore } from "../store/orders-store";

export default function OrdersPageHeader() {
  const t = useTranslations("orders_header");
  const orders = useOrdersStore((state) => state.orders);

  const stats = [
    {
      icon: Clock,
      label: t("in_progress"),
      count: orders.filter((o) => o.status === "accepted" || o.status === "preparing").length,
    },
    {
      icon: Truck,
      label: t("on_the_way"),
      count: orders.filter((o) => o.status === "on_the_way").length,
    },
    {
      icon: CheckCircle2,
      label: t("delivered"),
      count: orders.filter((o) => o.status === "delivered").length,
    },
    {
      icon: Package,
      label: t("total"),
      count: orders.length,
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#071824] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/16 to-transparent" />

      <div className="relative z-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-[560px]">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/38">
              {t("eyebrow")}
            </p>
            <h1 className="mt-2 text-[24px] font-semibold tracking-tight text-white sm:text-[28px]">
              {t("title")}
            </h1>
            <p className="mt-2 text-[13px] leading-6 text-white/58 sm:text-[14px]">
              {t("desc")}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-cyan-300/12 bg-cyan-300/[0.05] px-3.5 py-2 text-[11px] font-medium text-cyan-100">
            <Package size={13} />
            {t("badge")}
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ icon: Icon, label, count }) => (
            <div key={label} className="rounded-[16px] border border-white/8 bg-white/[0.025] p-3.5">
              <div className="flex items-center gap-2 text-[12px] text-white/68">
                <Icon size={13} className="text-cyan-200" />
                {label}
              </div>
              <p className="mt-2 text-[18px] font-semibold text-white">{count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}