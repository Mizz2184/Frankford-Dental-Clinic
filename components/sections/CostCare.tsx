import { site } from "@/content/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { PillButton } from "@/components/ui/PillButton";
import { FadeUp, ImageReveal } from "@/components/ui/Reveal";

/** Renders a headline line, swapping "{icon}" for a small rounded photo. */
function TitleLine({ text }: { text: string }) {
  const [before, after] = text.split("{icon}");
  if (after === undefined) return <>{text}</>;
  return (
    <>
      {before}
      <span className="mx-[0.02em] inline-block h-[0.78em] w-[1.3em] -translate-y-[0.02em] overflow-hidden rounded-full align-baseline">
        <Photo image={site.costCare.titleIcon} width={58} height={34} decorative />
      </span>
      {after}
    </>
  );
}

/**
 * Staggered editorial collage. Desktop columns are the measured x-offsets of the
 * reference inside the 1152px content box:
 *   copy 368 | 62 | stat 182 | 17 | 166 | 10 | 169 | 13 | tall 165
 * The main photo spans cols 3–5, the right copy 7–9, the wide photo 5–7.
 */
export function CostCare() {
  const { costCare, bookCta } = site;

  return (
    <section
      id="cost-care"
      aria-labelledby="cost-care-title"
      className="shell shell-pad py-[72px] md:py-24 lg:py-[110px]"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-[368fr_62fr_182fr_17fr_166fr_10fr_169fr_13fr_165fr] lg:grid-rows-[326px_auto] lg:gap-0">
        <div className="order-1 flex flex-col justify-between md:col-span-2 lg:order-none lg:col-[1/3] lg:row-[1/2] lg:pt-2.5 lg:pr-6">
          <FadeUp>
            <Eyebrow>{costCare.eyebrow}</Eyebrow>
            <h2 id="cost-care-title" className="h2 mt-4">
              <TitleLine text={costCare.title[0]} />
              <br />
              <TitleLine text={costCare.title[1]} />
            </h2>
          </FadeUp>
          <FadeUp step={1} className="mt-5 lg:mt-0">
            <p className="max-w-[368px] text-[13px] leading-[1.6] text-body">{costCare.note}</p>
          </FadeUp>
        </div>

        <ImageReveal className="order-3 aspect-[4/3] rounded-img md:aspect-square lg:order-none lg:col-[3/6] lg:row-[1/2] lg:aspect-auto">
          <Photo image={costCare.images.main} width={365} height={326} />
        </ImageReveal>

        <FadeUp
          step={2}
          className="order-2 mb-4 md:col-span-2 lg:order-none lg:col-[7/10] lg:row-[1/2] lg:mb-0 lg:pt-1.5"
        >
          <p className="max-w-[330px] text-[13px] leading-[1.6] text-body">{costCare.text}</p>
          <PillButton href={bookCta.href} className="mt-8">
            {bookCta.label}
          </PillButton>
        </FadeUp>

        <FadeUp className="order-6 flex min-h-[150px] flex-col justify-between rounded-img bg-white p-5 lg:order-none lg:col-[3/4] lg:row-[2/3] lg:mt-8 lg:h-[150px]">
          <p className="text-[40px] leading-none font-medium tracking-[-0.02em]">{costCare.stat.value}</p>
          <p className="max-w-[140px] text-xs leading-[1.5] text-body">{costCare.stat.label}</p>
        </FadeUp>

        <ImageReveal className="order-5 aspect-[4/3] rounded-img lg:order-none lg:col-[5/8] lg:row-[2/3] lg:mt-[26px] lg:aspect-[345/199]">
          <Photo image={costCare.images.wide} width={345} height={199} />
        </ImageReveal>

        <ImageReveal className="order-4 aspect-[4/3] rounded-img md:aspect-square lg:order-none lg:col-[9/10] lg:row-[2/3] lg:-mt-[43px] lg:aspect-[163/212]">
          <Photo image={costCare.images.tall} width={165} height={212} />
        </ImageReveal>
      </div>
    </section>
  );
}
