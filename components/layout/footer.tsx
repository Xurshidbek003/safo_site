"use client";

import { Link } from "../../i18n/navigation";
import { Instagram, Facebook, Send, MapPin, Phone, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

const socialLinks = [
  { key: "instagram", href: "#", icon: Instagram },
  { key: "facebook",  href: "#", icon: Facebook },
  { key: "telegram",  href: "#", icon: Send },
];

const navKeys = ["home", "products", "about", "collection", "contact"];
const navHrefs: Record<string, string> = {
  home: "/",
  products: "/products",
  about: "/about",
  collection: "/collection",
  contact: "/contact",
};

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative overflow-hidden bg-[#081b29] text-white">
      {/* backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(89,201,255,0.08),transparent_24%),radial-gradient(circle_at_82%_16%,rgba(89,201,255,0.05),transparent_22%),linear-gradient(180deg,#081b29_0%,#091f2e_55%,#0b2233_100%)]" />
      <div className="pointer-events-none absolute bottom-[10%] left-[-100px] h-[260px] w-[260px] rounded-full bg-cyan-300/8 blur-3xl" />
      <div className="pointer-events-none absolute right-[-100px] top-[10%] h-[260px] w-[260px] rounded-full bg-sky-300/8 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-10 border-b border-white/8 pb-10 lg:grid-cols-[1.15fr_0.85fr_0.9fr_0.9fr] lg:pb-12">

          {/* Brand */}
          <div className="max-w-[380px]">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="h-8 w-8 rounded-full border border-white/40" />
              <span className="text-[18px] font-semibold tracking-[0.28em] text-white">
                SAFO
              </span>
            </Link>

            <p className="mt-5 text-[15px] leading-7 text-white/60">
              {t("brand_desc")}
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ key, href, icon: Icon }) => (
                <Link
                  key={key}
                  href={href}
                  aria-label={key}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 transition duration-300 hover:border-cyan-100/20 hover:bg-white hover:text-[#0b2233]"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-100/55">
              {t("nav_title")}
            </p>
            <ul className="mt-5 space-y-3">
              {navKeys.map((key) => (
                <li key={key}>
                  <Link
                    href={navHrefs[key]}
                    className="text-[15px] text-white/62 transition duration-300 hover:text-cyan-200"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-100/55">
              {t("contact_title")}
            </p>
            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-cyan-200" />
                <p className="text-[15px] leading-7 text-white/60">
                  {t("contact_address")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-cyan-200" />
                <a
                  href="tel:+998901234567"
                  className="text-[15px] text-white/60 transition duration-300 hover:text-cyan-200"
                >
                  +998 90 123 45 67
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-cyan-200" />
                <a
                  href="mailto:info@safo.uz"
                  className="text-[15px] text-white/60 transition duration-300 hover:text-cyan-200"
                >
                  info@safo.uz
                </a>
              </div>
            </div>
          </div>

          {/* Brand Note */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-100/55">
              {t("note_title")}
            </p>
            <div className="mt-5 rounded-[24px] border border-white/8 bg-white/[0.03] p-5 backdrop-blur-sm">
              <p className="text-[15px] leading-7 text-white/60">
                {t("note_text")}
              </p>
              <Link href="/contact">
                <button className="mt-5 inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-[13px] font-semibold text-white transition duration-300 hover:bg-white hover:text-[#0b2233]">
                  {t("note_cta")}
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 pt-6 text-[13px] text-white/38 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("copyright")}</p>
          <div className="flex items-center gap-5">
            <Link href="#" className="transition duration-300 hover:text-cyan-200">
              {t("privacy")}
            </Link>
            <Link href="#" className="transition duration-300 hover:text-cyan-200">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}