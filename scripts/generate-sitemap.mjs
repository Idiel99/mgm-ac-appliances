import { writeFileSync } from "fs";

const BASE = "https://mgm-ac-appliances.com";
const LOCALES = ["en", "es"];

const STATIC_PAGES = [
  "",
  "/about",
  "/services",
  "/service-areas",
  "/financing",
  "/warranty",
  "/coupons",
  "/blog",
  "/privacy",
];

const SERVICE_IDS = [
  "installation", "repair", "maintenance",
  "commercial", "residential", "emergency",
];

const CITY_IDS = [
  "miami", "miamiBeach", "hialeah", "miamiGardens", "aventura",
  "coralGables", "doral", "kendall", "homestead", "theKeys",
  "fortLauderdale", "hollywood", "bocaraton", "westPalmBeach",
  "naples", "fortMyers",
];

const BLOG_SLUGS = [
  "maintenance-tips", "when-to-replace", "miami-climate-hvac",
];

function buildPaths() {
  const paths = [];

  for (const page of STATIC_PAGES) {
    paths.push({ path: page, priority: page === "" ? "1.0" : "0.8", changefreq: "weekly" });
  }
  for (const id of SERVICE_IDS) {
    paths.push({ path: `/services/${id}`, priority: "0.8", changefreq: "monthly" });
  }
  for (const id of CITY_IDS) {
    paths.push({ path: `/service-areas/${id}`, priority: "0.7", changefreq: "monthly" });
  }
  for (const slug of BLOG_SLUGS) {
    paths.push({ path: `/blog/${slug}`, priority: "0.6", changefreq: "monthly" });
  }

  return paths;
}

function toXml(paths) {
  const today = new Date().toISOString().split("T")[0];

  const urls = paths.flatMap(({ path, priority, changefreq }) =>
    LOCALES.map((locale) => {
      const loc = `${BASE}/${locale}${path}`;
      const hreflangs = LOCALES.map(
        (l) => `      <xhtml:link rel="alternate" hreflang="${l === "en" ? "en-US" : "es-US"}" href="${BASE}/${l}${path}" />`
      ).join("\n");
      const xdefault = `      <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/en${path}" />`;

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${hreflangs}
${xdefault}
  </url>`;
    })
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urls.join("\n")}
</urlset>`;
}

const paths = buildPaths();
const xml = toXml(paths);
writeFileSync("out/sitemap.xml", xml, "utf8");
console.log(`Sitemap generated: ${paths.length * LOCALES.length} URLs`);
