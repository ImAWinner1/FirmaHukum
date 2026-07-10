import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionary";
import {
  getArticleBySlug,
  getArticles,
  articles as rawArticles,
} from "@/lib/data/articles";
import { Container } from "@/components/shared";
import { SectionWrapper } from "@/components/shared";
import { AnimatedElement } from "@/components/shared";
import { PageHero } from "@/components/shared";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const locales = ["id", "en"];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const localeArticles = locale === "en" ? rawArticles.en : rawArticles.id;
    for (const article of localeArticles) {
      params.push({ locale, slug: article.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug, locale);

  if (!article) return { title: "Artikel Tidak Ditemukan" };

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as "id" | "en");
  const article = getArticleBySlug(slug, locale);

  if (!article) {
    notFound();
  }

  const localizedArticles = getArticles(locale);
  // Get some related articles (just excluding the current one)
  const relatedArticles = localizedArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return (
    <>
      <PageHero
        title={article.title}
        description={`${article.date} • ${article.readTime}`}
        eyebrow={article.category}
      />

      <SectionWrapper background="white" className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Main Article Content */}
            <div className="lg:col-span-8 lg:col-start-3">
              <AnimatedElement variant="fadeUp">
                <Link
                  href={`/${locale}/artikel`}
                  className="mb-8 inline-flex items-center text-sm font-semibold text-gold-600 transition-colors hover:text-gold-700"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {dict.artikelPage.backToArticles}
                </Link>

                {/* Author Info */}
                <div className="mb-10 flex items-center gap-4 rounded-2xl bg-cream-50 p-6 border border-gray-100">
                  <div className="h-14 w-14 overflow-hidden rounded-full bg-gray-200 shrink-0">
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${article.authorImage}')`,
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-heading text-lg font-bold text-navy-950">
                      {article.author}
                    </p>
                    <p className="text-sm font-medium text-gold-600 uppercase">
                      {article.authorRole}
                    </p>
                  </div>
                </div>

                {/* Article Body */}
                <div
                  className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-navy-950 prose-p:text-gray-600 prose-a:text-gold-600 prose-blockquote:border-l-gold-500 prose-blockquote:bg-gold-50/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:text-navy-900 prose-blockquote:font-medium prose-blockquote:italic prose-blockquote:not-italic prose-li:text-gray-600 prose-strong:text-navy-950"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </AnimatedElement>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <SectionWrapper
          background="cream"
          className="border-t border-gray-200/50"
        >
          <Container>
            <AnimatedElement variant="fadeUp" className="mb-12">
              <h2 className="font-heading text-3xl font-bold text-navy-950 text-center">
                {dict.artikelPage.relatedArticles}
              </h2>
            </AnimatedElement>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((relatedArticle, index) => (
                <AnimatedElement
                  key={relatedArticle.id}
                  variant="fadeUp"
                  delay={index * 0.1}
                >
                  <Link
                    href={`/${locale}/artikel/${relatedArticle.slug}`}
                    className="group block h-full"
                  >
                    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-gold-300 hover:shadow-xl hover:shadow-gold-900/5">
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-900">
                        <div
                          className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-luminosity transition-transform duration-500 group-hover:scale-105 group-hover:opacity-80"
                          style={{
                            backgroundImage: `url('${relatedArticle.imageUrl}')`,
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-navy-950">
                          {relatedArticle.category}
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="mb-3 font-heading text-lg font-bold leading-tight text-navy-950 transition-colors group-hover:text-gold-600">
                          {relatedArticle.title}
                        </h3>
                        <div className="mt-auto pt-4 text-sm font-medium text-gray-500">
                          {relatedArticle.date}
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedElement>
              ))}
            </div>
          </Container>
        </SectionWrapper>
      )}
    </>
  );
}
