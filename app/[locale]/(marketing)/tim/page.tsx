import { getDictionary } from "@/lib/dictionary";
import { Metadata } from "next";
import Image from "next/image";
import { Linkedin } from "@/components/shared";
import { Container } from "@/components/shared";
import { SectionWrapper } from "@/components/shared";
import { PageHero } from "@/components/shared";
import { CTA } from "@/components/sections";
import { teamMembers } from "@/lib/data/team-members";
import { AnimatedElement } from "@/components/shared";

export const metadata: Metadata = {
  title: "Tim Kami",
  description:
    "Kenali profil dan keahlian tim pengacara profesional kami yang siap memberikan pendampingan hukum terbaik untuk Anda.",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TeamPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "id" | "en");

  return (
    <>
      <PageHero
        title={dict.teamPage.heroTitle}
        description={dict.teamPage.heroDesc}
      />

      <SectionWrapper background="white">
        <Container className="max-w-[1400px]">
          <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <AnimatedElement
                key={member.id}
                variant="fadeUp"
                delay={0.1 * index}
              >
                <div className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:border-gold-300 hover:shadow-xl hover:shadow-gold-900/5 h-full flex flex-col">
                  {/* Image Container */}
                  <div className="aspect-[4/5] w-full overflow-hidden bg-navy-900 relative">
                    <Image
                      src={member.imagePlaceholder}
                      alt={member.name}
                      fill
                      className="object-cover object-center opacity-70 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="h-[3.5rem] md:h-[4rem] mb-1 flex items-center">
                        <h3 className="font-heading text-xl md:text-2xl font-bold text-white line-clamp-2">
                          {member.name}
                        </h3>
                      </div>
                      <div className="h-[1.5rem] flex items-center">
                        <p className="text-gold-500 font-medium line-clamp-1 text-sm md:text-base">
                          {
                            dict.teamPage.members[
                              member.id as keyof typeof dict.teamPage.members
                            ]?.title
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4 pb-4 border-b border-gray-100 flex-grow">
                      <p className="text-sm font-semibold text-navy-900 uppercase tracking-wider mb-2">
                        {dict.teamPage.specialization}
                      </p>
                      <div className="h-[1.5rem] mb-3 flex items-center">
                        <p className="text-gray-600 font-medium line-clamp-1">
                          {/* @ts-ignore */}
                          {dict.teamPage.members[member.id]?.spec}
                        </p>
                      </div>
                      <div className="h-[3.75rem] flex items-start">
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                          {/* @ts-ignore */}
                          {dict.teamPage.members[member.id]?.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <p className="text-sm font-medium text-gray-500">
                        {
                          dict.teamPage.members[
                            member.id as keyof typeof dict.teamPage.members
                          ]?.exp
                        }
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
