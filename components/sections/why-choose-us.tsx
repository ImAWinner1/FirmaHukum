"use client";

import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/shared";
import { SectionWrapper } from "@/components/shared";
import { SectionHeading } from "@/components/shared";
import { AnimatedElement } from "@/components/shared";
import type { Dictionary } from "@/dictionaries/id";

export function WhyChooseUs({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: string;
}) {
  const reasons = dict.whyChooseUs.features;

  return (
    <SectionWrapper background="white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24 items-center">
          {/* Left Column - Image */}
          <AnimatedElement
            variant="fadeRight"
            className="relative w-full aspect-[3/4] md:aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[600px] overflow-hidden rounded-2xl bg-navy-900"
          >
            {/* Portrait of Rizky Maulana Malik Ibrahim */}
            <Image
              src="/images/team/Rizky Maulana Malik Ibrahim-v4.png"
              alt="Rizky Maulana Malik Ibrahim"
              fill
              className="absolute inset-0 object-cover object-bottom opacity-80 transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 rounded-xl border border-white/10 bg-white/10 p-4 sm:p-6 backdrop-blur-md">
              <p className="font-heading text-lg sm:text-xl font-medium italic text-white">
                {dict.whyChooseUs.quote}
              </p>
              <div className="mt-3 sm:mt-4 flex items-center gap-3">
                <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-full border-2 border-gold-600">
                  <Image
                    src="/images/team/Rizky Maulana Malik Ibrahim-v4.png"
                    alt={dict.whyChooseUs.quoteAuthor}
                    fill
                    className="object-cover object-top"
                    sizes="120px"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {dict.whyChooseUs.quoteAuthor}
                  </p>
                  <p className="text-xs text-gold-500 line-clamp-1">
                    {dict.whyChooseUs.quoteRole}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedElement>

          {/* Right Column - Content */}
          <div>
            <AnimatedElement variant="fadeLeft">
              <SectionHeading
                eyebrow={dict.whyChooseUs.badge}
                title={dict.whyChooseUs.title}
                description={dict.whyChooseUs.description}
                align="left"
              />
            </AnimatedElement>

            <div className="mt-8 space-y-8">
              {reasons.map((reason, index) => (
                <AnimatedElement
                  key={reason.title}
                  variant="fadeUp"
                  delay={0.1 + index * 0.1}
                  className="flex gap-4"
                >
                  <div className="mt-1 shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy-950">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-gray-600">
                      {reason.description}
                    </p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
