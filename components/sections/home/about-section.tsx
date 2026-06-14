"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function AboutSection() {
  const t = useTranslations("about_section");

  return (
    <section className="relative overflow-hidden bg-[#0a1f2e] py-16 text-white sm:py-20 lg:min-h-[760px] lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_28%,rgba(89,201,255,0.09),transparent_24%),radial-gradient(circle_at_80%_24%,rgba(89,201,255,0.05),transparent_22%),linear-gradient(180deg,#091d2c_0%,#0b2132_55%,#0d2638_100%)]" />

      <div className="pointer-events-none absolute bottom-[10%] left-[-100px] h-[220px] w-[220px] rounded-full bg-cyan-300/8 blur-3xl sm:h-[260px] sm:w-[260px]" />
      <div className="pointer-events-none absolute right-[-100px] top-[10%] h-[220px] w-[220px] rounded-full bg-sky-300/8 blur-3xl sm:h-[260px] sm:w-[260px]" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-10">

          {/* left */}
          <div className="max-w-[560px]">
            <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-cyan-100/60 sm:text-[11px] sm:tracking-[0.42em]">
              {t("badge")}
            </p>

            <h2 className="mt-4 text-[30px] font-semibold leading-[1.08] text-white sm:mt-5 sm:text-[40px] lg:text-[47px]">
              {t("heading_line1")}
              <span className="block text-cyan-200">
                {t("heading_line2")}
              </span>
            </h2>

            <p className="mt-5 max-w-[500px] text-[14px] leading-7 text-white/64 sm:mt-6 sm:text-[16px] sm:leading-8 lg:text-[17px]">
              {t("description")}
            </p>
          </div>

          {/* right */}
          <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-md sm:rounded-[30px] sm:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,220,255,0.10),transparent_30%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />

            <div className="relative z-10">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[20px] border border-white/8 bg-white/[0.025] p-5 sm:rounded-[22px]">
                  <p className="text-[24px] font-semibold text-white sm:text-[28px]">
                    100%
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/40 sm:text-[11px] sm:tracking-[0.24em]">
                    {t("stat_purity")}
                  </p>
                </div>

                <div className="rounded-[20px] border border-white/8 bg-white/[0.025] p-5 sm:rounded-[22px]">
                  <p className="text-[24px] font-semibold text-white sm:text-[28px]">
                    Daily
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/40 sm:text-[11px] sm:tracking-[0.24em]">
                    {t("stat_daily")}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-[22px] border border-white/8 bg-white/[0.025] p-5 sm:mt-6 sm:rounded-[24px] sm:p-6">
                <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-100/46 sm:text-[12px] sm:tracking-[0.28em]">
                  {t("note_label")}
                </p>

                <p className="mt-4 text-[14px] leading-7 text-white/62 sm:text-[15px]">
                  {t("note_text")}
                </p>

                <Link href="/about" className="cursor-pointer">
                  <button className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-3 text-[12px] font-semibold text-white transition duration-300 hover:bg-white hover:text-[#0d2638] sm:px-5 sm:text-[13px]">
                    {t("cta_button")}
                    <ArrowUpRight size={16} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}