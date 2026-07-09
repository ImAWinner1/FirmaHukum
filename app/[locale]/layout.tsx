import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Firma Hukum | Solusi Hukum Terpercaya",
    template: "%s | Firma Hukum",
  },
  description:
    "Firma Hukum adalah firma hukum profesional yang menyediakan layanan konsultasi dan pendampingan hukum terpercaya untuk individu dan korporasi di Indonesia.",
  keywords: [
    "firma hukum",
    "pengacara",
    "konsultan hukum",
    "layanan hukum",
    "advokat",
    "hukum bisnis",
    "hukum perdata",
    "hukum pidana",
    "Indonesia",
  ],
  authors: [{ name: "Firma Hukum" }],
  creator: "Firma Hukum",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://firmahukum.id"
  ),
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Firma Hukum",
    title: "Firma Hukum | Solusi Hukum Terpercaya",
    description:
      "Firma hukum profesional yang menyediakan layanan konsultasi dan pendampingan hukum terpercaya untuk individu dan korporasi di Indonesia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Firma Hukum | Solusi Hukum Terpercaya",
    description:
      "Firma hukum profesional yang menyediakan layanan konsultasi dan pendampingan hukum terpercaya untuk individu dan korporasi di Indonesia.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  
  // JSON-LD Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LegalService"],
    name: "Firma Hukum",
    url: "https://firmahukum.id",
    logo: "https://firmahukum.id/logo.png",
    description: "Firma hukum profesional yang menyediakan layanan konsultasi dan pendampingan hukum terpercaya untuk individu dan korporasi di Indonesia.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Jenderal Sudirman No. 123, Lantai 15",
      addressLocality: "Jakarta Selatan",
      addressRegion: "DKI Jakarta",
      postalCode: "12190",
      addressCountry: "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-21-5555-1234",
      contactType: "customer service",
      areaServed: "ID",
      availableLanguage: ["Indonesian", "English"],
    },
    sameAs: [
      "https://linkedin.com/company/firma-hukum",
      "https://instagram.com/firmahukum",
      "https://facebook.com/firmahukum",
    ],
  };

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
