"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Scale,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Linkedin, Instagram, Facebook, Twitter } from "@/components/shared";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/constants/site";
import { Container } from "@/components/shared";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/dictionaries/id";
import { subscribeNewsletter } from "@/app/actions/newsletter";

const socialIconMap: Record<string, React.ElementType> = {
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
};

export function Footer({ dict, locale }: { dict: Dictionary; locale: string }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();

  const navItems = [
    { label: dict.nav.home, href: "/" },
    { label: dict.nav.about, href: "/tentang-kami" },
    { label: dict.nav.services, href: "/layanan" },
    { label: dict.nav.team, href: "/tim" },
    { label: dict.nav.articles, href: "/artikel" },
    { label: dict.nav.contact, href: "/kontak" },
  ];

  const footerServiceLinks = Object.entries(dict.servicesPage.areas).map(
    ([slug, area]) => ({
      label: area.title,
      href: `/layanan/${slug}`,
    })
  );

  async function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsSubscribing(true);
    setError(null);

    const result = await subscribeNewsletter({ email });

    setIsSubscribing(false);

    if (result.success) {
      setSubscribed(true);
      setEmail("");

      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    } else {
      setError(
        result.message ||
          (locale === "en" ? "Failed to subscribe" : "Gagal berlangganan")
      );
    }
  }

  return (
    <footer className="bg-navy-950 text-gray-300" role="contentinfo">
      <Container>
        <div className="grid gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
          <div className="lg:col-span-3">
            <Link
              href={`/${locale}`}
              className="mb-4 inline-flex items-center gap-2 transition-opacity hover:opacity-80"
              aria-label={`${siteConfig.name} - Beranda`}
            >
              <Scale className="h-6 w-6 text-gold-500" />
              <span className="font-heading text-lg font-bold text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              {dict.footer.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {siteConfig.socialLinks.map((link) => {
                const Icon = socialIconMap[link.icon];
                return (
                  <a
                    key={link.platform}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-navy-700 text-gray-400 transition-all hover:border-gold-600/50 hover:text-gold-500"
                    aria-label={`Kunjungi ${siteConfig.name} di ${link.platform}`}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {dict.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${locale}${item.href === "/" ? "" : item.href}`}
                    className="text-sm text-gray-400 transition-colors hover:text-gold-500"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {dict.footer.services}
            </h3>
            <ul className="space-y-2.5">
              {footerServiceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${locale}${item.href}`}
                    className="text-sm text-gray-400 transition-colors hover:text-gold-500"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {dict.footer.contact}
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                <span className="text-gray-400">{dict.contact.address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 shrink-0 text-gold-600" />
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="text-gray-400 transition-colors hover:text-gold-500"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 shrink-0 text-gold-600" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-gray-400 transition-colors hover:text-gold-500"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 shrink-0 text-gold-600" />
                <span className="text-gray-400">
                  {dict.contact.businessHours}
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Newsletter
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              {locale === "en"
                ? "Get the latest legal insights directly to your inbox."
                : "Dapatkan informasi hukum terbaru langsung ke email Anda."}
            </p>
            {subscribed ? (
              <p className="text-sm font-medium text-gold-500">
                {locale === "en"
                  ? "Thank you for subscribing!"
                  : "Terima kasih telah berlangganan!"}
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder={
                      locale === "en"
                        ? "Your email address"
                        : "Alamat email Anda"
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubscribing}
                    className="border-navy-700 bg-navy-900 text-sm text-white placeholder:text-gray-500 focus:border-gold-600"
                  />
                  <Button
                    type="submit"
                    disabled={isSubscribing}
                    className="shrink-0 bg-gold-600 text-navy-950 hover:bg-gold-500"
                  >
                    {isSubscribing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ArrowRight className="h-4 w-4" />
                    )}
                  </Button>
                </form>
                {error && <p className="text-xs text-red-400">{error}</p>}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-navy-700 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-gray-500">
              © {currentYear} {siteConfig.name}. {dict.footer.rights}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <Link
                href={`/${locale}/privacy`}
                className="transition-colors hover:text-gold-500"
              >
                {dict.privacyPolicy.title}
              </Link>
              <span className="text-gray-700">|</span>
              <Link
                href={`/${locale}/terms`}
                className="transition-colors hover:text-gold-500"
              >
                {dict.termsConditions.title}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
