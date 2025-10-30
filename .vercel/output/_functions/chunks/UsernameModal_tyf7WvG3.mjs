import { e as createComponent, f as createAstro, h as addAttribute, n as renderHead, o as renderSlot, r as renderTemplate, m as maybeRenderHead, l as renderScript } from './astro/server_Bo91TW9v.mjs';
/* empty css                         */

const nav$1 = {"backToHome":"Back to home","searchAnotherUser":"Search another user"};
const home$1 = {"totalOperationsLabel":"Total Operations on Hive","allTimeOperations":"All-time blockchain operations","questionTitle":"Want to know how many operations you have performed?","ctaButton":"Yes, I want to know"};
const modal$1 = {"title":"Enter your Hive username","placeholder":"example: alice","searchButton":"Search","errorEmpty":"Please enter a username","errorTooShort":"Username must be at least 3 characters"};
const user$1 = {"loading":"Loading statistics...","notFound":"User not found","share":"Share","copyImage":"Copy image","copyImageDesc":"To paste on social media","downloadImage":"Download image","downloadImageDesc":"Save to your device","totalOperations":"Total operations you have performed on Hive:","partOf":"You are among the top","mostActive":"most active in the network's history","hiveExceeds":"Hive has already surpassed","operations":"operations","copying":"Generating...","copied":"Copied!","downloading":"Generating...","downloaded":"Downloaded!","unsupported":"Not supported","error":"Error"};
const en = {
  nav: nav$1,
  home: home$1,
  modal: modal$1,
  user: user$1,
};

const nav = {"backToHome":"Volver al inicio","searchAnotherUser":"Buscar otro usuario"};
const home = {"totalOperationsLabel":"Total de Operaciones en Hive","allTimeOperations":"Operaciones de blockchain de todos los tiempos","questionTitle":"¿Quieres saber cuántas operaciones tú has realizado?","ctaButton":"Sí, quiero"};
const modal = {"title":"Ingresa tu username de Hive","placeholder":"ejemplo: alice","searchButton":"Buscar","errorEmpty":"Por favor ingresa un username","errorTooShort":"El username debe tener al menos 3 caracteres"};
const user = {"loading":"Cargando estadísticas...","notFound":"Usuario no encontrado","share":"Compartir","copyImage":"Copiar imagen","copyImageDesc":"Para pegar en redes sociales","downloadImage":"Descargar imagen","downloadImageDesc":"Guardar en tu dispositivo","totalOperations":"Total de operaciones que has realizado en Hive","partOf":"Formas parte del","mostActive":"más activo de toda la historia de la red","hiveExceeds":"Hive ya supera","operations":"de operaciones","copying":"Generando...","copied":"¡Copiado!","downloading":"Generando...","downloaded":"¡Descargado!","unsupported":"No soportado","error":"Error"};
const es = {
  nav,
  home,
  modal,
  user,
};

var SupportedLocale = /* @__PURE__ */ ((SupportedLocale2) => {
  SupportedLocale2["ENGLISH"] = "en";
  SupportedLocale2["SPANISH"] = "es";
  return SupportedLocale2;
})(SupportedLocale || {});
const DEFAULT_LOCALE = "en" /* ENGLISH */;
const LANGUAGE_NAMES = {
  ["en" /* ENGLISH */]: "English",
  ["es" /* SPANISH */]: "Español"
};
const SUPPORTED_LOCALES = Object.values(SupportedLocale);
const LOCALE_PATH_PREFIX = {
  ["en" /* ENGLISH */]: "",
  ["es" /* SPANISH */]: "/es"
};
function getLocalePrefix(locale) {
  return LOCALE_PATH_PREFIX[locale];
}
function getNonDefaultLocales() {
  return SUPPORTED_LOCALES.filter((locale) => locale !== DEFAULT_LOCALE);
}

function getLocaleFromPathname(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  const nonDefaultLocales = getNonDefaultLocales();
  for (const locale of nonDefaultLocales) {
    const prefix = getLocalePrefix(locale).substring(1);
    if (segments.length > 0 && segments[0] === prefix) {
      return locale;
    }
  }
  return DEFAULT_LOCALE;
}

