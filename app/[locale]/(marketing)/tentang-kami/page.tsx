import { getDictionary } from "@/lib/dictionary";
import { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/shared";
import { SectionWrapper } from "@/components/shared";
import { SectionHeading } from "@/components/shared";
import { AnimatedElement } from "@/components/shared";
import { PageHero } from "@/components/shared";
import { CTA } from "@/components/sections";
import {
  Shield,
  Target,
  Eye,
  Compass,
  Scale,
  Users,
  Building2,
  MapPin,
} from "lucide-react";
import { siteConfig } from "@/constants/site";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Sejarah, visi, misi, dan nilai-nilai inti yang membentuk Firma Hukum sebagai penyedia layanan hukum terpercaya.",
};

const values = [
  {
    icon: Shield,
    title: "Integritas & Etika",
    description:
      "Kami menjunjung tinggi standar etika profesi terdalam dalam setiap tindakan dan keputusan hukum yang kami ambil.",
  },
  {
    icon: Target,
    title: "Berorientasi pada Solusi",
    description:
      "Fokus kami adalah menemukan solusi hukum paling efektif dan efisien yang sejalan dengan tujuan strategis klien.",
  },
  {
    icon: Users,
    title: "Kemitraan Jangka Panjang",
    description:
      "Kami membangun hubungan berbasis kepercayaan dan transparansi untuk menjadi mitra hukum strategis jangka panjang.",
  },
  {
    icon: Scale,
    title: "Keunggulan Profesional",
    description:
      "Komitmen tanpa henti terhadap kualitas, ketelitian, dan pembaruan pengetahuan hukum secara berkelanjutan.",
  },
];

