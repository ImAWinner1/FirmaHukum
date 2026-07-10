"use client";

import { useMemo } from "react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedElement } from "@/components/shared/animated-element";
import { practiceAreas } from "@/lib/data/practice-areas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Dictionary } from "@/dictionaries/id";

export function PracticeAreas({ dict, locale }: { dict: Dictionary; locale: string }) {
  const iconMap = useMemo(() => {
    const map: Record<string, React.ElementType> = {};
    practiceAreas.forEach((area) => {
      // @ts-ignore - dynamic icon lookup
      const Icon = LucideIcons[area.icon];
      if (Icon) map[area.icon] = Icon;
    });
    return map;
  }, []);

  const getAreaDict = (id: string) => {
    switch(id) {
      case "hukum-korporasi": return dict.practiceAreas.corporate;
      case "hukum-perdata": return dict.practiceAreas.civil;
      case "hukum-pidana": return dict.practiceAreas.criminal;
      case "hukum-ketenagakerjaan": return dict.practiceAreas.employment;
      case "hukum-properti": return dict.practiceAreas.property;
      case "hukum-keluarga": return dict.practiceAreas.family;
      default: return null;
    }
  }

  return (
    <SectionWrapper background="cream" id="layanan">
      <Container>
        <AnimatedElement variant="fadeUp">
          <SectionHeading
            eyebrow={dict.services.badge}
            title={dict.services.title}
            description={dict.services.description}
          />
        </AnimatedElement>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, index) => {
            const Icon = iconMap[area.icon];
            const areaDict = getAreaDict(area.id);
            if (!areaDict) return null;

            return (
              <AnimatedElement
                key={area.id}
                variant="fadeUp"
                delay={index * 0.1}
                className="h-full"
              >
                <Link href={`/${locale}/layanan/${area.slug}`} className="block h-full">
                  <Card className="group h-full flex flex-col border-gray-200 bg-white transition-all duration-300 hover:border-gold-300 hover:shadow-xl hover:shadow-gold-900/5">
                    <CardHeader>
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50 text-navy-700 transition-colors group-hover:bg-gold-50 group-hover:text-gold-600">
                        {Icon && <Icon className="h-6 w-6" />}
                      </div>
                      <CardTitle className="font-heading text-xl leading-tight text-navy-950 transition-colors group-hover:text-gold-600 min-h-[50px] flex items-start">
                        {areaDict.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-1">
                      <CardDescription className="line-clamp-3 text-sm leading-relaxed text-gray-500 text-justify min-h-[70px]">
                        {areaDict.desc}
                      </CardDescription>
                      <div className="mt-auto pt-6 flex items-center text-sm font-semibold text-gold-600 transition-all duration-300">
                        {dict.services.learnMore}
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedElement>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}
