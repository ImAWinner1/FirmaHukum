import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Konfigurasi ESLint untuk proyek Next.js.
 * Menggunakan preset `core-web-vitals` dan `typescript` dari eslint-config-next.
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  /** Override pola ignore bawaan dari eslint-config-next */
  globalIgnores([
    /** Direktori dan file yang dikecualikan dari proses linting */
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
