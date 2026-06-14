"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ReceiptText,
  User,
  Phone,
  MapPin,
  ArrowRight,
  Truck,
  ShieldCheck,
  X,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useCartStore } from "../store/cart-store";
import { createPublicOrder } from "../api/create-order";
import { formatPrice } from "@/features/products/lib/format-price";
import { useOrdersStore } from "@/features/orders/store/orders-store";

function formatUzPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 7);
  const p1 = digits.slice(0, 2);
  const p2 = digits.slice(2, 5);
  const p3 = digits.slice(5, 7);
  if (!digits) return "";
  if (digits.length <= 2) return p1;
  if (digits.length <= 5) return `${p1}-${p2}`;
  return `${p1}-${p2}-${p3}`;
}

type ModalState = "empty-cart" | "missing-contact" | "confirm" | "success";

export default function CheckoutCard() {
  const t = useTranslations("checkout");
  const items = useCartStore((state) => state.items);
  const createOrder = useOrdersStore((state) => state.createOrder);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState<ModalState>("confirm");
  const [submitting, setSubmitting] = useState(false);

  const trimmedName = name.trim();
  const trimmedAddress = address.trim();
  const phoneDigits = phone.replace(/\D/g, "");

  const hasItems = totalItems > 0;
  const hasName = trimmedName.length > 0;
  const hasPhone = phoneDigits.length === 7;

  const modalConfig = useMemo(() => {
    const configs: Record<
  ModalState,
  { icon: React.ReactNode; iconClass: string; title: string; description: string }> = {
      "empty-cart": {
        icon: <ShoppingBag size={18} />,
        iconClass: "bg-amber-400/10 text-amber-300",
        title: t("modal.empty_cart.title"),
        description: t("modal.empty_cart.desc"),
      },
      "missing-contact": {
        icon: <AlertCircle size={18} />,
        iconClass: "bg-rose-400/10 text-rose-300",
        title: t("modal.missing_contact.title"),
        description: t("modal.missing_contact.desc"),
      },
      success: {
        icon: <CheckCircle2 size={18} />,
        iconClass: "bg-emerald-400/10 text-emerald-300",
        title: t("modal.success.title"),
        description: t("modal.success.desc"),
      },
      confirm: {
        icon: <CheckCircle2 size={18} />,
        iconClass: "bg-cyan-400/10 text-cyan-300",
        title: t("modal.confirm.title"),
        description: t("modal.confirm.desc"),
      },
    };
    return configs[modalState];
  }, [modalState, t]);

  const handleConfirm = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      // 1) Buyurtmani backendga yuboramiz — admin CRM'ida ko'rinadi
      await createPublicOrder({
        customer_name: trimmedName,
        phone: `+998 ${phone}`,
        address: trimmedAddress,
        items: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
        })),
      });

      // 2) Mijozning "Buyurtmalarim" sahifasi uchun lokal saqlash
      createOrder({
        customerName: trimmedName,
        phone: `+998 ${phone}`,
        address: trimmedAddress || t("address_missing"),
        items: items.map((item) => ({
          id: item.id,
          slug: item.slug,
          title: item.title,
          image: item.image,
          volume: item.volume,
          quantity: item.quantity,
          price: item.price,
          currency: item.currency,
        })),
      });

      setModalState("success");
      clearCart();
      setName("");
      setPhone("");
      setAddress("");
    } catch {
      toast.error("Buyurtmani yuborishda xatolik. Iltimos, qaytadan urinib ko'ring.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenModal = () => {
    if (!hasItems) {
      setModalState("empty-cart");
      setIsModalOpen(true);
      return;
    }
    if (!hasName || !hasPhone) {
      setModalState("missing-contact");
      setIsModalOpen(true);
      return;
    }
    setModalState("confirm");
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setIsModalOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#071824] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(50,180,255,0.06),transparent_30%)]" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-100">
              <ReceiptText size={16} />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-white">
                {t("title")}
              </h2>
              <p className="text-[11px] text-white/50">{t("subtitle")}</p>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-4 space-y-2.5 text-[13px]">
            <div className="flex justify-between text-white/65">
              <span>{t("summary.products")}</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between text-white/65">
              <span>{t("summary.delivery")}</span>
              <span className="text-emerald-300">{t("summary.free")}</span>
            </div>
            <div className="flex justify-between text-white/65">
              <span>{t("summary.service")}</span>
              <span>0 UZS</span>
            </div>
            <div className="my-2 h-px bg-white/10" />
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] text-white/40">
                  {t("summary.total")}
                </p>
                <p className="text-[20px] font-semibold text-white">
                  {formatPrice(total)}
                </p>
              </div>
              <span className="text-[10px] text-white/40">UZS</span>
            </div>
          </div>

          {/* Badges */}
          <div className="mt-3 flex flex-wrap gap-3 text-[12px] text-white/65">
            <div className="flex items-center gap-1.5">
              <Truck size={14} className="text-cyan-200" />
              {t("badges.fast_delivery")}
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-cyan-200" />
              {t("badges.trusted")}
            </div>
          </div>

          {/* Form */}
          <div className="mt-4 space-y-2.5">
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25"
                size={14}
              />
              <input
                type="text"
                placeholder={t("form.name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 w-full rounded-[12px] border border-white/10 bg-white/[0.03] pl-10 pr-3 text-[13px] text-white outline-none placeholder:text-white/30"
              />
            </div>

            <div className="flex h-10 items-center rounded-[12px] border border-white/10 bg-white/[0.03] px-3">
              <Phone size={14} className="mr-2 text-white/25" />
              <span className="mr-2 text-[13px] text-white/70">+998</span>
              <input
                value={phone}
                onChange={(e) => setPhone(formatUzPhone(e.target.value))}
                placeholder={t("form.phone_placeholder")}
                className="w-full bg-transparent text-[13px] text-white outline-none placeholder:text-white/30"
              />
            </div>

            <div className="relative">
              <MapPin
                className="absolute left-3 top-3 text-white/25"
                size={14}
              />
              <textarea
                rows={2}
                placeholder={t("form.address")}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="h-10 w-full resize-none rounded-[12px] border border-white/10 bg-white/[0.03] pl-10 pr-3 pt-2.5 text-[13px] text-white outline-none placeholder:text-white/30"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenModal}
            className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-cyan-500 to-blue-600 text-[13px] font-semibold text-white transition hover:opacity-90"
          >
            {t("submit")}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-[420px] overflow-hidden rounded-[22px] border border-white/10 bg-[#071824] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(50,180,255,0.08),transparent_32%)]" />

            <div className="relative z-10">
              {/* Modal header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${modalConfig.iconClass}`}
                  >
                    {modalConfig.icon}
                  </div>
                  <div>
                    <h3 className="text-[16px] font-semibold text-white">
                      {modalConfig.title}
                    </h3>
                    <p className="mt-1 text-[12px] text-white/50">
                      {modalConfig.description}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.03] text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Confirm state */}
              {modalState === "confirm" && (
                <>
                  <div className="mt-5 space-y-3 rounded-[16px] border border-white/8 bg-white/[0.025] p-4">
                    {[
                      {
                        label: t("modal.confirm.field_name"),
                        value: trimmedName || t("not_entered"),
                      },
                      {
                        label: t("modal.confirm.field_phone"),
                        value: phone ? `+998 ${phone}` : t("not_entered"),
                      },
                      {
                        label: t("modal.confirm.field_address"),
                        value: trimmedAddress || t("not_entered"),
                      },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex items-start justify-between gap-4 text-[13px]"
                      >
                        <span className="text-white/50">{label}</span>
                        <span className="max-w-[220px] text-right text-white">
                          {value}
                        </span>
                      </div>
                    ))}

                    <div className="my-1 h-px bg-white/8" />

                    <div className="flex items-start justify-between gap-4 text-[13px]">
                      <span className="text-white/50">
                        {t("modal.confirm.field_items")}
                      </span>
                      <span className="text-white">{totalItems}</span>
                    </div>
                    <div className="flex items-start justify-between gap-4 text-[13px]">
                      <span className="text-white/50">
                        {t("modal.confirm.field_total")}
                      </span>
                      <span className="text-white">
                        {formatPrice(total)} UZS
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-2.5">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="inline-flex h-10 flex-1 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.03] text-[13px] font-medium text-white/80 transition hover:bg-white/[0.06]"
                    >
                      {t("modal.confirm.cancel")}
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirm}
                      disabled={submitting}
                      className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-[12px] bg-gradient-to-r from-cyan-500 to-blue-600 text-[13px] font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                    >
                      {submitting ? "Yuborilmoqda..." : t("modal.confirm.approve")}
                      {!submitting && <ArrowRight size={14} />}
                    </button>
                  </div>
                </>
              )}

              {/* Success state */}
              {modalState === "success" && (
                <div className="mt-5 text-center">
                  <p className="text-[14px] text-white/70">
                    {t("modal.success.body")}
                  </p>
                  <p className="mt-2 text-[13px] text-white/50">
                    {t("modal.success.hint")}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-[12px] bg-gradient-to-r from-cyan-500 to-blue-600 text-[13px] font-semibold text-white transition hover:opacity-90"
                  >
                    {t("modal.success.close")}
                  </button>
                </div>
              )}

              {/* Empty / missing-contact state */}
              {(modalState === "empty-cart" ||
                modalState === "missing-contact") && (
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="inline-flex h-10 w-full items-center justify-center rounded-[12px] bg-gradient-to-r from-cyan-500 to-blue-600 text-[13px] font-semibold text-white transition hover:opacity-90"
                  >
                    {t("modal.ok")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
