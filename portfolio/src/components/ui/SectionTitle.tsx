import { cn } from "@/lib/utils";

interface SectionTitleProps {
  number: string;
  title: React.ReactNode;
  className?: string; // Additional classes for the container
  centered?: boolean;
}

export function SectionTitle({
  number,
  title,
  className,
  centered = false,
}: SectionTitleProps) {
  return (
    <h2
      className={cn(
        "font-mono text-sm text-foreground/90 dark:text-white/90 flex items-center gap-2 uppercase tracking-wider",
        centered && "justify-center",
        className,
      )}
    >
      <span className="text-accent">{number}.</span>
      {title}
    </h2>
  );
}