const timeline = [
  {
    year: "2009",
    title: "Pendirian Firma",
    description:
      "Didirikan oleh Dr. Andi Pratama dengan fokus awal pada litigasi perdata dan pidana di Jakarta.",
  },
  {
    year: "2013",
    title: "Ekspansi Layanan Korporasi",
    description:
      "Membuka divisi khusus hukum korporasi dan komersial seiring meningkatnya kepercayaan klien bisnis.",
  },
  {
    year: "2018",
    title: "Pengakuan Industri",
    description:
      "Masuk dalam daftar 50 firma hukum terbaik di Indonesia untuk kategori Corporate and M&A.",
  },
  {
    year: "2023",
    title: "Era Modern",
    description:
      "Pindah ke kantor pusat baru dan integrasi teknologi legal tech untuk efisiensi layanan klien.",
  },
];

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "id" | "en");

  return (
    <>
      <PageHero
        title={dict.aboutPage.heroTitle}
        description={dict.aboutPage.heroDesc}
      />

      {/* Cerita dan Filosofi */}
      <SectionWrapper background="white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <AnimatedElement variant="fadeRight">
              <h2 className="font-heading text-3xl font-bold text-navy-950 md:text-4xl">
                {dict.aboutPage.historyBadge}{" "}
                <span className="text-gold-600">
                  {dict.aboutPage.historyHighlight}
                </span>
              </h2>
              <div className="mt-6 space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>{dict.aboutPage.historyP1}</p>
                <p>{dict.aboutPage.historyP2}</p>
                <p>{dict.aboutPage.historyP3}</p>
              </div>
            </AnimatedElement>

            <AnimatedElement variant="fadeLeft" className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl bg-navy-900 relative">
                <Image
                  src="/images/tentang-kami.png"
                  alt="Sejarah WebWeavers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-right opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

                {/* Elemen dekoratif */}
                <div className="absolute bottom-8 left-8 right-8 border-l-2 border-gold-500 pl-6 py-2">
                  <p className="font-heading text-2xl font-bold text-white mb-2">
                    "{dict.aboutPage.quote}"
                  </p>
                  <p className="text-sm text-gold-400">
                    {dict.aboutPage.quoteDesc}
                  </p>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </Container>
      </SectionWrapper>

      {/* Visi dan Misi */}
      <SectionWrapper background="navy" className="relative overflow-hidden">
        {/* Elemen latar belakang halus */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gold-600/5 blur-[120px]" />

        <Container className="relative z-10">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <AnimatedElement
              variant="fadeUp"
              className="rounded-2xl border border-navy-700 bg-navy-900/50 p-8 backdrop-blur-sm lg:p-12"
            >
              <Eye className="h-12 w-12 text-gold-500 mb-6" />
              <h2 className="font-heading text-2xl font-bold text-white mb-4">
                {dict.aboutPage.visionTitle}
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                {dict.aboutPage.visionDesc}
              </p>
            </AnimatedElement>

            <AnimatedElement
              variant="fadeUp"
              delay={0.2}
              className="rounded-2xl border border-navy-700 bg-navy-900/50 p-8 backdrop-blur-sm lg:p-12"
            >
              <Compass className="h-12 w-12 text-gold-500 mb-6" />
              <h2 className="font-heading text-2xl font-bold text-white mb-4">
                {dict.aboutPage.missionTitle}
              </h2>
              <ul className="space-y-4 text-gray-400 leading-relaxed">
                {dict.aboutPage.missionPoints.map((point, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-gold-500 font-bold">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </AnimatedElement>
          </div>
        </Container>
      </SectionWrapper>

      {/* Nilai Inti */}
      <SectionWrapper background="cream">
        <Container>
          <AnimatedElement variant="fadeUp">
            <SectionHeading
              eyebrow={dict.aboutPage.valuesBadge}
              title={dict.aboutPage.valuesTitle}
              description={dict.aboutPage.valuesDesc}
            />
          </AnimatedElement>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
            {dict.aboutPage.values.map((value, index) => {
              const Icon = values[index].icon;
              return (
                <AnimatedElement
                  key={value.title}
                  variant="fadeUp"
                  delay={index * 0.1}
                  className="rounded-xl bg-white p-8 shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-gold-300"
                >
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50 text-navy-950">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 font-heading text-xl font-bold text-navy-950">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {value.desc}
                  </p>
                </AnimatedElement>
              );
            })}
          </div>
        </Container>
      </SectionWrapper>

      {/* Lini Masa */}
      <SectionWrapper background="white">
        <Container className="max-w-4xl">
          <AnimatedElement variant="fadeUp">
            <SectionHeading
              eyebrow={dict.aboutPage.timelineBadge}
              title={dict.aboutPage.timelineTitle}
            />
          </AnimatedElement>

          <div className="mt-16 space-y-12">
            {dict.aboutPage.timeline.map((item, index) => (
              <AnimatedElement
                key={item.year}
                variant="fadeUp"
                delay={index * 0.1}
                className="relative pl-8 md:pl-0"
              >
                {/* Garis lini masa desktop */}
                <div className="hidden md:block absolute left-[50%] top-0 bottom-[-3rem] w-px bg-gray-200 -translate-x-1/2 last:bottom-0" />

                {/* Garis lini masa mobile */}
                <div className="block md:hidden absolute left-0 top-2 bottom-[-3rem] w-px bg-gray-200 last:bottom-0" />

                <div
                  className={`md:flex items-center justify-between ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Titik lini masa */}
                  <div className="absolute left-[-5px] md:left-[50%] top-1.5 md:top-1/2 h-3 w-3 rounded-full bg-gold-500 md:-translate-x-1/2 md:-translate-y-1/2 ring-4 ring-white" />

                  {/* Kotak konten */}
                  <div className="md:w-[45%]">
                    <div className="rounded-xl border border-gray-100 bg-cream-50/50 p-6 shadow-sm">
                      <span className="text-sm font-bold text-gold-600 mb-2 block">
                        {item.year}
                      </span>
                      <h3 className="font-heading text-xl font-bold text-navy-950 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>

                  {/* Ruang kosong untuk tata letak bergantian di desktop */}
                  <div className="hidden md:block md:w-[45%]" />
                </div>
              </AnimatedElement>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Kantor dan Jangkauan */}
      <SectionWrapper background="navy" className="border-t border-navy-800">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <AnimatedElement variant="fadeRight">
              <SectionHeading
                eyebrow={dict.aboutPage.officeBadge}
                title={dict.aboutPage.officeTitle}
                description={dict.aboutPage.officeDesc}
                align="left"
                dark
              />

              <ul className="mt-8 space-y-6">
                <li className="flex gap-4">
                  <div className="mt-1 shrink-0">
                    <Building2 className="h-6 w-6 text-gold-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">
                      {dict.aboutPage.officeFeatures[0].title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-400">
                      {dict.aboutPage.officeFeatures[0].desc}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 shrink-0">
                    <MapPin className="h-6 w-6 text-gold-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">
                      {dict.aboutPage.officeFeatures[1].title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-400">
                      {dict.aboutPage.officeFeatures[1].desc}
                    </p>
                  </div>
                </li>
              </ul>
            </AnimatedElement>

            <AnimatedElement variant="fadeLeft" className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-navy-900 border border-navy-700/50">
                <div className="absolute inset-0 bg-[url('/images/placeholder/building.jpg')] bg-cover bg-center opacity-50 mix-blend-luminosity" />
              </div>
            </AnimatedElement>
          </div>
        </Container>
      </SectionWrapper>

      <CTA dict={dict} locale={locale} />
    </>
  );
}
