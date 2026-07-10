import { getDictionary } from "@/lib/dictionary";
import { Metadata } from "next";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared";
import { SectionWrapper } from "@/components/shared";
import { PageHero } from "@/components/shared";
import { CTA } from "@/components/sections";
import { practiceAreas } from "@/lib/data/practice-areas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Layanan Kami",
  description:
    "Eksplorasi spektrum lengkap layanan hukum komersial, perdata, dan pidana yang kami sediakan untuk individu dan korporasi.",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "id" | "en");

  return (
    <>
      <PageHero
        title={dict.servicesPage.heroTitle}
        description={dict.servicesPage.heroDesc}
      />

      <SectionWrapper background="white">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {practiceAreas.map((area) => {
              /** @ts-ignore - pencarian ikon secara dinamis berdasarkan nama string */
              const Icon = LucideIcons[area.icon];

              return (
                <Link
                  key={area.id}
                  href={`/${locale}/layanan/${area.slug}`}
                  className="block h-full group"
                >
                  <Card className="h-full border-gray-200 bg-white transition-all duration-300 hover:border-gold-300 hover:shadow-xl hover:shadow-gold-900/5">
                    <CardHeader>
                      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-navy-50 text-navy-700 transition-colors group-hover:bg-gold-50 group-hover:text-gold-600 shrink-0">
                        {Icon && <Icon className="h-7 w-7" />}
                      </div>
                      <CardTitle className="font-heading text-2xl leading-tight text-navy-950 transition-colors group-hover:text-gold-600 min-h-[64px] flex items-start">
                        <span className="line-clamp-2">
                          {
                            dict.servicesPage.areas[
                              area.id as keyof typeof dict.servicesPage.areas
                            ]?.title
                          }
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                      <CardDescription className="text-base leading-relaxed text-gray-600 mb-6 text-justify min-h-[104px]">
                        <span className="line-clamp-4">
                          {
                            dict.servicesPage.areas[
                              area.id as keyof typeof dict.servicesPage.areas
                            ]?.shortDesc
                          }
                        </span>
                      </CardDescription>

                      <div className="space-y-2 mb-8">
                        {area.keyServices.slice(0, 3).map((service, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-sm text-gray-500 text-left"
                          >
                            <span className="text-gold-500 font-bold mt-0.5">
                              •
                            </span>
                            <span className="line-clamp-1">
                              {
                                dict.servicesPage.areas[
                                  area.id as keyof typeof dict.servicesPage.areas
                                ]?.keyServices[idx]
                              }
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center text-sm font-bold text-navy-700 transition-colors group-hover:text-gold-600 mt-auto">
                        {dict.servicesPage.learnMore}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </SectionWrapper>

      <CTA dict={dict} locale={locale} />
    </>
  );
}
