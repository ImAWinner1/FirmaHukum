import type { PracticeArea } from "@/types";

/**
 * Practice area data — all descriptions are PLACEHOLDER content.
 * Replace with actual firm practice area details before production.
 */
export const practiceAreas: PracticeArea[] = [
  {
    id: "hukum-korporasi",
    title: "Hukum Korporasi",
    slug: "hukum-korporasi",
    icon: "Building2",
    shortDescription:
      "Pendampingan hukum menyeluruh untuk kebutuhan bisnis dan korporasi, mulai dari pendirian hingga restrukturisasi perusahaan.",
    fullDescription:
      "Tim kami menyediakan layanan hukum korporasi yang komprehensif, mencakup pendirian perusahaan, penyusunan anggaran dasar, merger dan akuisisi, due diligence, serta kepatuhan regulasi. Kami membantu klien korporasi menavigasi kompleksitas hukum bisnis dengan solusi yang strategis dan terukur.",
    keyServices: [
      "Pendirian dan restrukturisasi perusahaan",
      "Merger, akuisisi, dan joint venture",
      "Due diligence hukum",
      "Penyusunan kontrak bisnis",
      "Kepatuhan regulasi dan perizinan",
      "Corporate governance",
    ],
  },
  {
    id: "hukum-perdata",
    title: "Hukum Perdata",
    slug: "hukum-perdata",
    icon: "Scale",
    shortDescription:
      "Penanganan sengketa perdata secara profesional melalui litigasi maupun alternatif penyelesaian sengketa.",
    fullDescription:
      "Kami memiliki pengalaman luas dalam menangani berbagai jenis sengketa perdata, termasuk sengketa kontrak, wanprestasi, perbuatan melawan hukum, dan sengketa properti. Pendekatan kami mengutamakan penyelesaian yang efisien namun tetap melindungi kepentingan klien secara maksimal.",
    keyServices: [
      "Litigasi perdata di pengadilan",
      "Mediasi dan arbitrase",
      "Sengketa kontrak dan wanprestasi",
      "Perbuatan melawan hukum",
      "Eksekusi putusan pengadilan",
      "Gugatan ganti rugi",
    ],
  },
  {
    id: "hukum-pidana",
    title: "Hukum Pidana",
    slug: "hukum-pidana",
    icon: "Shield",
    shortDescription:
      "Pembelaan dan pendampingan hukum pidana dengan integritas tinggi untuk melindungi hak-hak klien.",
    fullDescription:
      "Tim litigasi pidana kami memberikan pendampingan hukum dari tahap penyelidikan hingga persidangan. Kami berkomitmen untuk memastikan hak-hak klien terlindungi sepenuhnya dalam setiap tahapan proses hukum pidana, dengan pendekatan yang strategis dan berintegritas.",
    keyServices: [
      "Pendampingan hukum di kepolisian dan kejaksaan",
      "Pembelaan di persidangan",
      "Peninjauan kembali dan banding",
      "Perlindungan hak tersangka dan terdakwa",
      "Tindak pidana ekonomi dan korupsi",
      "Tindak pidana khusus",
    ],
  },
  {
    id: "hukum-ketenagakerjaan",
    title: "Hukum Ketenagakerjaan",
    slug: "hukum-ketenagakerjaan",
    icon: "Users",
    shortDescription:
      "Konsultasi dan pendampingan hukum ketenagakerjaan untuk perusahaan maupun pekerja.",
    fullDescription:
      "Kami menyediakan layanan hukum ketenagakerjaan yang mencakup penyusunan peraturan perusahaan, penyelesaian perselisihan hubungan industrial, dan konsultasi kepatuhan terhadap undang-undang ketenagakerjaan. Layanan kami membantu menciptakan hubungan kerja yang sehat dan sesuai regulasi.",
    keyServices: [
      "Penyusunan perjanjian kerja dan peraturan perusahaan",
      "Penyelesaian perselisihan hubungan industrial",
      "Pemutusan hubungan kerja (PHK)",
      "Kepatuhan undang-undang ketenagakerjaan",
      "Audit ketenagakerjaan",
      "Program jaminan sosial tenaga kerja",
    ],
  },
  {
    id: "hukum-properti",
    title: "Hukum Properti & Pertanahan",
    slug: "hukum-properti",
    icon: "Home",
    shortDescription:
      "Layanan hukum properti dan pertanahan untuk transaksi, sertifikasi, dan penyelesaian sengketa tanah.",
    fullDescription:
      "Tim properti dan pertanahan kami membantu klien dalam berbagai aspek hukum terkait properti, termasuk transaksi jual beli, sertifikasi tanah, penyelesaian sengketa, dan perizinan pembangunan. Kami memastikan setiap transaksi properti berjalan aman dan sesuai hukum.",
    keyServices: [
      "Transaksi jual beli properti",
      "Sertifikasi dan pendaftaran tanah",
      "Sengketa pertanahan",
      "Perizinan pembangunan",
      "Due diligence properti",
      "Hukum agraria",
    ],
  },
  {
    id: "hukum-perbankan",
    title: "Hukum Perbankan & Keuangan",
    slug: "hukum-perbankan",
    icon: "Landmark",
    shortDescription:
      "Pendampingan hukum di sektor perbankan, keuangan, dan pasar modal sesuai regulasi terkini.",
    fullDescription:
      "Kami memberikan layanan hukum khusus untuk sektor perbankan dan keuangan, termasuk kepatuhan regulasi OJK dan Bank Indonesia, penyusunan produk keuangan, serta litigasi perbankan. Pengalaman kami di sektor ini memastikan solusi yang tepat dan sesuai dengan dinamika regulasi keuangan.",
    keyServices: [
      "Kepatuhan regulasi perbankan",
      "Penyusunan perjanjian kredit dan pembiayaan",
      "Restrukturisasi utang",
      "Litigasi perbankan",
      "Regulasi fintech dan teknologi keuangan",
      "Pasar modal dan investasi",
    ],
  },
  {
    id: "hukum-kekayaan-intelektual",
    title: "Kekayaan Intelektual",
    slug: "hukum-kekayaan-intelektual",
    icon: "Lightbulb",
    shortDescription:
      "Perlindungan dan penegakan hak kekayaan intelektual secara menyeluruh dan strategis.",
    fullDescription:
      "Tim kekayaan intelektual kami menyediakan layanan pendaftaran, perlindungan, dan penegakan hak atas merek, paten, hak cipta, dan desain industri. Kami membantu klien menjaga dan memaksimalkan nilai aset intelektual mereka dalam lingkungan bisnis yang kompetitif.",
    keyServices: [
      "Pendaftaran merek dan paten",
      "Perlindungan hak cipta",
      "Desain industri dan rahasia dagang",
      "Litigasi kekayaan intelektual",
      "Lisensi dan perjanjian IP",
      "Audit portofolio kekayaan intelektual",
    ],
  },
  {
    id: "hukum-keluarga",
    title: "Hukum Keluarga",
    slug: "hukum-keluarga",
    icon: "Heart",
    shortDescription:
      "Pendampingan hukum keluarga dengan pendekatan yang profesional, empatik, dan berorientasi pada solusi.",
    fullDescription:
      "Kami memahami bahwa masalah hukum keluarga bersifat sensitif dan memerlukan penanganan yang bijaksana. Tim kami menyediakan layanan hukum keluarga yang profesional namun tetap mengedepankan empati, termasuk perceraian, hak asuh anak, waris, dan adopsi.",
    keyServices: [
      "Perceraian dan pembagian harta bersama",
      "Hak asuh anak",
      "Hukum waris dan pembagian warisan",
      "Adopsi anak",
      "Perjanjian pranikah",
      "Mediasi keluarga",
    ],
  },
];

/**
 * Get a practice area by its slug.
 * Returns undefined if no match is found.
 */
export function getPracticeAreaBySlug(
  slug: string
): PracticeArea | undefined {
  return practiceAreas.find((area) => area.slug === slug);
}

/**
 * Get all practice area slugs for static path generation.
 */
export function getAllPracticeAreaSlugs(): string[] {
  return practiceAreas.map((area) => area.slug);
}
