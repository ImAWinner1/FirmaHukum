"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Linkedin } from "@/components/shared/social-icons";
import { Container } from "@/components/shared/container";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedElement } from "@/components/shared/animated-element";
import { Button } from "@/components/ui/button";
import { teamMembers } from "@/lib/data/team-members";
import type { Dictionary } from "@/dictionaries/id";

export function TeamPreview({ dict, locale }: { dict: Dictionary; locale: string }) {
  // Only show the top 4 members for the homepage preview
  const previewMembers = teamMembers.slice(0, 4);

  return (
    <SectionWrapper background="navy" className="relative overflow-hidden">
      {/* Decorative background grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px"
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {previewMembers.map((member, index) => (
            <AnimatedElement
              key={member.id}
              variant="fadeUp"
              delay={0.1 * index}
            >
              <div className="group relative overflow-hidden rounded-xl bg-navy-900 border border-navy-700/50 transition-all duration-300 hover:border-gold-600/50 hover:shadow-2xl hover:shadow-gold-600/10">
                {/* Image Container */}
                <div className="aspect-[3/4] w-full overflow-hidden bg-navy-950">
                  {/* Using a solid color placeholder since we don't have actual images yet */}
                  <div className="h-full w-full bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                    <span className="text-4xl font-heading font-bold text-navy-700">
                      {member.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950 via-navy-950/90 to-transparent p-6 pt-12">
                  <h3 className="font-heading text-lg font-bold text-white transition-colors group-hover:text-gold-500">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-gold-600">
                    {dict.teamPage.members[member.id as keyof typeof dict.teamPage.members]?.title}
                  </p>
                  <p className="mt-2 text-xs text-gray-400 line-clamp-1">
                    {dict.teamPage.members[member.id as keyof typeof dict.teamPage.members]?.spec}
                  </p>

                  <div className="mt-4 flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
            </AnimatedElement>
          ))}
        </div>

        <AnimatedElement variant="fadeUp" className="mt-12 text-center">
          <Link href={`/${locale}/tim`}>
            <Button size="lg" variant="outline" className="border-gray-600 bg-transparent px-8 py-6 text-base font-semibold text-white hover:border-gold-500 hover:bg-gold-600/10 hover:text-gold-400">
              {dict.team.seeAll}
            </Button>
          </Link>
        </AnimatedElement>
      </Container>
    </SectionWrapper>
  );
}
