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
        "text-2xl md:text-4xl font-mono font-bold text-accent flex items-baseline gap-2",
        centered && "justify-center",
        className,
      )}
    >
      <span className="text-white/40 font-mono text-xl md:text-2xl">
        {number}.
      </span>
      {title}
    </h2>
  );
}
