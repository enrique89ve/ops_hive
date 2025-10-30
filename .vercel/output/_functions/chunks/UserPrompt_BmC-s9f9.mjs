import { e as createComponent, f as createAstro, m as maybeRenderHead, l as renderScript, r as renderTemplate } from './astro/server_Bo91TW9v.mjs';
import { g as getLangFromUrl, u as useTranslations } from './UsernameModal_tyf7WvG3.mjs';
/* empty css                         */

const $$Astro$1 = createAstro();
const $$GlobalStats = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$GlobalStats;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  return renderTemplate`${maybeRenderHead()}<div class="text-center space-y-2" data-astro-cid-rxy23ikl> <p class="font-sans text-[clamp(0.75rem,2vw,0.875rem)] font-medium text-white/40 uppercase tracking-[0.2em] m-0 opacity-0" id="statsLabel" data-astro-cid-rxy23ikl> ${t("home.totalOperationsLabel")} </p> <div class="font-sans text-[clamp(2.5rem,12vw,6rem)] font-black text-red-500 m-0 leading-[0.9] tracking-[-0.04em]" id="totalOps" data-astro-cid-rxy23ikl>
0
</div> <p class="font-sans text-[clamp(0.75rem,2vw,0.875rem)] font-light text-white/30 tracking-[0.05em] m-0 pt-1 opacity-0" id="statsSubtitle" data-astro-cid-rxy23ikl> ${t("home.allTimeOperations")} </p> </div>  ${renderScript($$result, "/root/projects/ops_hive/src/components/GlobalStats.astro?astro&type=script&index=0&lang.ts")}`;
}, "/root/projects/ops_hive/src/components/GlobalStats.astro", void 0);

const $$Astro = createAstro();
const $$UserPrompt = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$UserPrompt;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  return renderTemplate`${maybeRenderHead()}<div class="text-center space-y-6"> <h2 class="font-sans text-[clamp(0.875rem,3vw,1.125rem)] font-semibold text-white/80 leading-relaxed max-w-md mx-auto"> ${t("home.questionTitle")} </h2> <button id="openModalBtn" class="group relative px-8 py-3.5 text-[clamp(0.875rem,2vw,1rem)] font-bold text-white rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30"> <span class="relative z-10">${t("home.ctaButton")}</span> <div class="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> </button> </div> ${renderScript($$result, "/root/projects/ops_hive/src/components/UserPrompt.astro?astro&type=script&index=0&lang.ts")}`;
}, "/root/projects/ops_hive/src/components/UserPrompt.astro", void 0);

export { $$GlobalStats as $, $$UserPrompt as a };
