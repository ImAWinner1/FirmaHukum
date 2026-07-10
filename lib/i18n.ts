/**
 * Konfigurasi internasionalisasi (i18n) situs.
 * Mendefinisikan locale default dan daftar locale yang didukung.
 * Digunakan oleh middleware dan sistem routing untuk menentukan bahasa halaman.
 */
export const i18n = {
  defaultLocale: "id",
  locales: ["id", "en"],
} as const;

/** Tipe union yang merepresentasikan locale yang didukung: `"id"` atau `"en"`. */
export type Locale = (typeof i18n)["locales"][number];
