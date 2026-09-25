import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type PillButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "dark" | "light";
  /** Replaces the trailing arrow with a leading icon (e.g. the phone in "Call Now"). */
  leadingIcon?: ReactNode;
  size?: "md" | "sm";
  className?: string;
};

const variants = {
  dark: "bg-ink text-white hover:bg-ink-soft",
  light: "bg-white text-ink hover:bg-[#f1efeb]",
};

export function PillButton({
  href,
  children,
  variant = "dark",
  leadingIcon,
  size = "md",
  className = "",
}: PillButtonProps) {
  const sizing = size === "md" ? "h-11 px-[22px] text-sm" : "h-10 px-[18px] text-[13px]";
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex shrink-0 items-center gap-2 rounded-full font-medium leading-none whitespace-nowrap transition-colors duration-200 ${sizing} ${variants[variant]} ${className}`}
    >
      {leadingIcon}
      <span>
        {children}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </span>
      {!leadingIcon && (
        <ArrowRight
          aria-hidden
          size={14}
          strokeWidth={1.75}
          className="transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-[3px]"
        />
      )}
    </a>
  );
}
