"use client";

import { Container } from "@/components/shared/container";
import { AnimatedElement } from "@/components/shared/animated-element";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  description: string;
  eyebrow?: string;
  /** Optional background image path */
  backgroundImage?: string;
  /** Add extra padding at the bottom if needed */
  className?: string;
}

/**
 * Reusable hero section for interior pages.
 * Features a dark navy gradient background and optional background image.
 */
export function PageHero({
  title,
  description,
  eyebrow,
  backgroundImage,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-navy-950 pb-16 pt-32 md:pb-24 md:pt-40 lg:pb-32 lg:pt-48",
        className
      )}
    >
      {/* Background Image / Gradient */}
      <div className="absolute inset-0 z-0">
        {backgroundImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/40" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950" />
            <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-gold-600/[0.03] to-transparent" />
            <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] bg-center opacity-10 mix-blend-overlay" />
          </>
        )}
      </div>

      <Container className="relative z-10">
        <AnimatedElement variant="fadeUp" className="max-w-3xl">
          {eyebrow && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-600/30 bg-gold-600/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-gold-500 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              {eyebrow}
            </div>
          )}
          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-gray-400 md:text-lg lg:text-xl">
            {description}
          </p>
        </AnimatedElement>
      </Container>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-600/30 to-transparent" />
    </section>
  );
}
