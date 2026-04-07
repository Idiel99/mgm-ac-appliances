"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const t = useTranslations("contact");
  const shared = useTranslations("shared");
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Installation",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setState("success");
        setForm({
          name: "",
          phone: "",
          email: "",
          service: "Installation",
          message: "",
        });
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  const inputClass =
    "border-[1.5px] border-slate-200 focus:border-sky-500 rounded-xl px-4 py-3 text-sm text-slate-900 bg-sky-50 focus:bg-white outline-none transition-colors w-full";
  const labelClass =
    "text-[0.7rem] font-bold text-slate-700 uppercase tracking-wide mb-1.5";

  const contactItems = [
    {
      icon: "📞",
      label: t("phoneEnLabel"),
      value: shared("phoneEn"),
      href: `tel:${shared("phoneEnRaw")}`,
    },
    {
      icon: "📞",
      label: t("phoneEsLabel"),
      value: shared("phoneEs"),
      href: `tel:${shared("phoneEsRaw")}`,
    },
    {
      icon: "✉️",
      label: t("emailLabel"),
      value: shared("email"),
      href: `mailto:${shared("email")}`,
    },
  ];

  return (
    <section id="contact" className="bg-sky-50 py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left — Info */}
        <div>
          <p className="text-xs font-bold text-sky-500 uppercase tracking-[2px] mb-3">
            {t("label")}
          </p>
          <h2
            className="font-black text-slate-900 tracking-[-1px] mb-4"
            style={{ fontSize: "2.2rem", fontFamily: "var(--font-outfit), sans-serif" }}
          >
            {t("title")}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8">{t("body")}</p>

          {contactItems.map(({ icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-4 bg-white rounded-xl border border-sky-500/10 p-4 mb-3 hover:border-sky-500/30 transition-colors group"
            >
              <div className="w-[42px] h-[42px] bg-gradient-to-br from-sky-100 to-sky-200 rounded-[10px] flex items-center justify-center text-xl shrink-0">
                {icon}
              </div>
              <div>
                <div className="text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wide">
                  {label}
                </div>
                <div className="font-semibold text-slate-900 text-sm group-hover:text-sky-700 transition-colors">
                  {value}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Right — Form */}
        <div className="bg-white rounded-2xl border border-sky-500/10 shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-8 md:p-10">
          <h3
            className="font-bold text-slate-900 text-xl mb-7"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            {t("formTitle")}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col">
                <label className={labelClass}>{t("nameLabel")}</label>
                <input
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("namePlaceholder")}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>{t("phoneLabel")}</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={t("phonePlaceholder")}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label className={labelClass}>{t("emailFormLabel")}</label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder={t("emailPlaceholder")}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className={labelClass}>{t("serviceLabel")}</label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Installation">
                  {t("serviceInstallation")}
                </option>
                <option value="Repair">{t("serviceRepair")}</option>
                <option value="Maintenance">{t("serviceMaintenance")}</option>
                <option value="Emergency">{t("serviceEmergency")}</option>
                <option value="Other">{t("serviceOther")}</option>
              </select>
            </div>

            <div className="flex flex-col mb-6">
              <label className={labelClass}>{t("messageLabel")}</label>
              <textarea
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder={t("messagePlaceholder")}
                className={`${inputClass} resize-none`}
              />
            </div>

            {state === "success" && (
              <p className="text-green-600 text-sm mb-4 font-medium">
                {t("successMessage")}
              </p>
            )}
            {state === "error" && (
              <p className="text-red-600 text-sm mb-4 font-medium">
                {t("errorMessage")}
              </p>
            )}

            <button
              type="submit"
              disabled={state === "submitting"}
              className="w-full bg-gradient-to-r from-sky-500 to-sky-700 text-white font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(14,165,233,0.3)] hover:shadow-[0_8px_28px_rgba(14,165,233,0.4)] hover:-translate-y-px transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {state === "submitting" ? t("submitting") : t("submit")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
