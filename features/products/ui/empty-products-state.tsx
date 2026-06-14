"use client";

import { useTranslations } from "next-intl";

type EmptyProductsStateProps = {
  onReset?: () => void;
};

export default function EmptyProductsState({ onReset }: EmptyProductsStateProps) {
  const t = useTranslations("products_page");

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-6 text-white shadow-[0_18px_44px_rgba(0,0,0,0.16)] backdrop-blur-sm sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(115,215,255,0.08),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[520px] text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xl sm:h-16 sm:w-16">
          💧
        </div>

        <h3 className="mt-5 text-[22px] font-semibold text-white sm:text-[26px]">
          {t("empty_title")}
        </h3>

        <p className="mt-3 text-[14px] leading-7 text-white/60 sm:text-[15px]">
          {t("empty_desc")}
        </p>

        {onReset && (
          <button
            onClick={onReset}
            className="mt-6 inline-flex items-center rounded-full border border-white/12 bg-white/[0.05] px-5 py-3 text-[12px] font-semibold text-white transition duration-300 hover:bg-white hover:text-[#0d2638] sm:text-[13px]"
          >
            {t("empty_btn")}
          </button>
        )}
      </div>
    </div>
  );
}
