"use client";

import { useMemo } from "react";
import * as LucideIcons from "lucide-react";
import { Container } from "@/components/shared";
import { SectionWrapper } from "@/components/shared";
import { AnimatedElement } from "@/components/shared";
import { statistics } from "@/lib/data/statistics";
import type { Dictionary } from "@/dictionaries/id";

/**
 * Batang statistik yang menampilkan metrik pencapaian utama (key metrics) firma.
 * Menggunakan latar belakang putih dengan batas tepi (border) tipis, menumpuk secara visual di atas Hero.
 */
export function Statistics({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: string;
}) {
  // Memoize icon mapping to avoid repeated lookups
  const iconMap = useMemo(() => {
    const map: Record<string, React.ElementType> = {};
    statistics.forEach((stat) => {
      // @ts-ignore - dynamic icon lookup
      const Icon = LucideIcons[stat.icon];
      if (Icon) map[stat.icon] = Icon;
    });
    return map;
  }, []);

  const getStatLabel = (statLabel: string) => {
    switch (statLabel) {
      case "Tahun Pengalaman":
        return dict.statistics.yearsOfExperience;
      case "Klien Terlayani":
        return dict.statistics.clientsServed;
      case "Tingkat Keberhasilan":
        return dict.statistics.successRate;
      case "Klien Korporasi":
        return dict.statistics.corporateClients;
      default:
        return statLabel;
    }
  };

  return (
    <SectionWrapper
      background="white"
      className="border-b border-gray-100 pb-12 pt-16 md:pb-16 md:pt-20"
    >
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4 lg:gap-8">
          {statistics.map((stat, index) => {
            const Icon = iconMap[stat.icon];

            return (
              <AnimatedElement
                key={stat.label}
                variant="fadeUp"
                delay={index * 0.1}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream-50 text-gold-600 transition-colors hover:bg-gold-50 md:h-16 md:w-16">
                  {Icon && <Icon className="h-6 w-6 md:h-8 md:w-8" />}
                </div>
                <div className="flex items-baseline justify-center font-heading text-4xl font-bold tracking-tight text-navy-950 md:text-5xl lg:text-[3.5rem]">
                  {stat.value}
                  <span className="text-2xl text-gold-500 md:text-3xl">
                    {stat.suffix}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-500 md:text-base">
                  {getStatLabel(stat.label)}
                </p>
              </AnimatedElement>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}
