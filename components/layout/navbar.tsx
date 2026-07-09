"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Scale, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { siteConfig } from "@/lib/data/site-config";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/dictionaries/id";

export function Navbar({ dict, locale }: { dict: Dictionary; locale: string }) {
  const isScrolled = useScrollPosition(20);
  const pathname = usePathname();

  const closeMenu = () => {
    const checkbox = document.getElementById("mobile-menu-toggle") as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
  };

  const navItems = [
    { label: dict.nav.home, href: "/" },
    { label: dict.nav.about, href: "/tentang-kami" },
    { label: dict.nav.services, href: "/layanan" },
    { label: dict.nav.team, href: "/tim" },
    { label: dict.nav.articles, href: "/artikel" },
    { label: dict.nav.contact, href: "/kontak" },
  ];

  const getLocalizedPath = (newLocale: string) => {
    if (pathname.startsWith(`/${locale}`)) {
      return pathname.replace(new RegExp(`^/${locale}`), `/${newLocale}`);
    } else if (pathname === "/") {
      return `/${newLocale}`;
    }
    return `/${newLocale}${pathname}`;
  };

  const setCookie = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
  };

  return (
    <>
      <input type="checkbox" id="mobile-menu-toggle" className="peer hidden" />
      <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-navy-950 shadow-lg shadow-black/10"
          : "bg-navy-950"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 md:h-20 md:px-6 lg:px-8"
        aria-label="Navigasi utama"
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          aria-label={`${siteConfig.name} — Kembali ke beranda`}
        >
          <Scale className="h-6 w-6 text-gold-500 md:h-7 md:w-7" />
          <span className="font-heading text-lg font-bold tracking-tight text-white md:text-xl">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const fullHref = `/${locale}${item.href === "/" ? "" : item.href}`;
            const isActive =
              pathname === fullHref ||
              (item.href !== "/" && pathname.startsWith(fullHref));
            return (
              <li key={item.href}>
                <Link
                  href={fullHref}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-gold-500"
                      : "text-gray-300 hover:text-white"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-gold-500" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA + Language Switcher */}
        <div className="hidden items-center gap-4 lg:flex">
          {/* Language switcher */}
          <div
            className="flex items-center gap-2 text-xs font-medium"
            aria-label="Pemilih bahasa"
          >
            <Link
              href={getLocalizedPath("id")}
              onClick={() => setCookie("id")}
              className={cn(
                "transition-colors hover:text-gold-400",
                locale === "id" ? "text-gold-500" : "text-gray-500"
              )}
            >
              ID
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              href={getLocalizedPath("en")}
              onClick={() => setCookie("en")}
              className={cn(
                "transition-colors hover:text-gold-400",
                locale === "en" ? "text-gold-500" : "text-gray-500"
              )}
            >
              EN
            </Link>
          </div>

          <Link href={`/${locale}/kontak`}>
            <Button
              variant="outline"
              className="border-gold-600/50 bg-transparent text-gold-500 hover:border-gold-500 hover:bg-gold-600/10 hover:text-gold-400"
            >
              {dict.hero.cta1}
            </Button>
          </Link>
        </div>
        {/* Mobile Menu Toggle */}
        <label
          htmlFor="mobile-menu-toggle"
          className="lg:hidden relative z-50 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-navy-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gold-500 cursor-pointer"
          aria-label="Toggle menu navigasi"
        >
          <Menu className="h-6 w-6 block peer-checked:hidden" aria-hidden="true" />
          <X className="h-6 w-6 hidden peer-checked:block text-white" aria-hidden="true" />
        </label>
      </nav>
    </header>

      {/* Mobile Menu Overlay and Content */}
      <label
        htmlFor="mobile-menu-toggle"
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto transition-opacity"
        style={{ position: "fixed" }}
      />

      <div
        className="fixed inset-y-0 right-0 z-[60] flex w-[300px] flex-col bg-navy-950 border-l border-navy-700 shadow-xl lg:hidden translate-x-full peer-checked:translate-x-0 transition-transform duration-300"
        style={{ position: "fixed" }}
      >
        <div className="flex h-16 items-center justify-between border-b border-navy-700 px-6 md:h-20">
          <div className="flex items-center gap-2 text-left">
            <Scale className="h-5 w-5 text-gold-500" />
            <span className="font-heading text-lg font-bold text-white">
              {siteConfig.name}
            </span>
          </div>
          <label
            htmlFor="mobile-menu-toggle"
            className="rounded-md p-2 text-gray-400 hover:bg-navy-800 hover:text-white focus:outline-none cursor-pointer"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </label>
        </div>

          <div className="flex flex-col px-6 py-6 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const fullHref = `/${locale}${item.href === "/" ? "" : item.href}`;
                const isActive =
                  (item.href === "/" && pathname === `/${locale}`) ||
                  (item.href !== "/" && pathname.startsWith(fullHref));
                return (
                  <li key={item.href}>
                    <Link
                      href={fullHref}
                      onClick={closeMenu}
                      className={cn(
                        "block rounded-md px-3 py-2 text-base font-medium transition-colors",
                        isActive
                          ? "bg-navy-900 text-gold-500"
                          : "text-gray-300 hover:bg-navy-800 hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mobile Language Switcher */}
            <div className="mt-4 flex items-center gap-4 px-3 py-2">
              <span className="text-sm font-medium text-gray-400">Bahasa:</span>
              <div className="flex items-center gap-3 text-sm font-medium">
                <Link
                  href={getLocalizedPath("id")}
                  onClick={() => { setCookie("id"); closeMenu(); }}
                  className={cn(
                    "transition-colors hover:text-gold-400",
                    locale === "id" ? "text-gold-500" : "text-gray-500"
                  )}
                >
                  ID
                </Link>
                <span className="text-gray-600">|</span>
                <Link
                  href={getLocalizedPath("en")}
                  onClick={() => { setCookie("en"); closeMenu(); }}
                  className={cn(
                    "transition-colors hover:text-gold-400",
                    locale === "en" ? "text-gold-500" : "text-gray-500"
                  )}
                >
                  EN
                </Link>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="mt-6 border-t border-navy-700 pt-6">
              <Link href={`/${locale}/kontak`} onClick={closeMenu} className="block">
                <Button className="w-full bg-gold-600 text-navy-950 hover:bg-gold-500">
                  {dict.hero.cta1}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
}
