"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Droplets, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { getFeaturedProducts } from "@/features/products/api/get-featured-products";
import { Product } from "@/features/products/model/types";
import { useCartStore } from "@/features/cart/store/cart-store";
import { useRouter } from "../../../i18n/navigation";

function formatPrice(price: number) {
  return new Intl.NumberFormat("uz-UZ").format(price);
}

function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    let active = true;
    getFeaturedProducts().then((data) => {
      if (active) setProducts(data);
    });
    return () => {
      active = false;
    };
  }, []);
  return products;
}

export default function FeaturedProductsSection() {
  const t = useTranslations("featured");
  const router = useRouter();

  const featuredProducts = useFeaturedProducts();
  const addItem = useCartStore((state) => state.addItem);

  const autoplay = useMemo(
    () => Autoplay({ delay: 3500, stopOnInteraction: true, stopOnMouseEnter: true }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: featuredProducts.length > 4,
      dragFree: false,
      containScroll: "trimSnaps",
      slidesToScroll: 1,
    },
    [autoplay],
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi, featuredProducts]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="relative overflow-hidden bg-[#081b29] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#081b29_0%,#0a2030_52%,#0c2436_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(89,201,255,0.07),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(89,201,255,0.05),transparent_20%)]" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-18 lg:px-10 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
              <Droplets size={14} className="text-cyan-200" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-100/70">
                {t("badge")}
              </span>
            </div>

            <h2 className="mt-4 text-[26px] font-semibold leading-tight text-white sm:text-[30px] lg:text-[30px]">
              {t("title1")} <span className="text-cyan-200">{t("title2")}</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-auto">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition duration-300 hover:border-cyan-100/20 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
              aria-label={t("prevAria")}
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition duration-300 hover:border-cyan-100/20 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
              aria-label={t("nextAria")}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden" ref={emblaRef}>
          <div className="-ml-4 flex">
            {featuredProducts.map((product, index) => {
              const productTitle = product.title;
              const productSubtitle = product.subtitle;
              const productDescription = product.description;
              const productBadge = product.badge ?? "";

              return (
                <div
                  key={`${product.id}-${index}`}
                  className="min-w-0 flex-[0_0_88%] pl-4 sm:flex-[0_0_48%] lg:flex-[0_0_32%] xl:flex-[0_0_25%]"
                >
                  <motion.article className="group relative flex h-full min-h-[410px] flex-col overflow-hidden rounded-[26px] border border-white/8 bg-white/[0.03] p-4 shadow-[0_18px_44px_rgba(0,0,0,0.16)] backdrop-blur-sm sm:min-h-[430px] sm:p-5">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />

                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full border border-cyan-100/10 bg-cyan-100/8 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-cyan-100/80">
                        {productBadge ?? t("defaultBadge")}
                      </span>
                      <span className="shrink-0 text-[11px] text-white/38">
                        {product.volume}
                      </span>
                    </div>

                    <div className="relative mt-5 overflow-hidden rounded-[20px] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.025)_0%,rgba(255,255,255,0.01)_100%)]">
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(115,215,255,0.10),transparent_38%)] opacity-80 transition duration-500 group-hover:opacity-100" />
                      <div className="pointer-events-none absolute left-1/2 top-[58%] h-[50px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100/6 blur-2xl transition duration-500 group-hover:h-[140px] group-hover:w-[140px] group-hover:bg-cyan-100/14" />
                      <div className="pointer-events-none absolute bottom-4 left-1/2 h-3 w-[130px] -translate-x-1/2 rounded-full bg-white/10 blur-lg transition duration-500 group-hover:w-[160px] group-hover:bg-cyan-100/18" />

                      <div className="relative flex h-[145px] items-center justify-center sm:h-[150px]">
                        <motion.div
                          whileHover={{ y: -8, scale: 1.06, rotate: -1.5 }}
                          transition={{ type: "spring", stiffness: 260, damping: 16 }}
                        >
                          <Image
                            src={product.image}
                            alt={productTitle}
                            width={170}
                            height={220}
                            className="relative z-10 max-h-[150px] w-auto object-contain object-center drop-shadow-[0_16px_24px_rgba(0,0,0,0.22)] sm:max-h-[165px]"
                          />
                        </motion.div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-100/40">
                        {productSubtitle}
                      </p>
                      <h3 className="mt-2 line-clamp-2 text-[20px] font-semibold text-white sm:text-[22px]">
                        {productTitle}
                      </h3>
                      <p className="mt-2.5 line-clamp-2 text-[13px] leading-6 text-white/56">
                        {productDescription}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/6 pt-4">
                      <div className="min-w-0">
                        <p className="text-[20px] font-semibold text-white sm:text-[22px]">
                          {formatPrice(product.price)}
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">
                          {t("currency")}
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          addItem({
                            id: product.id,
                            slug: product.slug,
                            title: productTitle,
                            volume: product.volume,
                            image: product.image,
                            price: product.price,
                            currency: product.currency as "UZS"
                          });

                          toast.success(t("toastTitle"), {
                            description: t("toastDescription", {
                              title: productTitle,
                              volume: product.volume,
                            }),
                            action: {
                              label: t("toastAction"),
                              onClick: () => router.push("/cart"),
                            },
                          });
                        }}
                        className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2.5 text-[11px] font-semibold text-white transition duration-300 hover:border-cyan-200/20 hover:bg-white/[0.08] sm:px-4 sm:text-[12px]"
                      >
                        <ShoppingBag size={14} />
                        {t("addToCart")}
                      </motion.button>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
