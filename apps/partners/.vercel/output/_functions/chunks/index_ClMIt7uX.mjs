import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { C as createAstro, a as Fragment, c as renderSlot, d as renderTemplate, f as maybeRenderHead, h as createRenderInstruction, i as renderComponent, m as addAttribute, p as renderHead, x as unescapeHTML } from "./server_lpOZekKa.mjs";
import { t as createComponent } from "./compiler_C5ke03wY.mjs";
//#region ../../node_modules/.pnpm/astro@7.3.6_@types+node@22._a999b9c3175697c3fc751ab14fff5ec0/node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
//#region src/layouts/base-layout.astro
createAstro("https://example.com");
var $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BaseLayout;
	const { title, description, canonical, image = "/brand/og-image.png", noindex = false } = Astro.props;
	const siteName = "Flex Clube";
	const themeColor = "#FBF8F2";
	const siteUrl = Astro.site?.toString().replace(/\/$/, "");
	const canonicalUrl = new URL(canonical ?? Astro.url.pathname, Astro.site ?? Astro.url).href;
	const absoluteImageUrl = new URL(image, Astro.site ?? Astro.url).href;
	const websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteName,
		...siteUrl ? { url: siteUrl } : {}
	};
	const organizationSchema = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: siteName,
		...siteUrl ? { url: siteUrl } : {}
	};
	return renderTemplate`<html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="author"${addAttribute(siteName, "content")}><meta name="application-name"${addAttribute(siteName, "content")}><meta name="theme-color"${addAttribute(themeColor, "content")}><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,100..1000&family=Fraunces:opsz,ital,wght@9..144,0,100..900;9..144,1,100..900&display=swap" rel="stylesheet"><link rel="icon" href="/brand/icon.png" type="image/png"><link rel="apple-touch-icon" href="/brand/apple-icon.png"><link rel="manifest" href="/site.webmanifest"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonicalUrl, "href")}><meta name="robots"${addAttribute(noindex ? "noindex, nofollow" : "index, follow", "content")}><meta property="og:type" content="website"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:url"${addAttribute(canonicalUrl, "content")}><meta property="og:locale" content="pt_BR"><meta property="og:site_name"${addAttribute(siteName, "content")}><meta property="og:image"${addAttribute(absoluteImageUrl, "content")}><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(absoluteImageUrl, "content")}><script type="application/ld+json">${unescapeHTML(JSON.stringify(websiteSchema))}<\/script><script type="application/ld+json">${unescapeHTML(JSON.stringify(organizationSchema))}<\/script>${renderHead($$result)}</head><body>${renderSlot($$result, $$slots["default"])}</body></html>`;
}, "C:/Users/Arthur/Documents/arthurlabs/flex/apps/partners/src/layouts/base-layout.astro", void 0);
//#endregion
//#region src/components/header.astro
var $$Header = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<header class="absolute inset-x-0 top-0 z-20"><nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10"><a href="/" class="flex items-baseline gap-1" aria-label="Parceiros"><span class="display text-2xl text-ink">Parceiros</span><span class="display-italic text-2xl text-coral">+</span></a><div class="hidden items-center gap-10 text-sm md:flex"><a href="#parceiros" class="text-ink/70 transition-colors hover:text-ink">Parceiros</a><a href="#beneficios" class="text-ink/70 transition-colors hover:text-ink">Benefícios</a><a href="#como-funciona" class="text-ink/70 transition-colors hover:text-ink">Como funciona</a></div><button type="button" aria-haspopup="dialog" data-partner-lead-trigger class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ink px-5 py-2.5 text-sm font-medium tracking-tight text-cream-50 transition-all hover:scale-[1.02] hover:bg-coral active:scale-[0.98]">Quero ser Parceiro</button></nav></header>`;
}, "C:/Users/Arthur/Documents/arthurlabs/flex/apps/partners/src/components/header.astro", void 0);
//#endregion
//#region src/components/hero.astro
var $$Hero = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="relative flex min-h-screen flex-col justify-center overflow-hidden pt-40 pb-20"><div class="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-coral/10 blur-3xl"></div><div class="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-forest/15 blur-3xl"></div><div class="relative mx-auto w-full max-w-7xl px-6 lg:px-10"><div class="max-w-4xl"><div class="reveal mb-8 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-cream-200/70 px-4 py-1.5 backdrop-blur"><span class="h-2 w-2 animate-pulse rounded-full bg-coral"></span><span class="text-xs uppercase tracking-widest text-ink/70">Desde 2010 cuidando da sua família</span></div><h1 class="reveal reveal-delay-1 display text-[clamp(2.75rem,6.5vw,6rem)] text-ink">Saúde e Qualidade<br>de Vida que você e sua<br>família <span class="display-italic text-coral">merecem.</span></h1><p class="reveal reveal-delay-2 mt-8 max-w-xl text-lg leading-relaxed text-ink/70 lg:text-xl">Saúde, Educação, lazer e muito mais. Vantagens reais para você e seu bolso. Descontos que merecem ser contados.</p><div class="reveal reveal-delay-3 mt-10 flex flex-wrap gap-4"><a href="https://www.flexclube.com.br" target="_blank" rel="noopener noreferrer" class="btn-primary text-base">Vem ser Flex<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a><a href="#parceiros" class="btn-secondary text-base">Explorar parceiros</a></div></div></div></section>`;
}, "C:/Users/Arthur/Documents/arthurlabs/flex/apps/partners/src/components/hero.astro", void 0);
//#endregion
//#region src/components/services-ticker.astro
var $$ServicesTicker = createComponent(($$result, $$props, $$slots) => {
	const services = [
		"Consultas",
		"Exames de Imagem",
		"Laboratório",
		"Drogaria",
		"Terapias",
		"Fisioterapia",
		"Oftalmologista",
		"Ótica",
		"Dentista",
		"Lazer",
		"Cursos",
		"Beleza e Cuidados Pessoais",
		"Assessoria Jurídica",
		"Auto Escola",
		"Muito +"
	];
	const tickerItems = [...services, ...services];
	return renderTemplate`${maybeRenderHead($$result)}<section aria-label="Serviços e benefícios" class="overflow-hidden border-y border-cream-50/10 bg-ink py-8 text-cream-50"><div class="marquee-track">${tickerItems.map((service, index) => renderTemplate`<div class="flex items-center gap-4 whitespace-nowrap"${addAttribute(index >= services.length ? "true" : void 0, "aria-hidden")}><span class="display text-3xl uppercase md:text-4xl">${service}</span><span class="display-italic ml-8 text-3xl text-coral" aria-hidden="true">✦</span></div>`)}</div></section>`;
}, "C:/Users/Arthur/Documents/arthurlabs/flex/apps/partners/src/components/services-ticker.astro", void 0);
//#endregion
//#region src/components/benefits.astro
var $$Benefits = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section id="beneficios" class="py-24 lg:py-32"><div class="mx-auto max-w-7xl px-6 lg:px-10"><div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20"><div class="lg:col-span-5"><p class="mb-6 text-xs uppercase tracking-[0.25em] text-ink/50">⊹ Por que entrar</p><h2 class="display text-5xl leading-[0.95] text-ink lg:text-7xl">Mais que descontos.<br><span class="display-italic text-coral">Uma rotina mais</span><br>generosa.</h2><p class="mt-8 max-w-md text-lg text-ink/70">Com o Flex, você mantém seus cuidados em dia sem comprometer seu orçamento. Desde 2010, oferecemos as melhores parcerias para gerar acessibilidade em serviços essenciais para o mais importante: você, sua saúde e sua família.</p></div><div class="lg:col-span-7"><div class="grid grid-cols-1 gap-px bg-ink/10 sm:grid-cols-2">${[
		{
			number: "01",
			title: "Parceiros selecionados",
			body: "Cada estabelecimento passa por uma seleção prévia com visitas e acompanhamento para verificar as condições e a qualidade dos serviços."
		},
		{
			number: "02",
			title: "Benefícios de verdade",
			body: "Todos os parceiros possuem contrato firmado em que são registrados e validados os descontos e benefícios acordados que serão oferecidos para os clientes Flex."
		},
		{
			number: "03",
			title: "Sem complicação",
			body: "Apresente sua Carteirinha Digital junto a um documento de identificação para ter acesso aos descontos."
		},
		{
			number: "04",
			title: "Atualizações mensais",
			body: "Nossa equipe está constantemente atualizando e incluindo novos parceiros. Fique por dentro acessando nosso site!"
		}
	].map((benefit) => renderTemplate`<div class="group bg-cream-100 p-8 transition-colors hover:bg-cream-50 lg:p-10"><span class="display-italic mb-6 block text-3xl text-coral">${benefit.number}</span><h3 class="display mb-3 text-2xl text-ink lg:text-3xl">${benefit.title}</h3><p class="leading-relaxed text-ink/70">${benefit.body}</p></div>`)}</div></div></div></div></section>`;
}, "C:/Users/Arthur/Documents/arthurlabs/flex/apps/partners/src/components/benefits.astro", void 0);
//#endregion
//#region src/components/partner-card.astro
createAstro("https://example.com");
var $$PartnerCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PartnerCard;
	const { partner } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<article data-partner-card${addAttribute(partner.name, "data-name")}${addAttribute(partner.category.id, "data-category-id")}${addAttribute(partner.category.name, "data-category-name")}${addAttribute(partner.description ?? "", "data-description")}${addAttribute(String(partner.isFeatured), "data-featured")}${addAttribute(partner.discount ?? "", "data-discount")} class="group flex h-full flex-col rounded-3xl border border-ink/5 bg-cream-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_18px_50px_rgba(20,20,20,0.06)]"><div class="mb-5 flex items-start justify-between gap-4"><div class="flex items-center gap-2"><span class="text-xs uppercase tracking-[0.14em] text-ink/50">${partner.category.name}</span></div>${partner.isFeatured && renderTemplate`<span class="display-italic whitespace-nowrap text-sm text-coral">★ destaque</span>`}</div><h3 class="display mb-2 text-2xl text-ink transition-colors group-hover:text-coral">${partner.name}</h3>${partner.description && renderTemplate`<p class="mb-6 flex-1 text-sm leading-relaxed text-ink/60">${partner.description}</p>`}<div class="mt-auto flex items-end justify-between gap-4 border-t border-ink/10 pt-4"><span class="display text-3xl text-coral">${partner.discount}</span><span class="flex items-center gap-1 text-xs uppercase tracking-wider text-ink/40 transition-colors group-hover:text-coral">ver mais<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span></div></article>`;
}, "C:/Users/Arthur/Documents/arthurlabs/flex/apps/partners/src/components/partner-card.astro", void 0);
//#endregion
//#region src/components/partners-section.astro
createAstro("https://example.com");
var $$PartnersSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PartnersSection;
	const { partners, categories, totalPartners, error = false } = Astro.props;
	const partnerCountLabel = totalPartners === 1 ? "parceiro disponível agora." : "parceiros disponíveis agora.";
	return renderTemplate`${maybeRenderHead($$result)}<section id="parceiros" class="relative py-24 lg:py-32"><div class="mx-auto max-w-7xl px-6 lg:px-10"><div class="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><div><p class="mb-6 text-xs uppercase tracking-[0.25em] text-ink/50">⊹ Parceiros do clube</p><h2 class="display text-5xl leading-[0.95] text-ink lg:text-7xl">Encontre seu próximo<br><span class="display-italic text-coral">serviço.</span></h2></div><div><p class="max-w-md text-lg text-ink/70">Filtre por categoria, busque por nome ou ordene como preferir.</p>${!error && renderTemplate`<p class="mt-3 text-sm text-ink/50"><span class="font-medium text-ink">${totalPartners}</span>${` ${partnerCountLabel}`}</p>`}</div></div>${error ? renderTemplate`<div class="rounded-3xl border border-dashed border-ink/10 px-6 py-16 text-center"><p class="display-italic text-3xl text-ink/40">Não foi possível carregar os parceiros agora.</p><p class="mt-3 text-ink/50">Tente novamente em alguns instantes.</p></div>` : partners.length === 0 ? renderTemplate`<div class="rounded-3xl border border-dashed border-ink/10 px-6 py-16 text-center"><p class="display-italic text-3xl text-ink/40">Nenhum parceiro disponível no momento.</p></div>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<div class="mb-6 mt-12 grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_auto]"><div class="relative"><label class="sr-only" for="partners-search">Buscar parceiros</label><svg class="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-ink/40" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path></svg><input id="partners-search" type="search" autocomplete="off" placeholder="Buscar por nome, categoria ou desconto..." class="w-full rounded-full border border-ink/10 bg-cream-50 py-4 pl-12 pr-5 text-base text-ink placeholder:text-ink/40 transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15"></div><div><label class="sr-only" for="partners-sort">Ordenar parceiros</label><select id="partners-sort" class="min-w-[190px] w-full cursor-pointer rounded-full border border-ink/10 bg-cream-50 px-5 py-4 text-base text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15"><option value="featured">Em destaque</option><option value="discount">Maior desconto</option><option value="name">Ordem alfabética</option></select></div></div><div class="mb-10 flex flex-wrap gap-2"><button type="button" data-category-filter="all" aria-pressed="true" class="inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-5 py-2.5 text-sm font-medium text-cream-50 transition-colors">Tudo (${totalPartners})</button>${categories.map((category) => renderTemplate`<button type="button"${addAttribute(category.key, "data-category-filter")} aria-pressed="false" class="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-transparent px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/40 hover:bg-cream-100">${category.name} (${category.count})</button>`)}</div><div class="mb-5 flex flex-wrap items-center justify-between gap-3"><p data-partners-result-count class="text-sm text-ink/50">${totalPartners} ${totalPartners === 1 ? "parceiro encontrado" : "parceiros encontrados"}</p><button type="button" data-partners-clear hidden class="text-sm text-coral hover:underline">Limpar filtros</button></div><div data-partners-empty hidden class="mb-5 rounded-3xl border border-dashed border-ink/10 px-6 py-16 text-center"><p class="display-italic mb-2 text-3xl text-ink/40">Nada encontrado</p><p class="text-ink/60">Tente ajustar os filtros ou buscar com outras palavras.</p><button type="button" data-partners-clear class="mt-5 text-sm text-coral hover:underline">Limpar filtros</button></div><div data-partners-grid class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">${partners.map((partner) => renderTemplate`${renderComponent($$result, "PartnerCard", $$PartnerCard, { "partner": partner })}`)}</div>` })}`}</div></section>${!error && partners.length > 0 && renderTemplate`${renderScript($$result, "C:/Users/Arthur/Documents/arthurlabs/flex/apps/partners/src/components/partners-section.astro?astro&type=script&index=0&lang.ts")}`}`;
}, "C:/Users/Arthur/Documents/arthurlabs/flex/apps/partners/src/components/partners-section.astro", void 0);
//#endregion
//#region src/components/how-it-works.astro
var $$HowItWorks = createComponent(($$result, $$props, $$slots) => {
	const steps = [
		{
			step: "1",
			title: "Cadastre-se",
			body: "Realize sua adesão com um de nossos representantes em um de nossos pontos de venda ou preencha o formulário em nosso site."
		},
		{
			step: "2",
			title: "Explore parceiros",
			body: "Navegue pelo catálogo, filtre por categoria, encontre o que precisa."
		},
		{
			step: "3",
			title: "Use seu desconto",
			body: "Apresente a sua carteirinha digital e um documento com foto no ato do seu atendimento para obtenção dos descontos."
		},
		{
			step: "4",
			title: "Economize sempre",
			body: "Realize seus atendimentos de forma completa com acessibilidade e a qualidade que você merece."
		}
	];
	return renderTemplate`${maybeRenderHead($$result)}<section id="como-funciona" class="border-y border-ink/5 bg-cream-200/50 py-24 lg:py-32"><div class="mx-auto max-w-7xl px-6 lg:px-10"><div class="mb-20 text-center"><p class="mb-6 text-xs uppercase tracking-[0.25em] text-ink/50">⊹ Como funciona</p><h2 class="display text-5xl text-ink lg:text-7xl">Em <span class="display-italic text-coral">quatro</span> passos.</h2></div><div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">${steps.map((step, index) => renderTemplate`<div class="relative">${index < steps.length - 1 && renderTemplate`<div class="absolute -right-3 top-12 hidden h-px w-6 bg-ink/20 lg:block" aria-hidden="true"></div>`}<div class="h-full rounded-2xl border border-ink/5 bg-cream-50 p-8"><div class="mb-6 flex items-baseline gap-3"><span class="display text-6xl text-coral">${step.step}</span><span class="display-italic text-xl text-coral">/04</span></div><h3 class="display mb-3 text-2xl text-ink">${step.title}</h3><p class="leading-relaxed text-ink/70">${step.body}</p></div></div>`)}</div></div></section>`;
}, "C:/Users/Arthur/Documents/arthurlabs/flex/apps/partners/src/components/how-it-works.astro", void 0);
//#endregion
//#region src/components/footer.astro
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
	return renderTemplate`${maybeRenderHead($$result)}<footer class="bg-ink pt-20 pb-10 text-cream-50"><div class="mx-auto max-w-7xl px-6 lg:px-10"><div class="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12"><div class="lg:col-span-5"><div class="mb-6 flex items-baseline gap-1"><span class="display text-4xl">Parceiros</span><span class="display-italic text-4xl text-coral">+</span></div><p class="display-italic max-w-md text-2xl leading-tight text-cream-50/80">“O clube que reúne os melhores parceiros da cidade em um só lugar.”</p></div><div class="lg:col-span-2"><h3 class="mb-4 text-xs uppercase tracking-widest text-cream-50/40">Clube</h3><ul class="space-y-3 text-cream-50/80"><li><a href="#parceiros" class="transition-colors hover:text-coral">Parceiros</a></li><li><a href="#beneficios" class="transition-colors hover:text-coral">Benefícios</a></li><li><a href="#como-funciona" class="transition-colors hover:text-coral">Como funciona</a></li></ul></div><div class="lg:col-span-2"><h3 class="mb-4 text-xs uppercase tracking-widest text-cream-50/40">Empresa</h3><ul class="space-y-3 text-cream-50/80"><li><a href="https://www.flexclube.com.br" target="_blank" rel="noopener noreferrer" class="transition-colors hover:text-coral">Sobre nós</a></li><li><a href="#cta" class="transition-colors hover:text-coral">Contato</a></li><li><button type="button" data-partner-lead-trigger aria-haspopup="dialog" class="transition-colors hover:text-coral">Seja parceiro</button></li><li><!-- TODO: configurar a URL pública do painel administrativo quando definida. --><span class="text-cream-50/80">Painel admin</span></li></ul></div><div class="lg:col-span-3"><h3 class="mb-4 text-xs uppercase tracking-widest text-cream-50/40">Contato</h3><ul class="space-y-3 text-cream-50/80"><li><a href="tel:+552127029080" class="flex items-center gap-2 transition-colors hover:text-coral"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.26-1.26a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>21 2702-9080</a></li><li><a href="https://wa.me/552127029080" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 transition-colors hover:text-coral"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.25 8.25-8.25zM8.53 7.33c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.43 1.03 2.6.13.16 1.75 2.67 4.25 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.29-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22-.74-.65-1.23-1.46-1.38-1.71-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42h-.49z"></path></svg>WhatsApp</a></li><li><a href="mailto:comercial@flexcard.org.br" class="break-words transition-colors hover:text-coral">comercial@flexcard.org.br</a></li><li class="pt-2 text-sm">Rua Laureano Rosa 100<br>São Gonçalo, RJ</li></ul></div></div><div class="flex flex-col gap-4 border-t border-cream-50/10 pt-6 text-sm text-cream-50/40 md:flex-row md:justify-between"><p>© ${currentYear} Parceiros+. Todos os direitos reservados.</p><div class="flex gap-6"><a href="#" class="transition-colors hover:text-coral">Termos de uso</a><a href="#" class="transition-colors hover:text-coral">Privacidade</a></div></div></div></footer>`;
}, "C:/Users/Arthur/Documents/arthurlabs/flex/apps/partners/src/components/footer.astro", void 0);
//#endregion
//#region src/components/flex-bot.astro
var $$FlexBot = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div data-flex-bot><button type="button" data-flex-bot-trigger aria-label="Abrir atendimento" class="fixed right-4 bottom-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-ink text-cream-50 transition-colors hover:bg-coral sm:right-6 sm:bottom-6"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H8l-4 2 1.2-3.6A7.5 7.5 0 1 1 20 11.5Z"></path><path d="M8 12h.01M12 12h.01M16 12h.01"></path></svg></button><section data-flex-bot-panel role="dialog" aria-label="Atendimento Flex" tabindex="-1" hidden class="fixed right-4 bottom-20 z-50 flex max-h-[min(680px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-ink/10 bg-cream-50 text-ink opacity-0 shadow-xl transition-all duration-200 sm:right-6 sm:bottom-24"><header class="flex items-center justify-between border-b border-ink/10 bg-cream-100 px-5 py-4"><div><p class="display text-xl">Flex</p><div class="mt-1 flex items-center gap-2 text-xs text-ink/60"><span class="h-2 w-2 rounded-full bg-forest" aria-hidden="true"></span><span>Assistente virtual</span></div></div><button type="button" data-flex-bot-close aria-label="Fechar atendimento" class="inline-flex h-8 w-8 items-center justify-center rounded-full text-xl leading-none text-ink/60 transition-colors hover:bg-ink/10 hover:text-ink"><span aria-hidden="true">×</span></button></header><div data-flex-bot-messages role="log" aria-live="polite" aria-relevant="additions" class="min-h-0 flex-1 overflow-y-auto p-4"></div><div data-flex-bot-controls class="border-t border-ink/10 bg-cream-50 p-4"></div></section></div>${renderScript($$result, "C:/Users/Arthur/Documents/arthurlabs/flex/apps/partners/src/components/flex-bot.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Arthur/Documents/arthurlabs/flex/apps/partners/src/components/flex-bot.astro", void 0);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	let partners = [];
	let partnersError = false;
	try {
		const response = await fetch(`${"http://localhost:3333".replace(/\/$/, "")}/partners/public`);
		if (!response.ok) throw new Error(`Public partners request failed with ${response.status}`);
		const data = await response.json();
		if (typeof data !== "object" || data === null || !("partners" in data) || !Array.isArray(data.partners)) throw new Error("Invalid public partners response");
		partners = data.partners;
	} catch (error) {
		partnersError = true;
		console.error("Could not load public partners", error);
	}
	const categories = Array.from(partners.reduce((categoryMap, partner) => {
		const key = partner.category.id;
		const existing = categoryMap.get(key);
		categoryMap.set(key, {
			key,
			name: partner.category.name,
			count: (existing?.count ?? 0) + 1
		});
		return categoryMap;
	}, /* @__PURE__ */ new Map())).map(([, category]) => category);
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Flex Clube",
		"description": "Benefícios e parceiros para aproveitar mais todos os dias."
	}, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<main class="grain-bg bg-cream-50 text-ink">${renderComponent($$result2, "Header", $$Header, {})}${renderComponent($$result2, "Hero", $$Hero, {})}${renderComponent($$result2, "ServicesTicker", $$ServicesTicker, {})}${renderComponent($$result2, "Benefits", $$Benefits, {})}${renderComponent($$result2, "PartnersSection", $$PartnersSection, {
		"partners": partners,
		"categories": categories,
		"totalPartners": partners.length,
		"error": partnersError
	})}${renderComponent($$result2, "HowItWorks", $$HowItWorks, {})}${renderComponent($$result2, "Footer", $$Footer, {})}</main>${renderComponent($$result2, "FlexBot", $$FlexBot, {})}` })}`;
}, "C:/Users/Arthur/Documents/arthurlabs/flex/apps/partners/src/pages/index.astro", void 0);
var $$file = "C:/Users/Arthur/Documents/arthurlabs/flex/apps/partners/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
