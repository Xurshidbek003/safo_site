"use client";

import { useState } from "react";
import { MapPin, Plus, Star, Trash2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCabinetStore } from "../store/cabinet-store";

export default function CabinetAddressesTab() {
  const t = useTranslations("cabinet");
  const { addresses, addAddress, removeAddress, setDefaultAddress } = useCabinetStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label: "", full: "", isDefault: false });

  const handleAdd = () => {
    if (!form.full.trim()) return;
    addAddress({ label: form.label || form.full.slice(0, 20), full: form.full, isDefault: form.isDefault });
    setForm({ label: "", full: "", isDefault: false });
    setShowForm(false);
  };

  const inputClass = "h-11 w-full rounded-[14px] border border-white/10 bg-[#052637] px-4 text-[13px] text-white outline-none transition placeholder:text-white/30 hover:border-cyan-200/20 focus:border-cyan-200/35";

  return (
    <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#071824] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(80,200,255,0.06),transparent_30%)]" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/38">{t("addresses_title")}</p>
            <h2 className="mt-1.5 text-[20px] font-semibold text-white sm:text-[22px]">{t("addresses_title")}</h2>
            <p className="mt-1 text-[13px] text-white/55">{t("addresses_subtitle")}</p>
          </div>
          <button
            onClick={() => setShowForm((p) => !p)}
            className="flex shrink-0 items-center gap-2 rounded-[13px] border border-cyan-200/20 bg-cyan-200/[0.06] px-4 py-2.5 text-[12px] font-medium text-cyan-100 transition hover:bg-cyan-200/[0.10]"
          >
            {showForm ? <X size={13} /> : <Plus size={13} />}
            {showForm ? t("address_cancel") : t("address_add")}
          </button>
        </div>

        {/* Add form */}
        {showForm && (
          <div className="mt-5 rounded-[18px] border border-cyan-200/12 bg-white/[0.025] p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[11px] text-white/45">{t("address_label")}</label>
                <input
                  type="text"
                  value={form.label}
                  onChange={(e) => setForm((p) => ({ ...p, label: e.target.value }))}
                  placeholder={t("address_label_placeholder")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] text-white/45">{t("address_full")}</label>
                <input
                  type="text"
                  value={form.full}
                  onChange={(e) => setForm((p) => ({ ...p, full: e.target.value }))}
                  placeholder={t("address_full_placeholder")}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleAdd}
                className="rounded-[12px] bg-[linear-gradient(180deg,#15739c_0%,#0a4f70_100%)] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:brightness-110"
              >
                {t("address_save")}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="rounded-[12px] border border-white/10 px-5 py-2.5 text-[13px] text-white/70 transition hover:bg-white/[0.04]"
              >
                {t("address_cancel")}
              </button>
            </div>
          </div>
        )}

        {/* Address list */}
        <div className="mt-5 grid gap-3">
          {addresses.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[18px] border border-white/8 bg-white/[0.02] py-10 text-center">
              <MapPin size={28} className="text-white/20" />
              <p className="mt-3 text-[15px] font-medium text-white/50">{t("address_empty")}</p>
              <p className="mt-1 text-[13px] text-white/30">{t("address_empty_desc")}</p>
            </div>
          ) : (
            addresses.map((addr) => (
              <div
                key={addr.id}
                className={`flex items-start justify-between gap-3 rounded-[18px] border p-4 transition ${
                  addr.isDefault ? "border-cyan-300/20 bg-cyan-300/[0.04]" : "border-white/8 bg-white/[0.025]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${addr.isDefault ? "bg-cyan-400/15 text-cyan-300" : "bg-white/[0.05] text-white/40"}`}>
                    <MapPin size={14} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] font-medium text-white">{addr.label}</p>
                      {addr.isDefault && (
                        <span className="flex items-center gap-1 rounded-full bg-cyan-300/10 px-2 py-0.5 text-[10px] font-medium text-cyan-200">
                          <Star size={9} /> {t("address_default")}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[12px] text-white/50">{addr.full}</p>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2">
                  {!addr.isDefault && (
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      className="rounded-[10px] border border-white/10 px-2.5 py-1.5 text-[11px] text-white/60 transition hover:border-cyan-200/20 hover:text-cyan-200"
                    >
                      <Star size={12} />
                    </button>
                  )}
                  <button
                    onClick={() => removeAddress(addr.id)}
                    className="rounded-[10px] border border-white/10 px-2.5 py-1.5 text-[11px] text-white/40 transition hover:border-rose-400/20 hover:text-rose-300"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
