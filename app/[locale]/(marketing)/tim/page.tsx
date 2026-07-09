import { getDictionary } from '@/lib/dictionary';
import { Metadata } from "next";
import { Linkedin } from "@/components/shared/social-icons";
import { Container } from "@/components/shared/container";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { PageHero } from "@/components/shared/page-hero";
import { CTA } from "@/components/sections/cta";
import { teamMembers } from "@/lib/data/team-members";
import { AnimatedElement } from "@/components/shared/animated-element";

export const metadata: Metadata = {
  title: "Tim Kami",
  description: "Kenali profil dan keahlian tim pengacara profesional kami yang siap memberikan pendampingan hukum terbaik untuk Anda.",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TeamPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as 'id' | 'en');

  return (
    <>
      <PageHero
        title={dict.teamPage.heroTitle}
        description={dict.teamPage.heroDesc}
      />

      <SectionWrapper background="white">
        <Container>
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <AnimatedElement
                key={member.id}
                variant="fadeUp"
                delay={0.1 * index}
              >
                <div className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:border-gold-300 hover:shadow-xl hover:shadow-gold-900/5">
                  {/* Image Container */}
                  <div className="aspect-[4/5] w-full overflow-hidden bg-navy-900 relative">
                    {/* Placeholder image representation */}
                    <div className="absolute inset-0 bg-[url('/images/placeholder/portrait.jpg')] bg-cover bg-center opacity-40 mix-blend-luminosity transition-transform duration-500 group-hover:scale-105 group-hover:opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
                    
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="font-heading text-2xl font-bold text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-gold-500 font-medium">
                        {dict.teamPage.members[member.id as keyof typeof dict.teamPage.members]?.title}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4 pb-4 border-b border-gray-100">
                      <p className="text-sm font-semibold text-navy-900 uppercase tracking-wider mb-1">
                        {dict.teamPage.specialization}
                      </p>
                      <p className="text-gray-600">
                        {dict.teamPage.members[member.id as keyof typeof dict.teamPage.members]?.spec}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-500">
                        {dict.teamPage.members[member.id as keyof typeof dict.teamPage.members]?.exp}
                      </p>
                      <a
                        href={member.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy-50 text-navy-700 transition-colors hover:bg-[#0A66C2] hover:text-white"
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
        </Container>
      </SectionWrapper>

      <CTA dict={dict} locale={locale} />
    </>
  );
}
