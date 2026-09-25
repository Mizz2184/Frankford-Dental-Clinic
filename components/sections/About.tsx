import { site } from "@/content/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { Photo } from "@/components/ui/Photo";
import { PillButton } from "@/components/ui/PillButton";
import { FadeUp, ImageReveal } from "@/components/ui/Reveal";

/**
 * Collage: centered copy with three photos scattered around it.
 * Desktop positions are percentages of a 1152px content box so the
 * arrangement scales down cleanly between 1024px and 1440px.
 */
export function About() {
  const { about, bookCta } = site;
  const { beforeAfter } = about;
  const hasBeforeAfter = beforeAfter.before.src !== beforeAfter.after.src;

  return (
    <section id="about" aria-labelledby="about-title" className="shell shell-pad py-[72px] md:py-24 lg:py-[110px]">
      <div className="grid gap-4 md:grid-cols-2 lg:relative lg:block">
        <div className="mx-auto mb-10 max-w-[480px] text-center md:col-span-2 lg:relative lg:z-10 lg:mb-0 lg:pt-2.5">
          <FadeUp>
            <Eyebrow lines="both">{about.eyebrow}</Eyebrow>
            <h2 id="about-title" className="h2 mt-4">
              {about.title[0]}
              <br />
              {about.title[1]}
            </h2>
          </FadeUp>
          <FadeUp step={1}>
            <p className="mx-auto mt-5 max-w-[380px] text-sm leading-[1.6] text-body">{about.text}</p>
          </FadeUp>
          <FadeUp step={2}>
            <PillButton href={bookCta.href} className="mt-7">
              {bookCta.label}
            </PillButton>
          </FadeUp>
        </div>

        {/* A: left edge, below the headline */}
        <ImageReveal className="aspect-[290/320] rounded-img lg:absolute lg:top-[107px] lg:left-0 lg:w-[25.2%]">
          <Photo image={about.images.left} width={290} height={320} />
        </ImageReveal>

        {/* B: top right, with the stat underneath */}
        <div className="flex flex-col lg:absolute lg:top-0 lg:right-0 lg:w-[23.45%]">
          <ImageReveal className="aspect-[270/370] rounded-img">
            <Photo image={about.images.right} width={270} height={370} />
          </ImageReveal>
          <FadeUp className="mt-6 lg:mt-[78px]">
            <p className="text-[40px] leading-none font-medium tracking-[-0.02em]">{about.stat.value}</p>
            <p className="mt-3 text-xs leading-[1.5] text-body">{about.stat.label}</p>
          </FadeUp>
        </div>

        {/* C: under the button, slightly right of center. Before/after slider once both photos are set. */}
        <ImageReveal className="aspect-[370/180] rounded-img md:col-span-2 lg:mt-[60px] lg:ml-[38.3%] lg:w-[32.1%]">
          {hasBeforeAfter ? (
            <BeforeAfter before={beforeAfter.before} after={beforeAfter.after} width={370} height={180} />
          ) : (
            <Photo image={about.images.bottom} width={370} height={180} />
          )}
        </ImageReveal>
      </div>
    </section>
  );
}
