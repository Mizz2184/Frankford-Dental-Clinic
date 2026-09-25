import { Play, Plus } from "lucide-react";
import { servicePath, site, type ServiceColor } from "@/content/site";
import { ServiceIcon } from "@/components/icons";
import { Photo } from "@/components/ui/Photo";
import { PillButton } from "@/components/ui/PillButton";
import { ReadMore } from "@/components/ui/ReadMore";
import { FadeUp, ImageReveal } from "@/components/ui/Reveal";

const cardColor: Record<ServiceColor, string> = {
  sage: "bg-sage",
  lavender: "bg-lavender",
  sky: "bg-sky",
};

type Service = (typeof site.services.items)[number];

export function ServiceCard({ service, className = "" }: { service: Service; className?: string }) {
  return (
    <article
      className={`group flex min-h-[280px] flex-col justify-between rounded-card p-8 transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1 md:min-h-[320px] lg:min-h-0 ${cardColor[service.color]} ${className}`}
    >
      <div className="flex items-start justify-between">
        <span className="grid size-11 place-items-center rounded-full bg-white text-ink">
          <ServiceIcon name={service.icon} className="size-[22px]" />
        </span>
        <Plus
          aria-hidden
          size={24}
          strokeWidth={1.25}
          className="text-black/[.12] transition-transform duration-300 ease-out motion-safe:group-hover:rotate-90"
        />
      </div>
      <div>
        <h3 className="text-[22px] leading-[1.3] font-medium tracking-[-0.01em]">{service.title}</h3>
        <p className="mt-2 max-w-[400px] lg:line-clamp-2 text-[13px] leading-[1.55] text-body">{service.description}</p>
        <ReadMore href={servicePath(service.slug)} about={service.title} className="mt-5" />
      </div>
    </article>
  );
}

export function Services() {
  const { services, bookCta } = site;
  const [cavity, rootCanal, surgery] = services.items;

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="shell shell-pad rounded-[20px] bg-white py-14 md:rounded-panel md:py-20 lg:py-24"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <FadeUp>
          <h2 id="services-title" className="h2">
            {services.title[0]}
            <br />
            {services.title[1]}
          </h2>
        </FadeUp>
        <FadeUp step={1} className="max-w-[270px]">
          <p className="text-xs leading-[1.6] text-body">{services.text}</p>
          <PillButton href={bookCta.href} className="mt-5">
            {bookCta.label}
          </PillButton>
        </FadeUp>
      </div>

      {/*
        Desktop grid (fr units of the 1152px content width):
        row 1 → sage 511 | "our services" label 202 | lavender 437
        row 2 → sky 446 | 20 gap | photo 686
      */}
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-[446fr_20fr_45fr_202fr_437fr] lg:grid-rows-[370px_370px] lg:gap-x-0">
        <ServiceCard service={cavity} className="lg:col-[1/4]" />

        <div aria-hidden className="hidden flex-col items-center pt-1 lg:col-[4/5] lg:mr-[50px] lg:flex lg:justify-self-end">
          <span className="rotate-180 text-[13px] leading-none tracking-[0.12em] text-ink/75 [writing-mode:vertical-rl]">
            {services.sideLabel}
          </span>
          <span className="mt-4 h-40 w-px bg-ink/15" />
        </div>

        <ServiceCard service={rootCanal} className="lg:col-[5/6]" />
        <ServiceCard service={surgery} className="lg:col-[1/2]" />

        <ImageReveal className="relative min-h-[260px] rounded-card md:min-h-[320px] lg:col-[3/6] lg:min-h-0">
          <Photo image={services.video.image} width={686} height={370} />
          <span
            aria-hidden
            className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/35 text-white backdrop-blur-md"
          >
            <Play size={20} strokeWidth={1.5} className="ml-0.5 fill-white" />
          </span>
        </ImageReveal>
      </div>
    </section>
  );
}
