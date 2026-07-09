import type { Locale } from "./i18n";

const dictionaries = {
  id: () => import("../dictionaries/id").then((module) => module.id),
  en: () => import("../dictionaries/en").then((module) => module.en),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.id();
};
