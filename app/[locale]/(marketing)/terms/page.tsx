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
    title: `${dict.termsConditions.title} | Firma Hukum`,
    description: dict.termsConditions.sections.acceptance.content[0],
  };
}

export default async function TermsConditionsPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const terms = dict.termsConditions;

  return (
    <div className="bg-navy-950 py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 border-b border-navy-700 pb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {terms.title}
            </h1>
            <p className="mt-4 text-sm text-gold-500">{terms.lastUpdated}</p>
          </div>

          <div className="prose prose-invert prose-gold max-w-none">
            {Object.entries(terms.sections).map(([key, section]) => (
              <div key={key} className="mb-10">
                <h2 className="text-xl font-semibold text-white mb-4">
                  {section.title}
                </h2>
                <div className="space-y-4 text-gray-300 text-justify">
                  {section.content.map((paragraph, index) => {
                    // For specific legal clauses, make them all caps/bold if they are critical
                    const isCritical =
                      key === "noAttorneyClient" ||
                      key === "limitationLiability";

                    return (
                      <p
                        key={index}
                        className={`leading-relaxed ${
                          isCritical && index === 0
                            ? "font-semibold text-gray-200"
                            : ""
                        }`}
                      >
                        {paragraph.includes("thelawticsa@gmail.com") ? (
                          <>
                            {paragraph.split("thelawticsa@gmail.com")[0]}
                            <a href="mailto:thelawticsa@gmail.com" className="text-gold-500 hover:text-gold-400 hover:underline transition-colors">
                              thelawticsa@gmail.com
                            </a>
                            {paragraph.split("thelawticsa@gmail.com")[1]}
                          </>
                        ) : (
                          paragraph
                        )}
                      </p>
                    );
                  })}
                  {/* @ts-ignore */}
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
