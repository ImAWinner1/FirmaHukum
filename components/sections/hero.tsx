"use client";

import Link from "next/link";
import Image from "next/image";
import { Shield, Award, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";
import type { Dictionary } from "@/dictionaries/id";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Komponen bagian Pahlawan (Hero), sebagai area penarik perhatian visual utama di beranda (homepage).
 * Menampilkan latar belakang biru dongker (navy) penuh dengan judul utama, tombol aksi (CTA), dan indikator kepercayaan.
 */
export function Hero({ dict, locale }: { dict: Dictionary; locale: string }) {
  const trustIndicators = [
    {
      icon: Shield,
      label: dict.hero.trust.integrity.title,
      description: dict.hero.trust.integrity.desc,
    },
    {
      icon: Award,
      label: dict.hero.trust.professional.title,
      description: dict.hero.trust.professional.desc,
    },
    {
      icon: Heart,
      label: dict.hero.trust.dedication.title,
      description: dict.hero.trust.dedication.desc,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-navy-950 pt-20 md:pt-24 lg:min-h-screen">
      {/* Background Image (Responsive) */}
      <div className="absolute inset-0 lg:top-8 lg:left-auto lg:w-[65%] opacity-60 lg:opacity-100">
        <Image
          src="/images/hero-statue.png"
          alt="Simbol Keadilan"
          fill
          className="object-cover object-bottom sm:object-contain sm:object-right-bottom"
          priority
        />
        {/* Mobile specific dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-navy-950/50 lg:hidden" />
        {/* Gradients to blend image into the navy background */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/70 to-transparent lg:via-navy-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent lg:via-transparent" />
      </div>

      <Container className="relative z-10 w-full">
        <div className="py-16 md:py-20 lg:w-[55%] lg:py-28 lg:pr-8">
          {/* Left column - Content */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-gold-500">
              {dict.hero.tagline}
            </p>

            {/* Headline */}
            <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[3.5rem]">
              {dict.hero.headline}{" "}
              <span className="text-gold-500">
                {dict.hero.headlineHighlight}
              </span>{" "}
              {dict.hero.headlineEnd}
            </h1>

            {/* Supporting copy */}
            <p className="mt-6 max-w-lg text-base leading-relaxed text-gray-300 md:text-lg">
              {dict.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={`/${locale}/kontak`}>
                <Button
                  size="lg"
                  className="bg-gold-600 px-6 text-sm font-semibold text-navy-950 hover:bg-gold-500"
                >
                  {dict.hero.cta1}
                </Button>
              </Link>
              <Link href={`/${locale}/layanan`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 bg-transparent px-6 text-sm font-semibold text-white hover:border-gold-500 hover:bg-gold-600/10 hover:text-gold-400"
                >
                  {dict.hero.cta2}
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap gap-6 border-t border-navy-700/50 pt-8 md:gap-8">
              {trustIndicators.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-navy-700/50 bg-navy-800/30 backdrop-blur-sm">
                    <item.icon className="h-5 w-5 text-gold-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