const languages = LANGUAGE_NAMES;
const ui = {
  [SupportedLocale.ENGLISH]: en,
  [SupportedLocale.SPANISH]: es
};
function getLangFromUrl(url) {
  return getLocaleFromPathname(url.pathname);
}
function useTranslations(lang) {
  return function t(key) {
    const keys = key.split(".");
    let value = ui[lang];
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        console.warn(
          `[i18n] Missing translation key: ${key} for locale: ${lang}`
        );
        return key;
      }
    }
    return typeof value === "string" ? value : key;
  };
}

const $$Astro$2 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const lang = getLangFromUrl(Astro2.url);
  const {
    title = "Ops by Hive",
    description = "Discover your blockchain activity on Hive. See your total operations and how you rank among the most active users in the network's history.",
    ogImage
  } = Astro2.props;
  return renderTemplate`<html${addAttribute(lang, "lang")} class="h-full"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><meta name="description"${addAttribute(description, "content")}><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}>${ogImage && renderTemplate`<meta property="og:image"${addAttribute(ogImage, "content")}>`}<!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}>${ogImage && renderTemplate`<meta property="twitter:image"${addAttribute(ogImage, "content")}>`}${renderHead()}</head> <body class="m-0 p-0 w-full h-full bg-black text-white font-sans"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/root/projects/ops_hive/src/layouts/Layout.astro", void 0);

const $$Astro$1 = createAstro();
const $$LanguageSwitcher = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$LanguageSwitcher;
  const { currentLang } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="relative inline-block" id="langSwitcher"> <button id="langBtn" class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5" aria-label="Change language"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path> </svg> <span class="uppercase font-bold">${currentLang}</span> <svg class="w-3 h-3 transition-transform duration-200" id="langDropdownIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> </svg> </button> <div id="langMenu" class="hidden absolute right-0 top-full mt-2 w-40 bg-black/95 backdrop-blur-sm border border-red-500/30 rounded-lg shadow-[0_0_20px_rgba(227,19,55,0.2)] overflow-hidden z-50"> ${Object.entries(languages).map(([lang, label]) => {
    return renderTemplate`<button${addAttribute(lang, "data-lang")}${addAttribute(`lang-link w-full text-left block px-4 py-2 text-sm font-medium transition-colors duration-200 ${lang === currentLang ? "bg-red-500/20 text-white" : "text-white/70 hover:bg-red-500/10 hover:text-white"}`, "class")}> ${label} </button>`;
  })} </div> </div> ${renderScript($$result, "/root/projects/ops_hive/src/components/LanguageSwitcher.astro?astro&type=script&index=0&lang.ts")}`;
}, "/root/projects/ops_hive/src/components/LanguageSwitcher.astro", void 0);

const $$Astro = createAstro();
const $$UsernameModal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$UsernameModal;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  return renderTemplate`${maybeRenderHead()}<div id="usernameModal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 bg-black/80 backdrop-blur-sm"> <div class="relative w-full max-w-md p-8 rounded-2xl bg-gradient-to-br from-black via-red-500/10 to-black border-2 border-red-500/30 shadow-[0_0_50px_rgba(227,19,55,0.3)]"> <button id="closeModalBtn" class="absolute top-4 right-4 text-white/60 hover:text-white text-2xl font-bold transition-colors">
×
</button> <h3 class="font-sans text-2xl font-bold text-white mb-6"> ${t("modal.title")} </h3> <form id="usernameForm" class="space-y-4"> <div> <input type="text" id="usernameInput"${addAttribute(t("modal.placeholder"), "placeholder")} class="w-full px-4 py-3 bg-black/50 border-2 border-red-500/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-red-500 transition-colors font-sans" required autocomplete="off"> <p id="errorMessage" class="mt-2 text-red-500 text-sm font-sans hidden"></p> </div> <button type="submit" id="submitBtn" class="w-full px-6 py-3 text-lg font-bold text-white rounded-lg transition-all duration-300 hover:scale-105 bg-gradient-to-r from-red-500 to-red-500/80 hover:shadow-[0_0_20px_rgba(227,19,55,0.5)]"> ${t("modal.searchButton")} </button> </form> </div> </div> ${renderScript($$result, "/root/projects/ops_hive/src/components/UsernameModal.astro?astro&type=script&index=0&lang.ts")}`;
}, "/root/projects/ops_hive/src/components/UsernameModal.astro", void 0);

export { $$Layout as $, DEFAULT_LOCALE as D, $$UsernameModal as a, $$LanguageSwitcher as b, getLocalePrefix as c, getLangFromUrl as g, useTranslations as u };
