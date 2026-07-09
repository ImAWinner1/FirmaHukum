export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  imageUrl: string;
}

type ArticleDictionary = {
  id: Article[];
  en: Article[];
};

export const articles: ArticleDictionary = {
  id: [
    {
      id: "1",
      slug: "panduan-hukum-regulasi-baru-bisnis",
      title: "Panduan Hukum: Implikasi Regulasi Baru Terhadap Operasional Bisnis Anda",
      category: "Hukum Bisnis",
      readTime: "5 Menit Baca",
      date: "12 Mei 2024",
      excerpt: "Artikel ini membahas secara mendalam tentang implikasi dari perubahan undang-undang terbaru terhadap operasional bisnis Anda di Indonesia.",
      content: `
        <h2 class="text-2xl font-bold text-navy-950 mb-4 font-heading mt-8">Memahami Perubahan Regulasi Bisnis 2024</h2>
        <p class="text-gray-600 mb-6 leading-relaxed">Pemerintah baru-baru ini mengesahkan serangkaian amandemen undang-undang ketenagakerjaan dan perizinan berusaha yang akan berdampak langsung pada cara perusahaan beroperasi di Indonesia. Sebagai pelaku bisnis, penting untuk tidak hanya memahami perubahan ini, tetapi juga menyesuaikan strategi perusahaan agar terhindar dari sanksi administratif maupun litigasi.</p>
        
        <h3 class="text-xl font-bold text-navy-950 mb-3 font-heading mt-8">1. Perubahan pada Perizinan Berusaha Berbasis Risiko</h3>
        <p class="text-gray-600 mb-6 leading-relaxed">Sistem Online Single Submission (OSS) kini menerapkan pengawasan yang lebih ketat terhadap perizinan berusaha berbasis risiko. Perusahaan dengan risiko menengah-tinggi diwajibkan untuk melaporkan Analisis Dampak Lingkungan (AMDAL) secara kuartalan.</p>
        
        <h3 class="text-xl font-bold text-navy-950 mb-3 font-heading mt-8">2. Hak dan Kewajiban Karyawan</h3>
        <p class="text-gray-600 mb-6 leading-relaxed">Undang-undang baru memberikan fleksibilitas tambahan untuk pengaturan jam kerja bagi perusahaan sektor rintisan (startup), namun dengan kompensasi lembur yang diatur lebih rinci. Pastikan HR Anda menyesuaikan Peraturan Perusahaan (PP) maksimal 6 bulan sejak regulasi ini diterbitkan.</p>
        
        <blockquote class="border-l-4 border-gold-500 bg-gold-50/50 p-6 my-8 italic text-navy-900 font-medium">
          "Kepatuhan hukum bukan sekadar biaya operasional, melainkan investasi perlindungan aset jangka panjang bagi perusahaan."
        </blockquote>
        
        <h3 class="text-xl font-bold text-navy-950 mb-3 font-heading mt-8">Langkah Selanjutnya untuk Bisnis Anda</h3>
        <p class="text-gray-600 mb-6 leading-relaxed">Kami menyarankan perusahaan untuk melakukan <strong>Audit Kepatuhan Internal</strong> selambat-lambatnya kuartal ini. Jika perusahaan Anda membutuhkan pendampingan dalam menavigasi perubahan ini, tim Hukum Korporasi kami siap membantu menyusun strategi mitigasi risiko.</p>
      `,
      author: "Dr. Andi Pratama",
      authorRole: "Managing Partner",
      imageUrl: "/images/placeholder/portrait.jpg",
    },
    {
      id: "2",
      slug: "penyelesaian-sengketa-komersial-arbitrase",
      title: "Mengapa Arbitrase Menjadi Pilihan Utama Penyelesaian Sengketa Komersial",
      category: "Sengketa",
      readTime: "7 Menit Baca",
      date: "28 April 2024",
      excerpt: "Ketahui keuntungan menyelesaikan sengketa bisnis melalui jalur arbitrase dibandingkan proses pengadilan konvensional yang memakan waktu lama.",
      content: `
        <h2 class="text-2xl font-bold text-navy-950 mb-4 font-heading mt-8">Arbitrase vs Pengadilan Konvensional</h2>
        <p class="text-gray-600 mb-6 leading-relaxed">Dalam dunia bisnis yang serba cepat, sengketa adalah hal yang terkadang tidak dapat dihindari. Namun, bagaimana Anda menyelesaikannya akan menentukan masa depan kelangsungan perusahaan. Arbitrase komersial kini menjadi pilihan favorit banyak korporasi multinasional.</p>
        
        <h3 class="text-xl font-bold text-navy-950 mb-3 font-heading mt-8">Kecepatan dan Kerahasiaan</h3>
        <p class="text-gray-600 mb-6 leading-relaxed">Berbeda dengan proses peradilan yang terbuka untuk umum, sidang arbitrase bersifat rahasia (confidential). Hal ini sangat vital bagi perusahaan yang ingin menjaga reputasi bisnis dan melindungi rahasia dagang mereka dari sorotan publik.</p>
        
        <h3 class="text-xl font-bold text-navy-950 mb-3 font-heading mt-8">Putusan Final dan Mengikat</h3>
        <p class="text-gray-600 mb-6 leading-relaxed">Putusan majelis arbitrase bersifat final dan mengikat (final and binding). Ini menutup celah untuk proses banding dan kasasi yang seringkali membuat sengketa di pengadilan memakan waktu bertahun-tahun.</p>
        
        <h3 class="text-xl font-bold text-navy-950 mb-3 font-heading mt-8">Pemilihan Arbiter Berdasarkan Keahlian</h3>
        <p class="text-gray-600 mb-6 leading-relaxed">Para pihak dapat memilih arbiter yang benar-benar memahami industri mereka. Jika sengketa terkait konstruksi, Anda dapat menunjuk ahli hukum yang berlatar belakang teknik konstruksi, sehingga putusan yang dihasilkan lebih objektif dan masuk akal secara teknis.</p>
      `,
      author: "Siti Rahmawati",
      authorRole: "Senior Partner",
      imageUrl: "/images/placeholder/portrait.jpg",
    },
    {
      id: "3",
      slug: "perlindungan-kekayaan-intelektual-startup",
      title: "Pentingnya Pendaftaran Hak Kekayaan Intelektual Bagi Perusahaan Rintisan",
      category: "Kekayaan Intelektual",
      readTime: "4 Menit Baca",
      date: "15 April 2024",
      excerpt: "Merek dagang, paten, dan hak cipta adalah aset terbesar startup. Pelajari cara melindunginya sejak hari pertama Anda merintis bisnis.",
      content: `
        <h2 class="text-2xl font-bold text-navy-950 mb-4 font-heading mt-8">Aset Tak Berwujud yang Paling Berharga</h2>
        <p class="text-gray-600 mb-6 leading-relaxed">Banyak <em>founder startup</em> yang terlalu fokus pada pengembangan produk dan akuisisi pelanggan, namun melupakan satu hal krusial: Perlindungan Kekayaan Intelektual (HKI). Kesalahan ini seringkali baru disadari ketika ada kompetitor yang menggunakan nama atau logo serupa.</p>
        
        <h3 class="text-xl font-bold text-navy-950 mb-3 font-heading mt-8">Prinsip First to File di Indonesia</h3>
        <p class="text-gray-600 mb-6 leading-relaxed">Indonesia menganut prinsip <em>First to File</em> dalam perlindungan merek. Artinya, siapa yang pertama kali mendaftarkan merek tersebut di Direktorat Jenderal Kekayaan Intelektual (DJKI), dialah yang diakui sebagai pemilik sah, terlepas dari siapa yang pertama kali menggunakannya.</p>
        
        <h3 class="text-xl font-bold text-navy-950 mb-3 font-heading mt-8">Apa yang Harus Dilindungi?</h3>
        <ul class="list-disc pl-6 mb-6 text-gray-600 space-y-2">
          <li><strong class="text-navy-950">Merek Dagang:</strong> Nama perusahaan, logo, slogan.</li>
          <li><strong class="text-navy-950">Hak Cipta:</strong> Source code aplikasi, desain UI/UX, konten website.</li>
          <li><strong class="text-navy-950">Paten:</strong> Invensi teknologi yang memiliki kebaruan (novelty).</li>
          <li><strong class="text-navy-950">Rahasia Dagang:</strong> Algoritma, database klien, resep khusus.</li>
        </ul>
        
        <p class="text-gray-600 mb-6 leading-relaxed">Jangan tunggu hingga startup Anda besar untuk mendaftarkan HKI. Daftarkan sekarang sebagai langkah mitigasi dan peningkatan valuasi di mata investor.</p>
      `,
      author: "Hendrik Gunawan",
      authorRole: "Partner",
      imageUrl: "/images/placeholder/portrait.jpg",
    }
  ],
  en: [
    {
      id: "1",
      slug: "panduan-hukum-regulasi-baru-bisnis",
      title: "Legal Guide: Implications of New Regulations on Your Business Operations",
      category: "Business Law",
      readTime: "5 Min Read",
      date: "May 12, 2024",
      excerpt: "This article discusses in-depth the implications of the latest legal amendments on how your company operates in Indonesia.",
      content: `
        <h2 class="text-2xl font-bold text-navy-950 mb-4 font-heading mt-8">Understanding 2024 Business Regulation Changes</h2>
        <p class="text-gray-600 mb-6 leading-relaxed">The government recently enacted a series of amendments to labor and business licensing laws that will directly impact how companies operate in Indonesia. As a business actor, it is crucial not only to understand these changes but also to adjust your corporate strategy to avoid administrative sanctions or litigation.</p>
        
        <h3 class="text-xl font-bold text-navy-950 mb-3 font-heading mt-8">1. Changes in Risk-Based Business Licensing</h3>
        <p class="text-gray-600 mb-6 leading-relaxed">The Online Single Submission (OSS) system now applies stricter oversight to risk-based business licensing. Companies with medium-to-high risk are required to report Environmental Impact Analysis (AMDAL) on a quarterly basis.</p>
        
        <h3 class="text-xl font-bold text-navy-950 mb-3 font-heading mt-8">2. Employee Rights and Obligations</h3>
        <p class="text-gray-600 mb-6 leading-relaxed">The new law provides additional flexibility for working hour arrangements for startup companies, but with more detailed overtime compensation regulations. Ensure your HR adjusts the Company Regulations (PP) within a maximum of 6 months since this regulation was issued.</p>
        
        <blockquote class="border-l-4 border-gold-500 bg-gold-50/50 p-6 my-8 italic text-navy-900 font-medium">
          "Legal compliance is not merely an operational cost, but an investment in long-term asset protection for the company."
        </blockquote>
        
        <h3 class="text-xl font-bold text-navy-950 mb-3 font-heading mt-8">Next Steps for Your Business</h3>
        <p class="text-gray-600 mb-6 leading-relaxed">We advise companies to conduct an <strong>Internal Compliance Audit</strong> no later than this quarter. If your company requires assistance in navigating these changes, our Corporate Law team is ready to help develop risk mitigation strategies.</p>
      `,
      author: "Dr. Andi Pratama",
      authorRole: "Managing Partner",
      imageUrl: "/images/placeholder/portrait.jpg",
    },
    {
      id: "2",
      slug: "penyelesaian-sengketa-komersial-arbitrase",
      title: "Why Arbitration is the Top Choice for Commercial Dispute Resolution",
      category: "Dispute",
      readTime: "7 Min Read",
      date: "April 28, 2024",
      excerpt: "Discover the advantages of resolving business disputes through arbitration compared to time-consuming conventional court proceedings.",
      content: `
        <h2 class="text-2xl font-bold text-navy-950 mb-4 font-heading mt-8">Arbitration vs Conventional Court</h2>
        <p class="text-gray-600 mb-6 leading-relaxed">In the fast-paced business world, disputes are sometimes unavoidable. However, how you resolve them will determine the future continuity of the company. Commercial arbitration has now become the favorite choice of many multinational corporations.</p>
        
        <h3 class="text-xl font-bold text-navy-950 mb-3 font-heading mt-8">Speed and Confidentiality</h3>
        <p class="text-gray-600 mb-6 leading-relaxed">Unlike public court proceedings, arbitration hearings are confidential. This is vital for companies that want to maintain business reputation and protect their trade secrets from the public spotlight.</p>
        
        <h3 class="text-xl font-bold text-navy-950 mb-3 font-heading mt-8">Final and Binding Decision</h3>
        <p class="text-gray-600 mb-6 leading-relaxed">The decision of the arbitral tribunal is final and binding. This closes the loophole for appeal and cassation processes that often make court disputes take years.</p>
        
        <h3 class="text-xl font-bold text-navy-950 mb-3 font-heading mt-8">Selection of Arbitrators Based on Expertise</h3>
        <p class="text-gray-600 mb-6 leading-relaxed">The parties can choose an arbitrator who truly understands their industry. If the dispute is related to construction, you can appoint a legal expert with a background in construction engineering, so that the resulting decision is more objective and technically reasonable.</p>
      `,
      author: "Siti Rahmawati",
      authorRole: "Senior Partner",
      imageUrl: "/images/placeholder/portrait.jpg",
    },
    {
      id: "3",
      slug: "perlindungan-kekayaan-intelektual-startup",
      title: "The Importance of Intellectual Property Registration for Startups",
      category: "Intellectual Property",
      readTime: "4 Min Read",
      date: "April 15, 2024",
      excerpt: "Trademarks, patents, and copyrights are a startup's biggest assets. Learn how to protect them from day one of your business.",
      content: `
        <h2 class="text-2xl font-bold text-navy-950 mb-4 font-heading mt-8">The Most Valuable Intangible Assets</h2>
        <p class="text-gray-600 mb-6 leading-relaxed">Many <em>startup founders</em> focus too much on product development and customer acquisition, but forget one crucial thing: Intellectual Property (IP) Protection. This mistake is often only realized when a competitor uses a similar name or logo.</p>
        
        <h3 class="text-xl font-bold text-navy-950 mb-3 font-heading mt-8">First to File Principle in Indonesia</h3>
        <p class="text-gray-600 mb-6 leading-relaxed">Indonesia adheres to the <em>First to File</em> principle in trademark protection. This means that whoever first registers the mark with the Directorate General of Intellectual Property (DJKI), they are recognized as the legal owner, regardless of who used it first.</p>
        
        <h3 class="text-xl font-bold text-navy-950 mb-3 font-heading mt-8">What Should Be Protected?</h3>
        <ul class="list-disc pl-6 mb-6 text-gray-600 space-y-2">
          <li><strong class="text-navy-950">Trademark:</strong> Company name, logo, slogan.</li>
          <li><strong class="text-navy-950">Copyright:</strong> Application source code, UI/UX design, website content.</li>
          <li><strong class="text-navy-950">Patent:</strong> Technological inventions that have novelty.</li>
          <li><strong class="text-navy-950">Trade Secret:</strong> Algorithms, client database, special recipes.</li>
        </ul>
        
        <p class="text-gray-600 mb-6 leading-relaxed">Don't wait until your startup grows big to register IP. Register now as a mitigation step and increase valuation in the eyes of investors.</p>
      `,
      author: "Hendrik Gunawan",
      authorRole: "Partner",
      imageUrl: "/images/placeholder/portrait.jpg",
    }
  ]
};

export function getArticles(locale: string = 'id'): Article[] {
  return articles[locale as keyof ArticleDictionary] || articles.id;
}

export function getArticleBySlug(slug: string, locale: string = 'id'): Article | undefined {
  const localizedArticles = getArticles(locale);
  return localizedArticles.find(article => article.slug === slug);
}
