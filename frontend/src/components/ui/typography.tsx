import { cn } from "@/lib/utils";

type TypographyProps = {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "p" | "muted" | "lead" | "small";
  className?: string;
  icon?: React.ReactNode;
};

const variants = {
  h1: "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  p: "text-base leading-7",
  lead: "text-xl text-muted-foreground",
  muted: "text-sm text-muted-foreground",
  small: "text-xs font-light opacity-60",
};

export function Typography({
  children,
  variant = "p",
  className,
  icon,
}: TypographyProps) {
  const Tag =
    variant === "p" ||
    variant === "lead" ||
    variant === "muted" ||
    variant === "small"
      ? "p"
      : variant;

  return (
    <Tag className={cn("flex items-center ga-1", variants[variant], className)}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </Tag>
  );
}
