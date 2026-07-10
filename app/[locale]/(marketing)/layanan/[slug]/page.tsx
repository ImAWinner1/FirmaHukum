import { getDictionary } from '@/lib/dictionary';
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { PageHero } from "@/components/shared/page-hero";
import { CTA } from "@/components/sections/cta";
import { Button } from "@/components/ui/button";
import {
  getPracticeAreaBySlug,
  getAllPracticeAreaSlugs,
  practiceAreas,
} from "@/lib/data/practice-areas";

interface PracticeAreaPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllPracticeAreaSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PracticeAreaPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const dict = await getDictionary(locale as 'id' | 'en');
  const area = getPracticeAreaBySlug(slug);

  if (!area) {
    return {
      title: "Layanan Tidak Ditemukan",
    };
  }

  return {
    title: dict.servicesPage.areas[area.id as keyof typeof dict.servicesPage.areas]?.title || area.title,
    description: dict.servicesPage.areas[area.id as keyof typeof dict.servicesPage.areas]?.shortDesc || area.shortDescription,
  };
}

export default async function PracticeAreaPage({ params }: PracticeAreaPageProps) {
  const { slug, locale } = await params;
  const area = getPracticeAreaBySlug(slug);
  const dict = await getDictionary(locale as 'id' | 'en');

  if (!area) {
    notFound();
  }

  // @ts-ignore - dynamic icon lookup
  const Icon = LucideIcons[area.icon];

  return (
    <>
      <PageHero
        title={dict.servicesPage.areas[area.id as keyof typeof dict.servicesPage.areas]?.title || area.title}
        description={dict.servicesPage.areas[area.id as keyof typeof dict.servicesPage.areas]?.shortDesc || area.shortDescription}
      />

      <SectionWrapper background="white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            
            {/* Main Content */}
            <div className="lg:col-span-8">
              <Link
                href={`/${locale}/layanan`}
                className="mb-8 inline-flex items-center text-sm font-semibold text-gold-600 transition-colors hover:text-gold-500"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {locale === 'en' ? 'Back to All Services' : 'Kembali ke Semua Layanan'}
              </Link>

              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-navy-50 text-navy-950">
                  {Icon && <Icon className="h-8 w-8" />}
                </div>
                <h2 className="font-heading text-3xl font-bold text-navy-950 md:text-4xl">
                  {dict.servicesPage.areas[area.id as keyof typeof dict.servicesPage.areas]?.title || area.title}
                </h2>
              </div>

              <div className="prose prose-lg prose-gray max-w-none text-justify">
                {String(dict.servicesPage.areas[area.id as keyof typeof dict.servicesPage.areas]?.fullDesc || "").split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-600 leading-relaxed mb-4 indent-8">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-12">
                <h3 className="font-heading text-2xl font-bold text-navy-950 mb-6">
                  {locale === 'en' ? 'Core Service Focus' : 'Fokus Layanan Utama'}
                </h3>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {area.keyServices.map((service, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-gold-500" />
                      <span className="text-gray-600 font-medium">{dict.servicesPage.areas[area.id as keyof typeof dict.servicesPage.areas]?.keyServices[index]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 rounded-2xl border border-gray-100 bg-cream-50 p-8 shadow-sm">
                <h3 className="font-heading text-xl font-bold text-navy-950 mb-6">
                  {locale === 'en' ? 'Other Services' : 'Layanan Lainnya'}
                </h3>
                <ul className="space-y-3">
                  {practiceAreas
                    .filter((p) => p.id !== area.id)
                    .map((otherArea) => (
                      <li key={otherArea.id}>
                        <Link
                          href={`/${locale}/layanan/${otherArea.slug}`}
                          className="group flex items-center justify-between rounded-lg border border-transparent bg-white px-4 py-3 text-sm font-medium text-gray-600 shadow-sm transition-all hover:border-gold-300 hover:text-navy-950"
                        >
                          {dict.servicesPage.areas[otherArea.id as keyof typeof dict.servicesPage.areas]?.title || otherArea.title}
                          <ArrowRight className="h-4 w-4 text-gray-400 transition-colors group-hover:text-gold-500" />
                        </Link>
                      </li>
                    ))}
                </ul>

                <div className="mt-8 border-t border-gray-200 pt-8">
                  <h3 className="font-heading text-xl font-bold text-navy-950 mb-4">
                    {locale === 'en' ? 'Quick Consultation' : 'Konsultasi Cepat'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    {locale === 'en' 
                      ? 'Discuss your legal needs with our expert team to find the right solution.' 
                      : 'Diskusikan kebutuhan hukum Anda dengan tim ahli kami untuk mendapatkan solusi yang tepat.'}
                  </p>
                  <Link href={`/${locale}/kontak`}>
                    <Button className="w-full bg-gold-600 text-navy-950 hover:bg-gold-500">
                      {locale === 'en' ? 'Contact Us' : 'Hubungi Kami'}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
          </div>
        </Container>
      </SectionWrapper>

      <CTA dict={dict} locale={locale} />
    </>
  );
}
