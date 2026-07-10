"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Linkedin } from "@/components/shared";
import { Container } from "@/components/shared";
import { SectionWrapper } from "@/components/shared";
import { SectionHeading } from "@/components/shared";
import { AnimatedElement } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { teamMembers } from "@/lib/data/team-members";
import type { Dictionary } from "@/dictionaries/id";

export function TeamPreview({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: string;
}) {
  // Use all teamMembers for the marquee slider

  return (
    <SectionWrapper background="navy" className="relative overflow-hidden">
      {/* Decorative background grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <Container className="relative z-10">
        <AnimatedElement variant="fadeUp">
          <SectionHeading
            eyebrow={dict.team.badge}
            title={dict.team.title}
            description={dict.team.description}
            dark
          />
        </AnimatedElement>

        <div className="group relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4 gap-6">
          {/* First Marquee Set */}
          <div className="flex shrink-0 animate-marquee gap-6 group-hover:[animation-play-state:paused]">
            {teamMembers.map((member) => (
              <div
                key={`set1-${member.id}`}
                className="w-[280px] md:w-[300px] shrink-0 h-full"
              >
                <div className="group/card relative overflow-hidden rounded-xl bg-navy-900 border border-navy-700/50 transition-all duration-300 hover:border-gold-600/50 hover:shadow-2xl hover:shadow-gold-600/10">
                  {/* Image Container */}
                  <div className="aspect-[3/4] w-full overflow-hidden bg-navy-950 relative">
                    <Image
                      src={member.imagePlaceholder}
                      alt={member.name}
                      fill
                      className="object-cover object-center opacity-70 transition-transform duration-500 group-hover/card:scale-105 group-hover/card:opacity-100"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950 via-navy-950/90 to-transparent p-6 pt-12">
                    <div className="h-[3.5rem] mb-1 flex items-center">
                      <h3 className="font-heading text-lg font-bold text-white transition-colors group-hover/card:text-gold-500 line-clamp-2">
                        {member.name}
                      </h3>
                    </div>
                    <div className="h-[1.5rem] flex items-center">
                      <p className="text-sm font-medium text-gold-600 line-clamp-1">
                        {
                          dict.teamPage.members[
                            member.id as keyof typeof dict.teamPage.members
                          ]?.title
                        }
                      </p>
                    </div>
                    <div className="h-[1.5rem] mt-1 flex items-center">
                      <p className="text-xs text-gray-400 line-clamp-1">
                        {
                          dict.teamPage.members[
                            member.id as keyof typeof dict.teamPage.members
                          ]?.spec
                        }
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
                      <span className="text-xs font-semibold text-white flex items-center">
                        Profil Lengkap <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                      <a
                        href={member.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold-600 hover:text-navy-950"
                        aria-label={`LinkedIn ${member.name}`}
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Second Marquee Set */}
          <div
            className="flex shrink-0 animate-marquee gap-6 group-hover:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {teamMembers.map((member) => (
              <div
                key={`set2-${member.id}`}
                className="w-[280px] md:w-[300px] shrink-0 h-full"
              >
                <div className="group/card relative overflow-hidden rounded-xl bg-navy-900 border border-navy-700/50 transition-all duration-300 hover:border-gold-600/50 hover:shadow-2xl hover:shadow-gold-600/10">
                  {/* Image Container */}
                  <div className="aspect-[3/4] w-full overflow-hidden bg-navy-950 relative">
                    <Image
                      src={member.imagePlaceholder}
                      alt={member.name}
                      fill
                      className="object-cover object-center opacity-70 transition-transform duration-500 group-hover/card:scale-105 group-hover/card:opacity-100"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950 via-navy-950/90 to-transparent p-6 pt-12">
                    <div className="h-[3.5rem] mb-1 flex items-center">
                      <h3 className="font-heading text-lg font-bold text-white transition-colors group-hover/card:text-gold-500 line-clamp-2">
                        {member.name}
                      </h3>
                    </div>
                    <div className="h-[1.5rem] flex items-center">
                      <p className="text-sm font-medium text-gold-600 line-clamp-1">
                        {
                          dict.teamPage.members[
                            member.id as keyof typeof dict.teamPage.members
                          ]?.title
                        }
                      </p>
                    </div>
                    <div className="h-[1.5rem] mt-1 flex items-center">
                      <p className="text-xs text-gray-400 line-clamp-1">
                        {
                          dict.teamPage.members[
                            member.id as keyof typeof dict.teamPage.members
                          ]?.spec
                        }
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
                      <span className="text-xs font-semibold text-white flex items-center">
                        Profil Lengkap <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                      <a
                        href={member.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold-600 hover:text-navy-950"
                        aria-label={`LinkedIn ${member.name}`}
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <AnimatedElement variant="fadeUp" className="mt-12 text-center">
          <Link href={`/${locale}/tim`}>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 bg-transparent px-8 py-6 text-base font-semibold text-white hover:border-gold-500 hover:bg-gold-600/10 hover:text-gold-400"
            >
              {dict.team.seeAll}
            </Button>
          </Link>
        </AnimatedElement>
      </Container>
    </SectionWrapper>
  );
}
