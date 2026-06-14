"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Link } from "../../i18n/navigation";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/features/cart/store/cart-store";
import LanguageSwitcher from "./language-switcher";

const Navbar = React.memo(function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const totalCount = useCartStore(
    (state) => state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const navItems = useMemo(
    () => [
      { label: t("home"), href: "/" },
      { label: t("products"), href: "/products" },
      { label: t("about"), href: "/about" },
      { label: t("contact"), href: "/contact" },
      { label: t("orders"), href: "/orders" },
    ],
    [t]
  );

  const mobileNavItems = useMemo(
    () => [
      { label: t("home"), href: "/" },
      { label: t("products"), href: "/products" },
      { label: t("about"), href: "/about" },
      { label: t("contact"), href: "/contact" },
      { label: t("cart"), href: "/cart" },
      { label: t("orders"), href: "/orders" },
      { label: t("cabinet"), href: "/cabinet" },
    ],
    [t]
  );

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled((prev) => (prev === isScrolled ? prev : isScrolled));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[#071a28]/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[80px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 text-white">
            <span className="h-6 w-6 rounded-full border border-white/70 bg-white/5" />
            <span className="text-[18px] font-semibold tracking-[0.16em]">SAFO</span>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden items-center gap-6 xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[14px] font-medium text-white/80 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* CART */}
            <Link
              href="/cart"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/10"
            >
              <ShoppingBag size={18} />
              {totalCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-cyan-300 text-[10px] font-bold text-black">
                  {totalCount > 99 ? "99+" : totalCount}
                </span>
              )}
            </Link>

            {/* CABINET */}
            <Link
              href="/cabinet"
              className="hidden rounded-full border border-white/20 bg-white/5 px-3 py-2 text-white transition hover:bg-white/10 sm:inline-flex items-center gap-1.5 text-sm"
            >
              <User size={15} />
              {t("cabinet")}
            </Link>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white xl:hidden"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity xl:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* MOBILE MENU */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-[85%] max-w-[360px] bg-[#071a28] p-5 transition-transform xl:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <Link href="/" onClick={() => setMobileOpen(false)}>SAFO</Link>
          <button onClick={() => setMobileOpen(false)}><X /></button>
        </div>

        <div className="mt-5">
          <LanguageSwitcher />
        </div>

        <nav className="mt-6 flex flex-col">
          {mobileNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="border-b border-white/10 py-4 text-white/80 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
});

export default Navbar;
