"use client";

import { useState, useEffect } from "react";

/**
 * Tracks the window scroll position for scroll-aware UI elements.
 * Returns whether the page has been scrolled past a given threshold.
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
