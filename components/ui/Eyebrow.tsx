type EyebrowProps = {
  children: string;
  /** "accent" = orange (cream sections); "ink" = muted ink (colored panels). */
  tone?: "accent" | "ink";
  lines?: "right" | "both";
  className?: string;
};

export function Eyebrow({ children, tone = "accent", lines = "right", className = "" }: EyebrowProps) {
  const text = tone === "accent" ? "text-accent" : "text-ink/70";
  const rule = tone === "accent" ? "bg-accent/45" : "bg-ink/30";
  const line = <span aria-hidden className={`h-px w-10 ${rule}`} />;

  return (
    <p className={`inline-flex items-center gap-3 text-xs leading-none ${text} ${className}`}>
      {lines === "both" && line}
      <span>({children})</span>
      {line}
    </p>
  );
}
