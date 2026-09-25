import { site } from "@/content/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { PillButton } from "@/components/ui/PillButton";
import { FadeUp, ImageReveal } from "@/components/ui/Reveal";

export function OurWorks() {
  const { works, bookCta } = site;

  return (
    <section
      id="works"
      aria-labelledby="works-title"
      className="shell shell-pad mt-6 rounded-[20px] bg-sage py-14 md:rounded-panel md:py-20 lg:mt-7 lg:py-24"
    >
      {/* Desktop: 391fr text column | 761fr image column; the heading sits over the second image. */}
      <div className="grid gap-y-8 lg:grid-cols-[391fr_761fr] lg:grid-rows-[auto_1fr] lg:gap-y-[58px]">
        <FadeUp className="lg:col-start-1 lg:row-start-1">
          <Eyebrow tone="ink">{works.eyebrow}</Eyebrow>
        </FadeUp>

        <div className="lg:col-start-2 lg:row-start-1 lg:grid lg:grid-cols-2 lg:gap-5">
          <FadeUp className="lg:col-start-2">
            <h2 id="works-title" className="h2">
              {works.title[0]}
              <br />
              {works.title[1]}
            </h2>
          </FadeUp>
        </div>

        <FadeUp step={1} className="self-start lg:col-start-1 lg:row-start-2 lg:pt-2.5 lg:pr-10">
          <p className="max-w-[300px] text-sm leading-[1.6] text-ink/70">{works.text}</p>
          <PillButton href={bookCta.href} className="mt-7">
            {bookCta.label}
          </PillButton>
        </FadeUp>

        <div className="grid gap-8 md:grid-cols-3 md:gap-5 lg:col-start-2 lg:row-start-2">
          {works.items.map((item) => (
            <figure key={item.title}>
              <ImageReveal className="aspect-[4/5] rounded-img md:aspect-[240/420]">
                <Photo image={item.image} width={240} height={420} />
              </ImageReveal>
              <figcaption className="mt-4">
                <h3 className="text-[15px] leading-[1.4] font-medium">{item.title}</h3>
                <p className="mt-1 text-[13px] leading-[1.5] text-ink/65">{item.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Shares the text column's grid cell on desktop, pinned to the bottom. */}
        <div className="flex items-center gap-3 self-end lg:col-start-1 lg:row-start-2">
          <div className="flex">
            {works.community.avatars.map((avatar, i) => (
              <span
                key={avatar.src}
                className={`size-[52px] overflow-hidden rounded-full border-2 border-sage ${i > 0 ? "-ml-4" : ""}`}
              >
                <Photo image={avatar} width={52} height={52} crop="faces" decorative />
              </span>
            ))}
          </div>
          <p className="text-[13px] leading-[1.35] font-medium">
            {works.community.label[0]}
            <br />
            {works.community.label[1]}
          </p>
        </div>
      </div>
    </section>
  );
}
