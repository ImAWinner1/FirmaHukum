import { getDictionary } from "@/lib/dictionary";
import { Container } from "@/components/shared/container";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: "id" | "en" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: `${dict.privacyPolicy.title} | Firma Hukum`,
    description: dict.privacyPolicy.sections.introduction.content[0],
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const privacy = dict.privacyPolicy;

  return (
    <div className="bg-navy-950 py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 border-b border-navy-700 pb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {privacy.title}
            </h1>
            <p className="mt-4 text-sm text-gold-500">{privacy.lastUpdated}</p>
          </div>

          <div className="prose prose-invert prose-gold max-w-none">
            {Object.entries(privacy.sections).map(([key, section]) => (
              <div key={key} className="mb-10">
                <h2 className="text-xl font-semibold text-white mb-4">
                  {section.title}
                </h2>
                <div className="space-y-4 text-gray-300 text-justify">
                  {section.content.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  {/* @ts-ignore - Some sections have items, some don't */}
                  {section.items && (
                    <ul className="list-disc pl-5 mt-4 space-y-2">
                      {/* @ts-ignore */}
                      {section.items.map((item: string, index: number) => (
                        <li key={index} className="text-gray-300">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
