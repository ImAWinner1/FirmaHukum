import type { StatItem } from "@/types";

/**
 * Statistics data for the homepage statistics bar.
 *
 * NOTE: All numbers are PLACEHOLDERS for development purposes.
 * Replace with actual firm data before production deployment.
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
