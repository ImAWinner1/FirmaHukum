import { getDictionary } from '@/lib/dictionary';
import { Container } from "@/components/shared/container";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { AnimatedElement } from "@/components/shared/animated-element";
import { PageHero } from "@/components/shared/page-hero";
import { getArticles } from "@/lib/data/articles";
import Link from "next/link";

export const metadata = {
  title: "Artikel & Berita",
  description: "Kumpulan artikel hukum dan berita terbaru dari Firma Hukum.",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ArtikelPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as 'id' | 'en');
  const localizedArticles = getArticles(locale);

  return (
    <>
      <PageHero
        title={dict.artikelPage.heroTitle}
        description={dict.artikelPage.heroDesc}
        eyebrow={dict.nav.articles}
      />

      <SectionWrapper background="cream" className="min-h-[70vh]">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {localizedArticles.map((article, index) => (
              <AnimatedElement key={article.id} variant="fadeUp" delay={index * 0.1}>
                <Link href={`/${locale}/artikel/${article.slug}`} className="group block h-full">
                  <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-gold-300 hover:shadow-xl hover:shadow-gold-900/5">
                    
                    {/* Image Area */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-900">
                      <div className="absolute inset-0 bg-[url('/images/placeholder/portrait.jpg')] bg-cover bg-center opacity-60 mix-blend-luminosity transition-transform duration-500 group-hover:scale-105 group-hover:opacity-80" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute bottom-4 left-4 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-navy-950">
                        {article.category}
                      </div>
                    </div>
                    
                    {/* Content Area */}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center gap-2 text-xs font-medium text-gray-500">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                      
                      <h3 className="mb-3 font-heading text-lg font-bold leading-tight text-navy-950 transition-colors group-hover:text-gold-600">
                        {article.title}
                      </h3>
                      
                      <p className="mb-6 line-clamp-3 text-sm text-gray-600">
                        {article.excerpt}
                      </p>
                      
                      <div className="mt-auto border-t border-gray-100 pt-4 flex items-center gap-3">
                        <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200 flex-shrink-0">
                          {/* We use a simple div as avatar placeholder */}
                          <div className="h-full w-full bg-[url('/images/placeholder/portrait.jpg')] bg-cover bg-center" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-navy-950">{article.author}</p>
                          <p className="text-[10px] font-medium text-gold-600 uppercase">{article.authorRole}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedElement>
            ))}
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
