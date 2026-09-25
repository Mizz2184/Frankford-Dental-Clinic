import { site } from "@/content/site";
import { ToothGlyph } from "@/components/icons";
import { Photo } from "@/components/ui/Photo";
import { PillButton } from "@/components/ui/PillButton";
import { FadeUp } from "@/components/ui/Reveal";

export function Hero() {
  const { hero, bookCta } = site;
  const [before, after] = hero.titleBottom;

  return (
    <section
      id="home"
      data-hero
      aria-labelledby="hero-title"
      className="shell on-dark relative mt-3 h-[620px] overflow-hidden rounded-[20px] bg-ink text-white md:mt-4 md:h-[680px] md:rounded-panel lg:mt-6 lg:h-[760px]"
    >
      <Photo image={hero.image} width={1280} height={760} priority className="absolute inset-0" />
      {/* Left-to-right scrim keeps the headline readable; a soft bottom scrim backs the small copy. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.55)_0%,rgba(0,0,0,.15)_55%,rgba(0,0,0,0)_100%)]"
      />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,.35)_0%,rgba(0,0,0,0)_50%)]" />

      <div className="shell-pad absolute inset-x-0 bottom-10 md:bottom-16 lg:bottom-[104px]">
        <FadeUp>
          <h1 id="hero-title" className="h1">
            {hero.titleTop}
            <br />
            {before}{" "}
            <ToothGlyph className="inline-block h-[0.8em] w-[0.8em] -translate-y-[0.02em] align-baseline" />{" "}
            {after}
          </h1>
        </FadeUp>
        <FadeUp step={1}>
          <p className="mt-6 max-w-[360px] text-sm leading-[1.6] text-white/85">{hero.text}</p>
        </FadeUp>
        <FadeUp step={2}>
          <PillButton href={bookCta.href} variant="light" className="mt-7">
            {bookCta.label}
          </PillButton>
        </FadeUp>
      </div>
    </section>
  );
}
