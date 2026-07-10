import { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";
import { getAllPracticeAreaSlugs } from "@/lib/data/practice-areas";

/**
 * Menghasilkan file sitemap.xml secara otomatis pada waktu build.
 * Mencakup seluruh route statis (beranda, tentang kami, layanan, tim, kontak)
 * dan route dinamis (halaman detail setiap area praktik hukum).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://firmahukum.id";

  /** Route statis utama situs */
  const routes = ["", "/tentang-kami", "/layanan", "/tim", "/kontak"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  /** Route dinamis untuk setiap halaman detail area praktik hukum */
  const practiceAreaRoutes = getAllPracticeAreaSlugs().map((slug) => ({
    url: `${baseUrl}/layanan/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...practiceAreaRoutes];
}
