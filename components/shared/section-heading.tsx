import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Menggunakan warna teks terang (cocok disematkan di atas latar belakang gelap). */
  dark?: boolean;
  className?: string;
  descClassName?: string;
}

/**
 * Header terstandarisasi yang dapat digunakan ulang (reusable) untuk berbagai bagian (section) situs.
 * Mendukung fitur sub-judul opsional (eyebrow), judul utama dengan serif, serta teks deskripsi pendukung.
 * Mendukung perataan (alignment) kiri dan tengah, serta mode warna gelap/terang.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
  className,
  descClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14 lg:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-[13px] font-semibold uppercase tracking-[0.2em]",
            dark ? "text-gold-500" : "text-gold-600"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-heading text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-gray-900"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed md:text-lg",
            align === "center" && "mx-auto",
            dark ? "text-gray-400" : "text-gray-500",
            descClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
