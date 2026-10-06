import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
//#region src/pages/robots.txt.ts
var robots_txt_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = ({ site }) => {
	const configuredSite = "https://example.com".replace(/\/$/, "");
	const isProductionSite = configuredSite && !/localhost|127\.0\.0\.1|\.vercel\.app/i.test(configuredSite);
	const lines = ["User-agent: *", "Allow: /"];
	if (isProductionSite) lines.push("", `Sitemap: ${configuredSite}/sitemap-index.xml`);
	return new Response(`${lines.join("\n")}
`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
//#endregion
//#region \0virtual:astro:page:src/pages/robots.txt@_@ts
var page = () => robots_txt_exports;
//#endregion
export { page };
