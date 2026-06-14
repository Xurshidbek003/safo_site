"use client";

import {
  Droplets, ShieldCheck, Sparkles,
  BadgeCheck, Users, Truck, ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const valueIcons = [Droplets, ShieldCheck, Sparkles];
const featureIcons = [BadgeCheck, Users, Truck];

export default function AboutPage() {
  const t = useTranslations("about");

  const values = (t.raw("values") as { title: string; text: string }[]);
  const features = (t.raw("features") as { title: string; text: string }[]);
  const stats = (t.raw("stats") as { value: string; label: string }[]);
  const tags = (t.raw("hero_tags") as string[]);

  return (
    <section className="relative bg-[#031522] pt-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(24,119,242,0.08),transparent_32%),radial-gradient(circle_at_left_top,rgba(56,189,248,0.06),transparent_24%)]" />

      <div className="relative mx-auto max-w-[1400px] space-y-6 px-4 pb-10 pt-8 sm:px-6 lg:px-8">

        {/* HERO */}
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#071824] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] sm:p-7 lg:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.10),transparent_34%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/18 to-transparent" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
            <div className="max-w-[760px]">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">
                {t("hero.eyebrow")}
              </p>
              <h1 className="mt-3 text-[30px] font-semibold leading-tight tracking-tight text-white sm:text-[38px] lg:text-[46px]">
                {t("hero.heading_line1")}
                <span className="block text-cyan-100">{t("hero.heading_line2")}</span>
              </h1>
              <p className="mt-4 max-w-[680px] text-[14px] leading-7 text-white/62 sm:text-[15px]">
                {t("hero.desc")}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12px] text-white/75 first:border-cyan-300/12 first:bg-cyan-300/[0.06] first:text-cyan-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-cyan-500 to-blue-600 px-5 text-[13px] font-semibold text-white transition hover:opacity-90"
                >
                  {t("hero.cta_products")}
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.03] px-5 text-[13px] font-medium text-white/85 transition hover:bg-white/[0.05]"
                >
                  {t("hero.cta_contact")}
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {stats.map((item) => (
                <div key={item.label} className="rounded-[20px] border border-white/8 bg-white/[0.025] p-4">
                  <p className="text-[24px] font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-[12px] text-white/52">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STORY + VALUES */}
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Story */}
          <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#071824] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] sm:p-6">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_28%)]" />
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                {t("story.eyebrow")}
              </p>
              <h2 className="mt-2 text-[22px] font-semibold text-white sm:text-[24px]">
                {t("story.title")}
              </h2>
              <div className="mt-4 space-y-4 text-[14px] leading-7 text-white/62">
                {(t.raw("story.paragraphs") as string[]).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#071824] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] sm:p-6">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.06),transparent_26%)]" />
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                {t("values_section.eyebrow")}
              </p>
              <h2 className="mt-2 text-[22px] font-semibold text-white sm:text-[24px]">
                {t("values_section.title")}
              </h2>
              <div className="mt-5 space-y-3">
                {values.map((item, i) => {
                  const Icon = valueIcons[i];
                  return (
                    <div key={item.title} className="rounded-[18px] border border-white/8 bg-white/[0.025] p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-300/[0.08] text-cyan-100">
                          <Icon size={16} />
                        </div>
                        <div>
                          <h3 className="text-[15px] font-semibold text-white">{item.title}</h3>
                          <p className="mt-1.5 text-[13px] leading-6 text-white/60">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#071824] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] sm:p-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.06),transparent_34%)]" />
          <div className="relative z-10">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
              {t("features_section.eyebrow")}
            </p>
            <h2 className="mt-2 text-[22px] font-semibold text-white sm:text-[24px]">
              {t("features_section.title")}
            </h2>
            <div className="mt-5 grid gap-3 lg:grid-cols-3">
              {features.map((item, i) => {
                const Icon = featureIcons[i];
                return (
                  <div key={item.title} className="rounded-[20px] border border-white/8 bg-white/[0.025] p-4 transition hover:border-cyan-300/12">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-300/[0.08] text-cyan-100">
                      <Icon size={16} />
                    </div>
                    <h3 className="mt-4 text-[16px] font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-[13px] leading-6 text-white/60">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#071824] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)] sm:p-7">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(56,189,248,0.08),transparent_28%)]" />
          <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[700px]">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                {t("cta.eyebrow")}
              </p>
              <h2 className="mt-2 text-[24px] font-semibold text-white sm:text-[28px]">
                {t("cta.title")}
              </h2>
              <p className="mt-3 text-[14px] leading-7 text-white/60">
                {t("cta.desc")}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-cyan-500 to-blue-600 px-5 text-[13px] font-semibold text-white transition hover:opacity-90"
              >
                {t("cta.btn_products")}
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.03] px-5 text-[13px] font-medium text-white/85 transition hover:bg-white/[0.05]"
              >
                {t("cta.btn_contact")}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}