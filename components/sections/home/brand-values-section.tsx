"use client";

import { motion } from "motion/react";
import {
  Droplets,
  Sparkles,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";
import { useTranslations } from "next-intl"; // yoki o'zingizning i18n kutubxonangiz

const valueKeys = [
  { id: 1, icon: Droplets,     key: "pure_balance" },
  { id: 2, icon: PackageCheck, key: "daily_comfort" },
  { id: 3, icon: Sparkles,     key: "premium_identity" },
  { id: 4, icon: ShieldCheck,  key: "trusted_quality" },
];

export default function BrandValuesSection() {
  const t = useTranslations("brand_values");

  return (
    <section className="relative overflow-hidden bg-[#071a28] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#081b29_0%,#071a28_50%,#061622_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(90,200,255,0.08),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(90,200,255,0.05),transparent_20%),radial-gradient(circle_at_50%_100%,rgba(90,200,255,0.04),transparent_30%)]" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-18 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.1fr] xl:items-start">

          {/* Left content */}
          <div className="max-w-[500px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-100/70">
                {t("badge")}
              </span>
            </div>

            <h2 className="mt-4 text-[30px] font-semibold leading-[1.05] text-white sm:text-[38px] lg:text-[52px]">
              {t("heading_line1")}
              <span className="block text-cyan-200">{t("heading_line2")}</span>
              {t("heading_line3")}
            </h2>

            <p className="mt-5 max-w-[470px] text-[14px] leading-7 text-white/62 sm:text-[15px]">
              {t("description")}
            </p>

            <div className="mt-8 grid max-w-[420px] grid-cols-2 gap-4">
              <div className="rounded-[20px] border border-white/8 bg-white/[0.03] px-5 py-4 backdrop-blur-sm">
                <p className="text-[24px] font-semibold text-white">4+</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/40">
                  {t("stat_values")}
                </p>
              </div>

              <div className="rounded-[20px] border border-white/8 bg-white/[0.03] px-5 py-4 backdrop-blur-sm">
                <p className="text-[24px] font-semibold text-white">100%</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/40">
                  {t("stat_premium")}
                </p>
              </div>
            </div>
          </div>

          {/* Right cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {valueKeys.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  className="group relative min-h-[240px] overflow-hidden rounded-[26px] border border-white/8 bg-white/[0.035] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-md"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,220,255,0.10),transparent_32%)] opacity-80 transition duration-500 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />

                  <div className="relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-100/10 bg-cyan-100/8 text-cyan-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                      <Icon size={22} />
                    </div>

                    <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-100/45">
                      {t(`${item.key}.eyebrow`)}
                    </p>

                    <h3 className="mt-3 text-[18px] font-semibold leading-[1.25] text-white line-clamp-2">
                      {t(`${item.key}.title`)}
                    </h3>

                    <p className="mt-3 text-[13px] leading-6 text-white/58 line-clamp-3">
                      {t(`${item.key}.description`)}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
