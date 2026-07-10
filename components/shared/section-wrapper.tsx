import { cn } from "@/lib/utils";

type SectionBackground = "navy" | "white" | "cream";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  background?: SectionBackground;
  id?: string;
}

const backgroundStyles: Record<SectionBackground, string> = {
  navy: "bg-navy-950 text-white",
  white: "bg-white text-gray-900",
  cream: "bg-cream-50 text-gray-900",
};

/**
 * Komponen pembungkus (wrapper) bagian halaman dengan variasi latar belakang dan padding vertikal yang konsisten.
 * Memastikan ritme jarak (spacing rhythm) yang seragam di seluruh tata letak situs.
 */
export function SectionWrapper({
  children,
  className,
  background = "white",
  id,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-12 md:py-16 lg:py-24 xl:py-[7.5rem]",
        backgroundStyles[background],
        className
      )}
    >
      {children}
    </section>
  );
}
