import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const shared = await getTranslations("shared");
  const whyUs = await getTranslations("whyUs");

  return (
    <footer className="bg-slate-900 border-t border-sky-500/15 pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div
              className="font-black text-white text-xl mb-3"
              style={{ fontFamily: "var(--font-outfit), sans-serif" }}
            >
              MGM <span className="text-sky-500">A/C</span> Appliances
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-3">
              {t("description")}
            </p>
            <p className="text-sky-200/60 text-xs">{t("address")}</p>
            <p className="text-sky-200/60 text-xs mt-1">{whyUs("license")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-white font-bold text-sm mb-4"
              style={{ fontFamily: "var(--font-outfit), sans-serif" }}
            >
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2.5 list-none">
              <li>
                <Link href="/en/about" className="text-white/50 hover:text-sky-200 text-sm transition-colors">
                  {nav("about")}
                </Link>
              </li>
              <li>
                <Link href="/en/service-areas" className="text-white/50 hover:text-sky-200 text-sm transition-colors">
                  {nav("serviceAreas")}
                </Link>
              </li>
              <li>
                <Link href="/en/financing" className="text-white/50 hover:text-sky-200 text-sm transition-colors">
                  {nav("financing")}
                </Link>
              </li>
              <li>
                <Link href="/en/coupons" className="text-white/50 hover:text-sky-200 text-sm transition-colors">
                  {nav("coupons")}
                </Link>
              </li>
              <li>
                <Link href="/en/warranty" className="text-white/50 hover:text-sky-200 text-sm transition-colors">
                  {nav("warranty")}
                </Link>
              </li>
              <li>
                <Link href="/en/blog" className="text-white/50 hover:text-sky-200 text-sm transition-colors">
                  {nav("blog")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-white font-bold text-sm mb-4"
              style={{ fontFamily: "var(--font-outfit), sans-serif" }}
            >
              {t("servicesTitle")}
            </h4>
            <ul className="space-y-2.5 list-none">
              <li>
                <Link href="/en/services/installation" className="text-white/50 hover:text-sky-200 text-sm transition-colors">
                  Installation
                </Link>
              </li>
              <li>
                <Link href="/en/services/repair" className="text-white/50 hover:text-sky-200 text-sm transition-colors">
                  Repair
                </Link>
              </li>
              <li>
                <Link href="/en/services/maintenance" className="text-white/50 hover:text-sky-200 text-sm transition-colors">
                  Maintenance
                </Link>
              </li>
              <li>
                <Link href="/en/services/commercial" className="text-white/50 hover:text-sky-200 text-sm transition-colors">
                  Commercial
                </Link>
              </li>
              <li>
                <Link href="/en/services/emergency" className="text-white/50 hover:text-sky-200 text-sm transition-colors">
                  Emergency
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-white font-bold text-sm mb-4"
              style={{ fontFamily: "var(--font-outfit), sans-serif" }}
            >
              {t("connectTitle")}
            </h4>
            <ul className="space-y-2.5 list-none">
              <li>
                <a href={`tel:${shared("phoneEnRaw")}`} className="text-white/50 hover:text-sky-200 text-sm transition-colors">
                  📞 {shared("phoneEn")} (EN)
                </a>
              </li>
              <li>
                <a href={`tel:${shared("phoneEsRaw")}`} className="text-white/50 hover:text-sky-200 text-sm transition-colors">
                  📞 {shared("phoneEs")} (ES)
                </a>
              </li>
              <li>
                <a href={`mailto:${shared("email")}`} className="text-white/50 hover:text-sky-200 text-sm transition-colors">
                  ✉️ {shared("email")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">{t("copyright")}</p>
          <div className="flex items-center gap-4">
            <Link href="/en/privacy" className="text-white/30 hover:text-white/50 text-xs transition-colors">
              {nav("privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
