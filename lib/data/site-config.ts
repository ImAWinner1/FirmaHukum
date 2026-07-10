import type { SiteConfig, NavItem } from "@/types";

/**
 * Core site configuration — single source of truth for firm identity.
 *
 * NOTE: All contact details, names, and addresses are PLACEHOLDERS.
 * Replace with actual firm data before production deployment.
 */
export const siteConfig: SiteConfig = {
  name: "Firma Hukum",
  tagline: "Solusi Hukum Terpercaya",
  description:
    "Firma hukum profesional yang menyediakan layanan konsultasi dan pendampingan hukum terpercaya untuk individu dan korporasi di Indonesia.",
  contact: {
    address:
      "Jl. AH. Nasution No.105, Cipadung Wetan, Kec. Cibiru, Kota Bandung, Jawa Barat 40614",
    phone: "+62 896 4419 1553",
    email: "thelawticsa@gmail.com",
    whatsapp: "+6289644191553",
    businessHours: "Senin – Jumat: 08.00 – 17.00 WIB",
  },
  socialLinks: [
    {
      platform: "LinkedIn",
      href: "https://linkedin.com/company/firma-hukum",
      icon: "Linkedin",
    },
    {
      platform: "Instagram",
      href: "https://instagram.com/firmahukum",
      icon: "Instagram",
    },
    {
      platform: "Facebook",
      href: "https://facebook.com/firmahukum",
      icon: "Facebook",
    },
    {
      platform: "Twitter",
      href: "https://twitter.com/firmahukum",
      icon: "Twitter",
    },
  ],
};

/** Primary navigation items */
export const navItems: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Layanan", href: "/layanan" },
  { label: "Tim", href: "/tim" },
  { label: "Artikel", href: "/artikel" },
  { label: "Kontak", href: "/kontak" },
];

/** Footer service links (subset of practice areas) */
export const footerServiceLinks: NavItem[] = [
  { label: "Hukum Korporasi", href: "/layanan/hukum-korporasi" },
  { label: "Hukum Perdata", href: "/layanan/hukum-perdata" },
  { label: "Hukum Pidana", href: "/layanan/hukum-pidana" },
  { label: "Hukum Ketenagakerjaan", href: "/layanan/hukum-ketenagakerjaan" },
  { label: "Hukum Properti", href: "/layanan/hukum-properti" },
];
