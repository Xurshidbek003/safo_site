import Image from "next/image";
import { MapPin, Phone, ReceiptText, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { Order } from "../model/types";
import { formatPrice } from "@/features/products/lib/format-price";
import OrderStatusSteps from "./order-status-steps";

type OrderCardProps = {
  order: Order;
};

export default function OrderCard({ order }: OrderCardProps) {
  const t = useTranslations("order_card");

  const contactRows = [
    { icon: User,   value: order.customerName },
    { icon: Phone,  value: order.phone },
    { icon: MapPin, value: order.address },
  ];

  return (
    <article className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#071824] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(50,180,255,0.05),transparent_30%)]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-white/8 pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-100">
              <ReceiptText size={16} />
            </div>
            <div>
              <h3 className="text-[16px] font-semibold text-white">
                {t("order_number", { id: order.id })}
              </h3>
              <p className="mt-0.5 text-[12px] text-white/50">{order.createdAt}</p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-[10px] uppercase tracking-[0.14em] text-white/38">
              {t("total")}
            </p>
            <p className="mt-1 text-[20px] font-semibold text-white">
              {formatPrice(order.total)}
            </p>
            <p className="text-[10px] text-white/40">{order.currency}</p>
          </div>
        </div>

        {/* Status */}
        <div className="mt-4">
          <OrderStatusSteps status={order.status} />
        </div>

        {/* Items + Contact */}
        <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_270px]">
          {/* Items */}
          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={`${order.id}-${item.id}`}
                className="flex items-center gap-3 rounded-[16px] border border-white/8 bg-white/[0.025] px-3 py-3"
              >
                <div className="relative h-[70px] w-[58px] shrink-0 overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.03]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                    sizes="58px"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-[14px] font-semibold text-white">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-[12px] text-white/52">
                    {item.volume} · {t("quantity", { count: item.quantity })}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[14px] font-semibold text-white">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <p className="text-[10px] text-white/40">{item.currency}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact info */}
          <div className="space-y-3 rounded-[18px] border border-white/8 bg-white/[0.025] p-4">
            {contactRows.map(({ icon: Icon, value }) => (
              <div key={value} className="flex items-start gap-2 text-[13px] text-white/65">
                <Icon size={15} className="mt-0.5 shrink-0 text-cyan-200" />
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}