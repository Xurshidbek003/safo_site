"use client";

import { User, Package, MapPin, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { CabinetTab } from "../model/types";

type CabinetNavTabsProps = {
  active: CabinetTab;
  onChange: (tab: CabinetTab) => void;
};

export default function CabinetNavTabs({ active, onChange }: CabinetNavTabsProps) {
  const t = useTranslations("cabinet");

  const tabs: { key: CabinetTab; label: string; icon: React.ElementType }[] = [
    { key: "profile", label: t("nav_profile"), icon: User },
    { key: "orders", label: t("nav_orders"), icon: Package },
    { key: "addresses", label: t("nav_addresses"), icon: MapPin },
    { key: "settings", label: t("nav_settings"), icon: Settings },
  ];

  return (
    <div className="flex gap-1.5 overflow-x-auto rounded-[18px] border border-white/8 bg-[#071824] p-1.5">
      {tabs.map(({ key, label, icon: Icon }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`flex min-w-0 flex-1 items-center justify-center gap-2 rounded-[13px] px-3 py-2.5 text-[12px] font-medium transition-all duration-200 sm:text-[13px] ${
              isActive
                ? "bg-[linear-gradient(180deg,#15739c_0%,#0a4f70_100%)] text-white shadow-[0_6px_16px_rgba(10,80,120,0.35)]"
                : "text-white/55 hover:bg-white/[0.04] hover:text-white/80"
            }`}
          >
            <Icon size={14} className="shrink-0" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
