# Dokumentasi Proyek: Sistem Profil Perusahaan Firma Hukum

## 1. Ikhtisar Proyek (Project Overview)

Sistem berbasis web ini dikembangkan sebagai portal informasi dan profil perusahaan (Company Profile) profesional untuk institusi firma hukum. Proyek ini dirancang dengan standar industri terkini, memprioritaskan performa tinggi, keamanan, optimasi mesin pencari (SEO), serta pengalaman pengguna (UX) yang responsif dan dapat diakses dari berbagai perangkat. 

Sistem ini mendukung fungsionalitas multi-bahasa terintegrasi (Bahasa Indonesia dan Bahasa Inggris) untuk melayani basis klien lokal maupun internasional secara dinamis.

---

## 2. Arsitektur dan Tumpukan Teknologi (Architecture & Technology Stack)

Pengembangan sistem ini mengadopsi standar industri tumpukan teknologi (tech stack) mutakhir yang diuraikan secara spesifik pada panduan arsitektur proyek. Berikut adalah rincian fungsionalitas dari setiap teknologi:

### 2.1. Tumpukan Inti (Core Stack)
*   **Framework Utama: Next.js 15 (App Router)**
    Menggunakan arsitektur terbaru dari ekosistem React. *Server Components* dan *Server Actions* digunakan secara standar untuk meminimalisir beban JavaScript di sisi klien (*client-side*), sehingga situs memuat dengan sangat cepat dan ramah mesin pencari (SEO).
*   **Bahasa Pemrograman: TypeScript**
    Menambahkan lapisan keamanan struktural (Type Safety) untuk mencegah kesalahan pada saat kompilasi (*compile-time*) dan menjaga konsistensi struktur data secara menyeluruh.
*   **Styling: Tailwind CSS v4**
    Kerangka kerja CSS berbasis utilitas (*utility-first*) yang memungkinkan pengembangan antarmuka responsif secara cepat, dengan ukuran bundel CSS akhir yang sangat kecil karena fitur otomatisasi eliminasi gaya tak terpakai.

### 2.2. Antarmuka dan Pengalaman Pengguna (UI & UX)
*   **Komponen UI: shadcn/ui**
    Koleksi komponen antarmuka modular yang sangat mudah disesuaikan, memastikan konsistensi desain dan mendukung prinsip aksesibilitas (a11y) bawaan.
*   **Animasi: Framer Motion**
    Pustaka animasi standar industri untuk React. Digunakan untuk menciptakan transisi perpindahan halaman dan kemunculan elemen saat di-scroll secara mulus tanpa mengorbankan indikator performa utama (*Core Web Vitals*).
*   **Ikonografi: Lucide React**
    Koleksi ikon vektor SVG yang tajam, ringan, dan memiliki konsistensi ketebalan garis (*stroke*) yang sempurna.

### 2.3. Manajemen Formulir dan Data (Forms & Data Validation)
*   **Manajemen Formulir: React Hook Form**
    Digunakan (misalnya pada halaman Kontak) untuk menangani status masukan pengguna (input) tanpa memicu render ulang (*re-render*) komponen yang tidak perlu, sehingga aplikasi tetap responsif.
*   **Validasi Skema: Zod**
    Terintegrasi erat dengan *React Hook Form* untuk memvalidasi data masukan dari sisi klien maupun server berdasarkan skema tipe (Type Schema) yang ketat (seperti validasi email dan panjang minimum karakter).
*   **Layanan Surat Elektronik: Resend**
    Arsitektur proyek telah dirancang siap (ready-architecture) untuk mengintegrasikan pengiriman pesan formulir menggunakan layanan API *Resend* secara aman dari server.

### 2.4. Standar Pengembangan (Development Standards)
*   **Manajer Paket: pnpm**
    Direkomendasikan penggunaannya karena jauh lebih cepat dan efisien dalam pengelolaan ruang penyimpanan diska (disk space) dibandingkan NPM biasa.
