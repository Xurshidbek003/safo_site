"use client";

import { Package } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useOrdersStore } from "@/features/orders/store/orders-store";
import OrderCard from "@/features/orders/ui/order-card";

export default function CabinetOrdersTab() {
  const t = useTranslations("cabinet");
  const orders = useOrdersStore((s) => s.orders);

  return (
    <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#071824] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.06),transparent_35%)]" />

      <div className="relative z-10">
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/38">{t("orders_title")}</p>
        <h2 className="mt-1.5 text-[20px] font-semibold text-white sm:text-[22px]">{t("orders_title")}</h2>
        <p className="mt-1 text-[13px] text-white/55">{t("orders_subtitle")}</p>

        <div className="mt-5">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[18px] border border-white/8 bg-white/[0.02] py-14 text-center">
              <Package size={36} className="text-white/15" />
              <p className="mt-4 text-[16px] font-semibold text-white/50">{t("orders_empty")}</p>
              <p className="mt-1.5 text-[13px] text-white/30">{t("orders_empty_desc")}</p>
              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-5 py-2.5 text-[13px] font-medium text-cyan-100 transition hover:bg-cyan-300/[0.10]"
              >
                {t("orders_go_shop")}
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
