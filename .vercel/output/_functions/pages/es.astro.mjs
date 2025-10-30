import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Bo91TW9v.mjs';
import { $ as $$GlobalStats, a as $$UserPrompt } from '../chunks/UserPrompt_BmC-s9f9.mjs';
import { g as getLangFromUrl, $ as $$Layout, b as $$LanguageSwitcher, a as $$UsernameModal } from '../chunks/UsernameModal_tyf7WvG3.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const lang = getLangFromUrl(Astro2.url);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="fixed top-6 right-6 z-50"> ${renderComponent($$result2, "LanguageSwitcher", $$LanguageSwitcher, { "currentLang": lang })} </div> <div class="h-screen w-full flex flex-col justify-between items-center p-6 md:p-8 lg:p-12 overflow-hidden"> <div class="flex-1 flex items-center justify-center w-full"> <div class="max-w-5xl w-full"> ${renderComponent($$result2, "GlobalStats", $$GlobalStats, {})} </div> </div> <div class="shrink-0 pb-8 md:pb-12 lg:pb-16 w-full"> ${renderComponent($$result2, "UserPrompt", $$UserPrompt, {})} </div> </div> ${renderComponent($$result2, "UsernameModal", $$UsernameModal, {})} ` })}`;
}, "/root/projects/ops_hive/src/pages/es/index.astro", void 0);

const $$file = "/root/projects/ops_hive/src/pages/es/index.astro";
const $$url = "/es";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
