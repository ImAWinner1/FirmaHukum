"use client";

import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedElement } from "@/components/shared/animated-element";
import type { Dictionary } from "@/dictionaries/id";

export function WhyChooseUs({ dict, locale }: { dict: Dictionary; locale: string }) {
  const reasons = dict.whyChooseUs.features;

  return (
    <SectionWrapper background="white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24 items-center">
          {/* Left Column - Image */}
          <AnimatedElement variant="fadeRight" className="relative h-full min-h-[400px] lg:min-h-[600px] w-full overflow-hidden rounded-2xl bg-navy-900">
            {/* Visual Placeholder for Law Firm Office/Team */}
            <div className="absolute inset-0 bg-[url('/images/placeholder/office.jpg')] bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity transition-opacity duration-500 hover:opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8 rounded-xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
              <p className="font-heading text-xl font-medium italic text-white">
                "Kepercayaan klien adalah aset paling berharga yang kami jaga melalui dedikasi dan keunggulan profesional."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gold-600/20 flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full bg-gold-600 flex items-center justify-center font-bold text-navy-950">
                    AP
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Dr. Andi Pratama</p>
                  <p className="text-xs text-gold-500">Managing Partner</p>
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
