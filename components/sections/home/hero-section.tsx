"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Link } from "../../../i18n/navigation";
import { useTranslations } from "next-intl";

const floatingDrops = Array.from({ length: 5 }, (_, i) => i);

export default function HeroSection() {
  const t = useTranslations("hero");

  const stats = [
    { value: t("stat1Title"), label: t("stat1Text") },
    { value: t("stat2Title"), label: t("stat2Text") },
    { value: t("stat3Title"), label: t("stat3Text") },
  ];

  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[#071824] text-white sm:min-h-[820px] lg:h-[710px] lg:min-h-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0b2a3f,#071824_70%)]" />

      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(100,210,255,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 60% 30%, rgba(100,210,255,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, rgba(100,210,255,0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      />

      <div className="pointer-events-none absolute left-[-10%] top-[10%] h-[240px] w-[240px] rounded-full bg-cyan-300/10 blur-[100px] sm:h-[320px] sm:w-[320px] lg:left-[8%] lg:top-[16%] lg:h-[420px] lg:w-[420px]" />
      <div className="pointer-events-none absolute bottom-[6%] right-[-10%] h-[220px] w-[220px] rounded-full bg-sky-300/10 blur-[100px] sm:h-[300px] sm:w-[300px] lg:bottom-[10%] lg:right-[6%] lg:h-[400px] lg:w-[400px]" />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col justify-start px-5 pt-28 sm:px-8 sm:pt-32 lg:flex-row lg:items-center lg:justify-center lg:px-16 lg:pt-18">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
          className="w-full lg:w-[58%] lg:pr-8 xl:pr-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            <span className="text-[10px] font-medium tracking-[0.24em] text-cyan-100/80 sm:text-xs">
              {t("badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="max-w-[720px] text-[40px] font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-[58px] lg:text-[56px] xl:text-[45px]"
          >
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              {t("title1")}
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-sky-300 bg-clip-text text-transparent">
              {t("title2")}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-5 max-w-[680px] text-sm leading-7 text-white/70 sm:text-base sm:leading-8 lg:text-[16px]"
          >
            <p>{t("description1")}</p>
            <p>{t("description2")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <motion.div
              whileHover={{
                scale: 1.03,
                boxShadow: "0 20px 40px rgba(255,255,255,0.16)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0d3148] sm:px-8 sm:py-4 sm:text-base"
            >
              <Link href="/products" className="relative z-10">
                {t("primaryButton")}
              </Link>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-400"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.03,
                borderColor: "rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-md sm:px-8 sm:py-4 sm:text-base"
            >
              <Link href="/about" className="relative z-10">
                {t("secondaryButton")}
              </Link>
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-10 grid max-w-[560px] grid-cols-3 gap-4 border-t border-white/10 pt-6 sm:mt-12 sm:gap-6 sm:pt-7"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-left">
                <div className="text-xl font-bold text-white sm:text-2xl lg:text-[28px]">
                  {stat.value}
                </div>
                <div className="mt-1 text-[10px] font-medium tracking-[0.22em] text-white/40 sm:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-8 flex w-full items-center justify-center lg:mt-0 lg:w-[42%]">
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.28, 0.45, 0.28],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-[200px] w-[200px] rounded-full bg-cyan-400/25 blur-[80px] sm:h-[260px] sm:w-[260px] lg:h-[320px] lg:w-[320px]"
          />

          <motion.div
            animate={{
              scale: [1.12, 1, 1.12],
              opacity: [0.18, 0.35, 0.18],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute h-[180px] w-[180px] rounded-full bg-sky-400/20 blur-[80px] sm:h-[240px] sm:w-[240px] lg:h-[300px] lg:w-[300px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
            className="relative z-10"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-[320px] w-[170px] sm:h-[400px] sm:w-[210px] md:h-[470px] md:w-[240px] lg:h-[560px] lg:w-[270px] xl:h-[600px] xl:w-[290px]"
            >
              <Image
                src="/images/hero/bottle-big-new.png"
                alt="Safo premium water bottle"
                fill
                priority
                className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
                sizes="(max-width: 640px) 170px, (max-width: 768px) 210px, (max-width: 1024px) 240px, (max-width: 1280px) 270px, 290px"
              />
            </motion.div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-white/5"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute right-[0%] top-[24%] hidden xl:block"
          >
            <div className="group relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 opacity-0 blur-xl transition-opacity group-hover:opacity-50" />
              <div className="relative rounded-full border border-white/20 bg-black/20 px-5 py-2.5 backdrop-blur-md">
                <span className="text-xs font-medium tracking-[0.2em] text-white">
                  {t("source")}
                </span>
              </div>
            </div>
          </motion.div>

          {floatingDrops.map((drop) => (
            <motion.div
              key={drop}
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: [0, 1, 0],
                y: [-20, 90],
              }}
              transition={{
                duration: 3,
                delay: drop * 0.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute h-1 w-1 rounded-full bg-white/30"
              style={{
                left: `${24 + drop * 12}%`,
                top: "32%",
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#071824] to-transparent sm:h-28" />
    </section>
  );
}