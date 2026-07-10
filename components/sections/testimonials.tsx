"use client";

import { Star, Quote } from "lucide-react";
import { Container } from "@/components/shared";
import { SectionWrapper } from "@/components/shared";
import { SectionHeading } from "@/components/shared";
import { AnimatedElement } from "@/components/shared";
import { Card, CardContent } from "@/components/ui/card";
import type { Dictionary } from "@/dictionaries/id";

export function Testimonials({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: string;
}) {
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

        <div className="group relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4 gap-6">
          {/* Set marquee pertama */}
          <div className="flex shrink-0 animate-marquee gap-6 group-hover:[animation-play-state:paused]">
            {[...dict.testimonials.items, ...dict.testimonials.items].map(
              (item, index) => (
                <div
                  key={`set1-${item.id}-${index}`}
                  className="w-[320px] md:w-[400px] shrink-0 h-full"
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

                      <div className="mt-auto border-t border-gray-100 pt-6 flex items-center gap-4">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-gold-200">
                          <img
                            src={item.image}
                            alt={item.author}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <p className="font-heading font-bold text-navy-950">
                            {item.author}
                          </p>
                          <p className="text-sm font-medium text-gold-600">
                            {item.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            )}
          </div>

          {/* Set marquee kedua (untuk efek looping tanpa jeda) */}
          <div
            className="flex shrink-0 animate-marquee gap-6 group-hover:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {[...dict.testimonials.items, ...dict.testimonials.items].map(
              (item, index) => (
                <div
                  key={`set2-${item.id}-${index}`}
                  className="w-[320px] md:w-[400px] shrink-0 h-full"
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

                      <div className="mt-auto border-t border-gray-100 pt-6 flex items-center gap-4">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-gold-200">
                          <img
                            src={item.image}
                            alt={item.author}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <p className="font-heading font-bold text-navy-950">
                            {item.author}
                          </p>
                          <p className="text-sm font-medium text-gold-600">
                            {item.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            )}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
