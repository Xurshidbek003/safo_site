"use client";

import { useEffect, useState } from "react";
import {
  MapPin, Phone, Mail, Clock3,
  Send, MessageCircle, CheckCircle2, X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { apiPost } from "@/shared/lib/api";

const INPUT_CLASS =
  "h-10 w-full rounded-[13px] border border-white/10 bg-white/[0.03] px-4 text-[13px] text-white outline-none transition placeholder:text-white/28 focus:border-cyan-300/18 focus:bg-white/[0.04]";

type FormState = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

const EMPTY: FormState = { name: "", phone: "", email: "", subject: "", message: "" };

export default function ContactPage() {
  const t = useTranslations("contact");
  const [form, setForm] = useState<FormState>(EMPTY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    if (!form.name.trim() || !form.message.trim()) {
      toast.error("Iltimos, ism va xabar maydonlarini to'ldiring");
      return;
    }
    setSubmitting(true);
    try {
      await apiPost("/api/contact", {
        name: form.name,
        phone: form.phone,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });
      setIsModalOpen(true);
      setForm(EMPTY);
    } catch {
      toast.error("Xabarni yuborishda xatolik. Iltimos, qaytadan urinib ko'ring.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsModalOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isModalOpen]);

  const contactItems = [
    { icon: Phone,  label: t("info.phone_label"),   value: "+998 90 123 45 67" },
    { icon: Mail,   label: t("info.email_label"),   value: "hello@safo.uz" },
    { icon: MapPin, label: t("info.address_label"), value: t("info.address_value") },
    { icon: Clock3, label: t("info.hours_label"),   value: t("info.hours_value") },
  ];

  return (
    <>
      <main className="min-h-screen bg-[#03131d] text-white">
        <section className="relative min-h-screen overflow-hidden">
          {/* Backgrounds */}
          <div className="pointer-events-none absolute inset-0 bg-[#03131d]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,19,29,0.98)_0%,rgba(4,23,35,0.98)_36%,rgba(4,23,35,1)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_28%),radial-gradient(circle_at_left_top,rgba(59,130,246,0.06),transparent_22%)]" />

          <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-8 pt-24 sm:px-8 xl:px-16">
            {/* Badge */}
            <div className="mb-4 w-fit rounded-[7px] px-2 py-3">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/38">
                {t("badge")}
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              {/* Left column */}
              <div className="space-y-4">
                {/* Contact info card */}
                <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#071824] p-4 shadow-[0_14px_32px_rgba(0,0,0,0.18)] sm:p-5">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.06),transparent_30%)]" />
                  <div className="relative z-10">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/38">
                      {t("info.eyebrow")}
                    </p>
                    <h2 className="mt-2 text-[18px] font-semibold text-white">
                      {t("info.title")}
                    </h2>

                    <div className="mt-4 space-y-2.5">
                      {contactItems.map(({ icon: Icon, label, value }) => (
                        <div
                          key={label}
                          className="rounded-[16px] border border-white/8 bg-white/[0.025] p-3.5"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-300/[0.08] text-cyan-100">
                              <Icon size={15} />
                            </div>
                            <div>
                              <p className="text-[13px] font-semibold text-white">{label}</p>
                              <p className="mt-1 text-[12px] leading-5 text-white/58">{value}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick contact card */}
                <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#071824] p-4 shadow-[0_14px_32px_rgba(0,0,0,0.18)] sm:p-5">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.05),transparent_28%)]" />
                  <div className="relative z-10 flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-300/[0.08] text-cyan-100">
                      <MessageCircle size={15} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-white">
                        {t("quick.title")}
                      </h3>
                      <p className="mt-1 text-[12px] leading-5 text-white/56">
                        {t("quick.desc")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column — Form */}
              <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#071824] p-4 shadow-[0_14px_32px_rgba(0,0,0,0.18)] sm:p-5">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.07),transparent_32%)]" />
                <div className="relative z-10">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/38">
                    {t("form.eyebrow")}
                  </p>
                  <h2 className="mt-2 text-[18px] font-semibold text-white">
                    {t("form.title")}
                  </h2>
                  <p className="mt-2 text-[12px] leading-5 text-white/56">
                    {t("form.desc")}
                  </p>

                  <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        type="text"
                        placeholder={t("form.name")}
                        value={form.name}
                        onChange={set("name")}
                        className={INPUT_CLASS}
                      />
                      <input
                        type="tel"
                        placeholder={t("form.phone")}
                        value={form.phone}
                        onChange={set("phone")}
                        className={INPUT_CLASS}
                      />
                    </div>
                    <input
                      type="email"
                      placeholder={t("form.email")}
                      value={form.email}
                      onChange={set("email")}
                      className={INPUT_CLASS}
                    />
                    <input
                      type="text"
                      placeholder={t("form.subject")}
                      value={form.subject}
                      onChange={set("subject")}
                      className={INPUT_CLASS}
                    />
                    <textarea
                      rows={5}
                      placeholder={t("form.message")}
                      value={form.message}
                      onChange={set("message")}
                      className="w-full resize-none rounded-[13px] border border-white/10 bg-white/[0.03] px-4 py-3 text-[13px] text-white outline-none transition placeholder:text-white/28 focus:border-cyan-300/18 focus:bg-white/[0.04]"
                    />
                    <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-[11px] leading-5 text-white/44">
                        {t("form.note")}
                      </p>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-[13px] bg-gradient-to-r from-cyan-500 to-blue-600 px-5 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)] transition hover:opacity-90 disabled:opacity-60"
                      >
                        {submitting ? "Yuborilmoqda..." : t("form.submit")}
                        {!submitting && <Send size={14} />}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Success Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-[400px] overflow-hidden rounded-[20px] border border-white/10 bg-[#071824] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(50,180,255,0.08),transparent_32%)]" />
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-white">
                      {t("modal.title")}
                    </h3>
                    <p className="mt-1 text-[12px] leading-5 text-white/52">
                      {t("modal.desc")}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.03] text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <X size={15} />
                </button>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-[12px] bg-gradient-to-r from-cyan-500 to-blue-600 text-[13px] font-semibold text-white transition hover:opacity-90"
              >
                {t("modal.cta")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}