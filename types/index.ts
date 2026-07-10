/* ==========================================================================
   Shared Type Definitions - Firma Hukum
   ========================================================================== */

/** Struktur data yang merepresentasikan setiap item tautan pada menu navigasi. */
export interface NavItem {
  label: string;
  href: string;
}

/** Struktur data untuk mendefinisikan area praktik atau layanan hukum yang ditawarkan firma. */
export interface PracticeArea {
  id: string;
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  keyServices: string[];
}

/** Representasi data profil anggota tim, pengacara, atau advokat. */
export interface TeamMember {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experience: string;
  imagePlaceholder: string;
  linkedIn: string;
}

/** Data metrik atau statistik untuk ditampilkan pada bagian pencapaian. */
export interface StatItem {
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

/** Struktur informasi kontak utama firma hukum. */
export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  businessHours: string;
}

/** Definisi tipe untuk tautan media sosial yang digunakan pada header/footer. */
export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

/** Skema konfigurasi global situs. */
export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  contact: ContactInfo;
  socialLinks: SocialLink[];
}

/** Struktur data riwayat atau lini masa (timeline) perusahaan untuk halaman 'Tentang Kami'. */
export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

/** Struktur nilai-nilai inti (core values) yang dipegang oleh firma. */
export interface CoreValue {
  title: string;
  description: string;
  icon: string;
}
