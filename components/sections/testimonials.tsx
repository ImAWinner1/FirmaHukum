"use client";

import { Star, Quote } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedElement } from "@/components/shared/animated-element";
import { Card, CardContent } from "@/components/ui/card";
import type { Dictionary } from "@/dictionaries/id";

const testimonials = [
  {
    id: 1,
    content: "Pendampingan hukum yang luar biasa. Tim sangat profesional dan responsif dalam menangani sengketa kontrak perusahaan kami hingga selesai dengan hasil memuaskan.",
    author: "Budi Santoso",
    role: "CEO, PT Maju Bersama",
    rating: 5,
  },
  {
    id: 2,
    content: "Sangat terbantu dengan keahlian mereka dalam hukum properti. Proses akuisisi lahan yang tadinya rumit menjadi jauh lebih aman dan terstruktur.",
    author: "Siti Rahmawati",
    role: "Direktur Pengembangan",
    rating: 5,
  },
  {
    id: 3,
    content: "Layanan konsultasi ketenagakerjaan yang diberikan sangat solutif. Mereka benar-benar memahami dinamika bisnis dan menyeimbangkannya dengan kepatuhan hukum.",
    author: "Hendrik Gunawan",
    role: "HR Director",
    rating: 5,
  },
];

export function Testimonials({ dict, locale }: { dict: Dictionary; locale: string }) {
  return (
    <SectionWrapper background="cream">
      <Container>
        <AnimatedElement variant="fadeUp">
          <SectionHeading
            eyebrow={dict.testimonials.badge}
            title={dict.testimonials.title}
            description={dict.testimonials.description}
          />
        </AnimatedElement>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <AnimatedElement
              key={item.id}
              variant="fadeUp"
              delay={0.1 * index}
              className="h-full"
            >
              <Card className="relative h-full flex flex-col border-gray-200 bg-white transition-all duration-300 hover:border-gold-300 hover:shadow-lg">
                <CardContent className="p-8 flex flex-col flex-1">
                  <Quote className="absolute right-6 top-6 h-10 w-10 text-gold-600/10" />
                  
                  <div className="mb-6 flex gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-gold-500 text-gold-500"
                      />
                    ))}
                  </div>
                  
                  <p className="mb-6 text-base leading-relaxed text-gray-600">
                    "{item.content}"
                  </p>
                  
                  <div className="mt-auto border-t border-gray-100 pt-6">
                    <p className="font-heading font-bold text-navy-950">
                      {item.author}
                    </p>
                    <p className="text-sm font-medium text-gold-600">
                      {item.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedElement>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
