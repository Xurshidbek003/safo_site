"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

const slideKeys = [
  { id: 1, image: "/images/hero/bottle-big-new.png", key: "slide_1" },
  { id: 2, image: "/images/hero/bottle-glass.png",   key: "slide_2" },
  { id: 3, image: "/images/hero/bottle-big-new.png", key: "slide_3" },
  { id: 4, image: "/images/hero/bottle-big-new.png", key: "slide_4" },
  { id: 5, image: "/images/hero/bottle-glass.png",   key: "slide_5" },
  { id: 6, image: "/images/hero/bottle-big-new.png", key: "slide_6" },
];

export default function StillWaterSection() {
  const t = useTranslations("still_water");
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((prev) => (prev - 1 + slideKeys.length) % slideKeys.length);
  const next = () => setIndex((prev) => (prev + 1) % slideKeys.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slideKeys.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = slideKeys[index];

  const getPosition = (i: number) => {
    if (i === index) return "center";
    if (i === (index - 1 + slideKeys.length) % slideKeys.length) return "left";
    if (i === (index + 1) % slideKeys.length) return "right";
    return "hidden";
  };

  return (
    <section className="relative overflow-hidden bg-[#0b2030] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(89,201,255,0.10),transparent_24%),radial-gradient(circle_at_80%_22%,rgba(89,201,255,0.08),transparent_22%),linear-gradient(180deg,#081b29_0%,#0c2335_55%,#0e2739_100%)]" />

      <div className="pointer-events-none absolute left-[-100px] top-[18%] h-[180px] w-[180px] rounded-full bg-cyan-300/8 blur-3xl sm:h-[240px] sm:w-[240px]" />
      <div className="pointer-events-none absolute right-[-120px] top-[14%] h-[200px] w-[200px] rounded-full bg-sky-300/8 blur-3xl sm:h-[280px] sm:w-[280px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[80px] bg-gradient-to-b from-transparent to-[#0d2638] sm:h-[100px]" />

      <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-6 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-14">
        <div className="max-w-[500px]">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-cyan-100/60 sm:text-[11px] sm:tracking-[0.38em]">
            {t("badge")}
          </p>

          <div
            key={`${activeSlide.id}-${index}`}
            className="animate-[fadeSoft_.55s_ease]"
          >
            <h2 className="mt-3 text-[30px] font-semibold leading-none text-white sm:mt-4 sm:text-[42px] lg:text-[56px]">
              {t(`${activeSlide.key}.title`)}
            </h2>

            <p className="mt-4 max-w-[420px] text-[14px] leading-6 text-white/68 sm:text-[15px] sm:leading-7 lg:text-[16px]">
              {t(`${activeSlide.key}.text`)}
            </p>

            <p className="mt-5 text-[24px] font-semibold tracking-tight text-white sm:mt-7 sm:text-[28px] lg:text-[30px]">
              {t(`${activeSlide.key}.size`)}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white transition duration-300 hover:border-cyan-100/20 hover:bg-white/[0.08]"
              aria-label={t("aria_prev")}
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white transition duration-300 hover:border-cyan-100/20 hover:bg-white/[0.08]"
              aria-label={t("aria_next")}
            >
              <ChevronRight size={18} />
            </button>

            <div className="ml-1 flex items-center gap-2">
              {slideKeys.map((slide, i) => (
                <button
                  key={`${slide.id}-${i}`}
                  onClick={() => setIndex(i)}
                  className={`transition-all duration-300 ${
                    i === index
                      ? "h-2 w-7 rounded-full bg-cyan-200"
                      : "h-2 w-2 rounded-full bg-white/20"
                  }`}
                  aria-label={t("aria_goto", { number: i + 1 })}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex h-[280px] items-center justify-center sm:h-[340px] lg:h-[510px]">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100/8 blur-3xl sm:h-[220px] sm:w-[220px] lg:h-[280px] lg:w-[280px]" />
          <div className="pointer-events-none absolute bottom-[48px] left-1/2 h-[14px] w-[150px] -translate-x-1/2 rounded-full bg-white/10 blur-xl sm:bottom-[58px] sm:w-[180px] lg:bottom-[68px] lg:h-[16px] lg:w-[220px]" />

          <div className="relative flex h-[260px] w-full max-w-[680px] items-center justify-center sm:h-[320px] lg:h-[360px]">
            {slideKeys.map((slide, i) => {
              const position = getPosition(i);

              return (
                <div
                  key={`${slide.id}-${i}`}
                  className={`
                    absolute flex transform-gpu flex-col items-center transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)]
                    ${position === "center" ? "translate-x-0 scale-100 opacity-100 z-20" : ""}
                    ${position === "left" ? "-translate-x-[70px] scale-[0.74] opacity-35 z-10 sm:-translate-x-[110px] lg:-translate-x-[170px]" : ""}
                    ${position === "right" ? "translate-x-[70px] scale-[0.74] opacity-35 z-10 sm:translate-x-[110px] lg:translate-x-[170px]" : ""}
                    ${position === "hidden" ? "opacity-0 scale-[0.5] z-0" : ""}
                  `}
                >
                  <div
                    className={`relative ${
                      position === "center"
                        ? "h-[205px] w-[98px] sm:h-[270px] sm:w-[125px] lg:h-[390px] lg:w-[180px]"
                        : "h-[120px] w-[54px] sm:h-[155px] sm:w-[70px] lg:h-[200px] lg:w-[86px]"
                    }`}
                  >
                    <Image
                      src={slide.image}
                      alt={t(`${slide.key}.size`)}
                      fill
                      className={`object-contain ${
                        position === "center"
                          ? "drop-shadow-[0_22px_32px_rgba(0,0,0,0.28)]"
                          : "drop-shadow-[0_12px_20px_rgba(0,0,0,0.22)]"
                      }`}
                      priority={position === "center"}
                      sizes="(max-width: 640px) 98px, (max-width: 1024px) 125px, 180px"
                    />
                  </div>

                  <p
                    className={`mt-2 transition-all duration-300 ${
                      position === "center"
                        ? "text-[12px] text-white/70 sm:text-[13px] lg:hidden"
                        : "hidden text-[13px] text-white/35 lg:block"
                    }`}
                  >
                    {t(`${slide.key}.size`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSoft {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}