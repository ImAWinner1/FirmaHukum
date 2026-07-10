import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Komponen kontainer dengan batas lebar maksimal (maksimal 1280px) beserta padding horizontal yang responsif.
 * Digunakan sebagai pembungkus standar konten (wrapper) agar tata letak tetap berada di tengah (centered) pada setiap bagian (section).
 */
export function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </Component>
  );
}
