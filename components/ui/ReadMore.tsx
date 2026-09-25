import { ArrowRight } from "lucide-react";

export function ReadMore({ href, about, className = "" }: { href: string; about: string; className?: string }) {
  return (
    <a href={href} className={`group inline-flex items-center gap-1.5 text-[13px] leading-none text-ink ${className}`}>
      <span className="border-b border-ink pb-[3px]">
        Read More<span className="sr-only"> about {about}</span>
      </span>
      <ArrowRight
        aria-hidden
        size={13}
        strokeWidth={1.75}
        className="-mt-[3px] transition-transform duration-200 motion-safe:group-hover:translate-x-[3px]"
      />
    </a>
  );
}