*   **Linting: ESLint**
    Menganalisis kode statis untuk menemukan pola yang bermasalah atau kode yang tidak sesuai dengan standar konvensi.
*   **Formatting: Prettier**
    Digunakan bersama ESLint untuk memastikan seluruh basis kode diformat dengan konsisten dan terstandardisasi.
*   **Infrastruktur Deployment: Vercel**
    Platform penerapan aplikasi (hosting) optimal yang dirancang khusus untuk ekosistem Next.js, mendukung fitur Edge Functions dan optimasi citra secara otomatis.

---

## 3. Fitur Utama (Core Features)

### 3.1. Sistem Internasionalisasi Kustom (Custom i18n System)
Sistem bahasa (Indonesia `id` dan Inggris `en`) dikembangkan secara fundamental menggunakan **Next.js Middleware**. Teks disimpan secara independen pada direktori `dictionaries`, menggantikan kebutuhan pustaka pihak ketiga yang membebani memori.

### 3.2. Perutean Artikel Dinamis (Dynamic Article Routing)
Implementasi sistem rute berlapis `app/[locale]/(marketing)/artikel/[slug]`. URL artikel menyesuaikan dengan parameter `slug`, memungkinkan perenderan konten secara spesifik dan disiapkan untuk integrasi CMS.

### 3.3. Sistem Navigasi Aksesibel & Responsif
Sistem menu responsif mendukung pengalaman pengguna *mobile-first*, menghindari elemen yang menutupi konten utama dan menerapkan penanganan *state* untuk menu layar sentuh.

---

## 4. Struktur Direktori Sistem (System Directory Structure)

```text
/
+-- app/
|   +-- [locale]/                  [Routing Dinamis berdasarkan Bahasa]
|   |   +-- (marketing)/           [Grup Rute Logis]
|   |   |   +-- artikel/           [Modul Halaman: Daftar Artikel dan Dinamis slug]
|   |   |   +-- kontak/            [Modul Halaman: Formulir dan Informasi Kontak]
|   |   |   +-- layanan/           [Modul Halaman: Daftar dan Deskripsi Layanan Hukum]
|   |   |   +-- tentang-kami/      [Modul Halaman: Sejarah dan Visi Misi Firma]
|   |   |   +-- tim/               [Modul Halaman: Profil Profesional Pengacara]
|   |   |   +-- page.tsx           [Modul Halaman: Halaman Beranda / Home]
|   |   +-- layout.tsx             [Templat Utama: Mendefinisikan Navigasi dan Footer Global]
|   +-- middleware.ts              [Lapisan Pemroses Permintaan: Logika i18n]
+-- components/
|   +-- layout/                    [Komponen Struktural: Navbar, Footer]
|   +-- shared/                    [Komponen Reusable: PageHero, Container, Elemen Animasi]
|   +-- ui/                        [Komponen Atomik: Komponen berbasis shadcn/ui]
+-- dictionaries/
|   +-- en.ts                      [Penyimpanan Nilai Teks: Bahasa Inggris]
|   +-- id.ts                      [Penyimpanan Nilai Teks: Bahasa Indonesia]
+-- lib/
|   +-- data/                      [Simulasi Pangkalan Data: Artikel, Konfigurasi Situs]
```

---

## 5. Panduan Instalasi dan Penggunaan (Installation & Usage Guide)

1.  **Instalasi Dependensi**
    Direkomendasikan menggunakan `pnpm` sesuai tumpukan teknologi:
    ```bash
    pnpm install
    ```

2.  **Inisialisasi Server Pengembangan (Development Server)**
    ```bash
    pnpm run dev
    ```

3.  **Akses Aplikasi**
    Buka peramban web dan tuju alamat: `http://localhost:3000`

---
Hak Cipta © Firma Hukum. Dokumentasi Teknis Sistem Profil Perusahaan.
