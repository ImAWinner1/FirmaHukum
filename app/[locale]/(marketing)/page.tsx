import { Hero } from "@/components/sections";
import { Statistics } from "@/components/sections";
import { PracticeAreas } from "@/components/sections";
import { WhyChooseUs } from "@/components/sections";
import { TeamPreview } from "@/components/sections";
import { Testimonials } from "@/components/sections";
import { CTA } from "@/components/sections";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Hero dict={dict} locale={locale} />
      <Statistics dict={dict} locale={locale} />
      <PracticeAreas dict={dict} locale={locale} />
      <WhyChooseUs dict={dict} locale={locale} />
      <TeamPreview dict={dict} locale={locale} />
      <Testimonials dict={dict} locale={locale} />
      <CTA dict={dict} locale={locale} />
    </>
  );
}
