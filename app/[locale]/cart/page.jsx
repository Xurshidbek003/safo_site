import { useTranslations } from "next-intl";
import CartItemsList from "@/features/cart/ui/cart-items-list";
import CheckoutCard from "@/features/cart/ui/checkout-card";

export default function CartPage() {
  const t = useTranslations("cart_page");

  return (
    <section className="relative bg-[#031522] pt-15 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(24,119,242,0.08),transparent_32%),radial-gradient(circle_at_left_top,rgba(56,189,248,0.06),transparent_24%)]" />

      <div className="relative mx-auto max-w-[1400px] px-4 pb-10 pt-8 sm:px-6">
        <div className="mb-6 lg:mb-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/10 bg-cyan-300/[0.04] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-100/80">
            {t("badge")}
          </div>
          <p className="mt-2 pl-2 text-[14px] leading-7 text-white/60 sm:text-[16px]">
            {t("desc")}
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_420px] xl:gap-7">
          <div className="min-w-0">
            <div className="rounded-[28px] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),rgba(255,255,255,0.005))] p-1 lg:max-h-[calc(100vh-220px)] lg:overflow-hidden">
              <div className="custom-scroll lg:max-h-[calc(100vh-228px)] lg:overflow-y-auto lg:pr-2">
                <CartItemsList />
              </div>
            </div>
          </div>

          <div className="min-w-0 self-start">
            <div className="lg:sticky lg:top-24">
              <CheckoutCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}