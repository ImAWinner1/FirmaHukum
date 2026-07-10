"use client";

import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { AnimatedElement } from "@/components/shared/animated-element";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data/site-config";
import type { Dictionary } from "@/dictionaries/id";

export function CTA({ dict, locale }: { dict: Dictionary; locale: string }) {
  return (
    <SectionWrapper background="navy" className="relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-0 right-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-gold-600/10 blur-[100px]" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] translate-y-1/2 -translate-x-1/3 rounded-full bg-gold-600/10 blur-[100px]" />

      <Container className="relative z-10 text-center">
        <AnimatedElement variant="fadeUp" className="mx-auto max-w-3xl">
          <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
            {dict.cta.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-gray-400 md:text-lg">
            {dict.cta.description}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link href={`/${locale}/kontak`}>
              <Button
                size="lg"
                className="w-full bg-gold-600 px-8 py-6 text-base font-semibold text-navy-950 hover:bg-gold-500 sm:w-auto"
              >
                {dict.cta.button1}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-gray-600 bg-transparent px-8 py-6 text-base font-semibold text-white hover:border-gold-500 hover:bg-gold-600/10 hover:text-gold-400 sm:w-auto"
              >
                <PhoneCall className="mr-2 h-5 w-5 text-gold-500" />
                {dict.cta.button2}
              </Button>
            </a>
          </div>
        </AnimatedElement>
      </Container>
    </SectionWrapper>
  );
}
