import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Constrained-width container with responsive horizontal padding.
 * Max width: 1280px. Used as the standard content wrapper across all sections.
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
