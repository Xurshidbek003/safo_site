"use client";

import { useState } from "react";
import { CabinetTab } from "@/features/cabinet/model/types";
import CabinetHero from "@/features/cabinet/ui/cabinet-hero";
import CabinetNavTabs from "@/features/cabinet/ui/cabinet-nav-tabs";
import CabinetProfileTab from "@/features/cabinet/ui/cabinet-profile-tab";
import CabinetOrdersTab from "@/features/cabinet/ui/cabinet-orders-tab";
import CabinetAddressesTab from "@/features/cabinet/ui/cabinet-addresses-tab";
import CabinetSettingsTab from "@/features/cabinet/ui/cabinet-settings-tab";

export default function CabinetPage() {
  const [activeTab, setActiveTab] = useState<CabinetTab>("profile");

  return (
    <main className="overflow-x-hidden bg-[#06131d] text-white">
      <section className="relative min-h-screen bg-[#06131d] pt-24 sm:pt-28">
        {/* BG decorations */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.06),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(56,189,248,0.04),transparent_30%)]" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-10">
          {/* Hero card */}
          <CabinetHero />

          {/* Tab navigation */}
          <div className="mt-4">
            <CabinetNavTabs active={activeTab} onChange={setActiveTab} />
          </div>

          {/* Tab content */}
          <div className="mt-4">
            {activeTab === "profile" && <CabinetProfileTab />}
            {activeTab === "orders" && <CabinetOrdersTab />}
            {activeTab === "addresses" && <CabinetAddressesTab />}
            {activeTab === "settings" && <CabinetSettingsTab />}
          </div>
        </div>
      </section>
    </main>
  );
}
