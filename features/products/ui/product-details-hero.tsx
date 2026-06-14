"use client";
import Image from "next/image";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Product } from "../model/types";
import { formatPrice } from "../lib/format-price";
import { useCartStore } from "@/features/cart/store/cart-store";

type ProductDetailsHeroProps = {
  product: Product;
};

export default function ProductDetailsHero({ product }: ProductDetailsHeroProps) {
  const t = useTranslations("product_details");
  const addItem = useCartStore((state) => state.addItem);

  const productTitle = product.title;
  const productSubtitle = product.subtitle;
  const productDescription = product.description;
  const productBadge = product.badge ?? "";

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      title: productTitle,
      volume: product.volume,
      image: product.image,
      price: product.price,
      currency: product.currency as "UZS"
    });
  };

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#071824] shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.10),transparent_35%)]" />

      <div className="relative grid lg:grid-cols-[360px_minmax(0,1fr)]">
        <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden border-r border-white/6 bg-[#081c2a]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(115,215,255,0.18),transparent_55%)]" />
          <div className="pointer-events-none absolute h-[280px] w-[280px] rounded-full bg-cyan-300/20 blur-[120px]" />
          <div className="relative h-[260px] w-[160px] lg:h-[300px] lg:w-[180px]">
            <Image
              src={product.image}
              alt={productTitle}
              fill
              priority
              className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)] transition duration-500 hover:scale-[1.08]"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between p-6 lg:p-7">
          <div>
            <div className="flex items-center gap-2 text-[11px] text-white/50">
              <Link href="/" className="transition hover:text-white">{t("breadcrumb_home")}</Link>
              <ChevronRight size={12} />
              <Link href="/products" className="transition hover:text-white">{t("breadcrumb_products")}</Link>
              <ChevronRight size={12} />
              <span className="text-white/80">{productTitle}</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-[10px] text-cyan-100">{productBadge}</span>
              <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] text-white/75">{product.volume}</span>
            </div>

            <h1 className="mt-4 text-[28px] font-semibold text-white sm:text-[32px] lg:text-[36px]">{productTitle}</h1>
            <p className="mt-2 text-[14px] text-cyan-100/80">{productSubtitle}</p>
            <p className="mt-3 max-w-[600px] text-[14px] leading-6 text-white/75">{productDescription}</p>
          </div>

          <div className="mt-6 flex flex-col gap-5 border-t border-white/6 pt-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{t("price_label")}</p>
              <div className="mt-1 flex items-end gap-2">
                <p className="text-[28px] font-semibold text-white sm:text-[32px]">{formatPrice(product.price)}</p>
                <span className="text-[11px] text-white/50">{product.currency}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-[16px] bg-cyan-700 px-7 text-[14px] font-semibold text-white transition-all hover:bg-cyan-600"
              >
                <ShoppingBag size={16} />
                {t("add_to_cart")}
              </button>
              <Link
                href="/products"
                className="inline-flex h-12 items-center justify-center rounded-[16px] border border-white/10 px-6 text-[14px] text-white/80 transition hover:bg-white/[0.05]"
              >
                {t("back_to_products")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
