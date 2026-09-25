"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { site } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { FadeUp } from "@/components/ui/Reveal";

type Card = (typeof site.visit.cards)[number];

function VisitCard({ card, active, onActivate }: { card: Card; active: boolean; onActivate: () => void }) {
  const fade = `transition-opacity duration-[400ms] ease-out ${active ? "opacity-100" : "opacity-0"}`;
  const text = `transition-colors duration-[400ms] ${active ? "text-white" : ""}`;
  const external = card.link.href.startsWith("http");

  return (
    <article
      onMouseEnter={onActivate}
      onFocusCapture={onActivate}
      className="relative flex h-[400px] w-full shrink-0 snap-start flex-col items-center overflow-hidden rounded-img bg-beige px-8 pt-10 pb-12 text-center md:w-[calc((100%-20px)/2)] lg:h-[440px] lg:w-auto"
    >
      <div aria-hidden className={`absolute inset-0 ${fade}`}>
        <Photo image={card.image} width={371} height={440} decorative />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <p
        className={`relative rounded-full border px-4 py-[7px] text-xs leading-none ${text} ${
          active ? "border-white/70" : "border-ink/25 text-ink/65"
        }`}
      >
        {card.label}
      </p>
      <h3 className={`relative mt-auto text-[22px] leading-[1.3] font-medium tracking-[-0.01em] ${text}`}>
        {card.title[0]}
        <br />
        {card.title[1]}
      </h3>
      <p className={`relative mt-auto max-w-[290px] text-[12.5px] leading-[1.6] ${text} ${active ? "text-white/90" : "text-ink/65"}`}>
        {card.text}
      </p>
      <a
        href={card.link.href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`group relative mt-5 inline-flex items-center gap-1.5 text-[13px] ${text} ${active ? "" : "text-ink"}`}
      >
        <span className={`border-b pb-[3px] ${active ? "border-white" : "border-ink"}`}>{card.link.label}</span>
        <ArrowRight
          aria-hidden
          size={13}
          strokeWidth={1.75}
          className="-mt-[3px] transition-transform duration-200 motion-safe:group-hover:translate-x-[3px]"
        />
      </a>
    </article>
  );
}

export function Visit() {
  const { visit, brand } = site;
  const [active, setActive] = useState(visit.activeIndex);

  return (
    <section
      id="visit"
      aria-labelledby="visit-title"
      className="shell shell-pad pt-[72px] pb-12 md:pt-24 lg:pt-[110px] lg:pb-[60px]"
    >
      <FadeUp>
        <h2 id="visit-title" className="h2">
          {visit.title}
        </h2>
      </FadeUp>
      <FadeUp step={1}>
        <div
          onMouseLeave={() => setActive(visit.activeIndex)}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto max-md:flex-col max-md:overflow-visible lg:mt-[58px] lg:grid lg:grid-cols-3 lg:overflow-visible"
        >
          {visit.cards.map((card, i) => (
            <VisitCard key={card.label} card={card} active={active === i} onActivate={() => setActive(i)} />
          ))}
        </div>
      </FadeUp>
      <FadeUp className="mt-5">
        <iframe
          src={brand.mapsEmbed}
          title={`Map showing ${brand.name} at ${brand.address.join(", ")}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[320px] w-full rounded-img border-0 bg-beige md:h-[400px]"
        />
      </FadeUp>
    </section>
  );
}
