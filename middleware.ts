import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "@/lib/i18n";

/**
 * Middleware untuk mendeteksi dan mengarahkan locale (bahasa) pada setiap request.
 *
 * Logika utama:
 * 1. Periksa apakah pathname sudah mengandung segmen locale yang didukung (misalnya `/id/` atau `/en/`).
 * 2. Jika belum, baca preferensi locale dari cookie `NEXT_LOCALE`.
 * 3. Jika cookie tidak tersedia atau nilainya tidak valid, gunakan locale default (`id`).
 * 4. Redirect pengguna ke URL yang sama dengan tambahan prefix locale di awal path.
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  /** Periksa apakah pathname belum memiliki segmen locale yang didukung */
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  /** Redirect ke locale yang sesuai jika belum ada di pathname */
  if (pathnameIsMissingLocale) {
    /**
     * Prioritas pemilihan locale:
     * 1. Nilai cookie `NEXT_LOCALE` jika tersedia dan valid.
     * 2. Locale default dari konfigurasi i18n (`id`) sebagai fallback.
     */
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    const locale =
      cookieLocale && i18n.locales.includes(cookieLocale as any)
        ? cookieLocale
        : i18n.defaultLocale;

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }
}

/**
 * Konfigurasi matcher untuk middleware.
 * Pola regex ini mengecualikan path-path statis dan API agar middleware
 * hanya memproses request ke halaman yang membutuhkan locale.
 */
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|icon.svg|robots.txt|sitemap.xml).*)",
  ],
};
