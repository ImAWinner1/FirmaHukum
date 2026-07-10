"use client";

import { useState, useEffect } from "react";

/**
 * Melacak posisi gulir (scroll) dari jendela (window) untuk komponen UI yang sensitif terhadap scroll.
 * Mengembalikan nilai boolean apakah halaman telah digulir melewati batas (threshold) yang ditentukan.
 */
export function useScrollPosition(threshold: number = 50): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > threshold);
    }

    // Check initial position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}
