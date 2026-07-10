import type { Locale } from "./i18n";

/**
 * Peta pemuat (loader) kamus bahasa.
 * Setiap locale memiliki fungsi pemuatan dinamis (dynamic import) untuk menghindari
 * pemuatan seluruh kamus sekaligus saat aplikasi pertama kali dimuat.
 */
const dictionaries = {
  id: () => import("../dictionaries/id").then((module) => module.id),
  en: () => import("../dictionaries/en").then((module) => module.en),
};

/**
 * Memuat kamus terjemahan berdasarkan locale yang diberikan.
 * Jika locale tidak dikenali, secara otomatis memuat kamus bahasa Indonesia (`id`) sebagai fallback.
 *
 * @param locale - Kode locale yang akan dimuat (`"id"` atau `"en"`).
 * @returns Objek kamus terjemahan yang berisi seluruh teks antarmuka untuk locale yang diminta.
 */
export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.id();
};
