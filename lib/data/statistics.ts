import type { StatItem } from "@/types";

/**
 * Data statistik untuk komponen batang statistik (statistics bar) pada beranda.
 */
export const statistics: StatItem[] = [
  {
    label: "Tahun Pengalaman",
    value: 15,
    suffix: "+",
    icon: "Calendar",
  },
  {
    label: "Klien Terlayani",
    value: 500,
    suffix: "+",
    icon: "Users",
  },
  {
    label: "Tingkat Keberhasilan",
    value: 98,
    suffix: "%",
    icon: "TrendingUp",
  },
  {
    label: "Klien Korporasi",
    value: 50,
    suffix: "+",
    icon: "Building2",
  },
];
