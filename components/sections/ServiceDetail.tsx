import { ChevronRight, Phone, Plus } from "lucide-react";
import Link from "next/link";
import { site, type ServiceColor } from "@/content/site";
import { ServiceIcon } from "@/components/icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { PillButton } from "@/components/ui/PillButton";
import { FadeUp, ImageReveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/sections/Services";

type Service = (typeof site.services.items)[number];

const bg: Record<ServiceColor, string> = {
  sage: "bg-sage",
  lavender: "bg-lavender",
  sky: "bg-sky",
};

function ServiceHero({ service }: { service: Service }) {
  const { bookCta, brand } = site;

  return (
    <section
      id="top"
      data-hero
      aria-labelledby="service-title"
      className="shell on-dark relative mt-3 h-[560px] overflow-hidden rounded-[20px] bg-ink text-white md:mt-4 md:h-[600px] md:rounded-panel lg:mt-6 lg:h-[640px]"
    >
      <Photo image={service.page.hero} width={1280} height={640} priority className="absolute inset-0" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.6)_0%,rgba(0,0,0,.2)_60%,rgba(0,0,0,0)_100%)]"
      />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,.45)_0%,rgba(0,0,0,0)_55%)]" />

      <div className="shell-pad absolute inset-x-0 bottom-10 md:bottom-14 lg:bottom-[88px]">
        <FadeUp>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/75">
              <li>
                <Link href="/#home" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight aria-hidden size={12} strokeWidth={1.75} />
                <Link href="/#services" className="hover:text-white">
                  Services
                </Link>
              </li>
              <li aria-current="page" className="flex items-center gap-1.5 text-white">
                <ChevronRight aria-hidden size={12} strokeWidth={1.75} />
                {service.title}
              </li>
            </ol>
          </nav>
        </FadeUp>
        <FadeUp step={1}>
          <h1 id="service-title" className="h1 mt-6 max-w-[900px]">
            <span
              aria-hidden
              className={`mr-[0.18em] inline-grid size-[0.72em] -translate-y-[0.06em] place-items-center rounded-full align-middle text-ink ${bg[service.color]}`}
            >
              <ServiceIcon name={service.icon} className="size-[0.42em]" />
            </span>
            {service.title}
          </h1>
        </FadeUp>
        <FadeUp step={2}>
          <p className="mt-6 max-w-[420px] text-sm leading-[1.6] text-white/85">{service.page.intro}</p>
        </FadeUp>
        <FadeUp step={3} className="mt-7 flex flex-wrap gap-3">
          <PillButton href={bookCta.href} variant="light">
            {bookCta.label}
          </PillButton>
          <a
            href={brand.phone.href}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-white/[.18] px-[22px] text-sm font-medium leading-none backdrop-blur-md transition-colors duration-200 hover:bg-white/25"
          >
            <Phone aria-hidden size={14} strokeWidth={1.75} />
            {brand.phone.label}
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

function Overview({ service }: { service: Service }) {
  const { overview } = service.page;

  return (
    <section
      aria-labelledby="overview-title"
      className="shell shell-pad grid gap-10 py-[72px] md:py-24 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-[110px]"
    >
      <div className="flex flex-col justify-center">
        <FadeUp>
          <Eyebrow>overview</Eyebrow>
          <h2 id="overview-title" className="h2 mt-4">
            {overview.title[0]}
            <br />
            {overview.title[1]}
          </h2>
        </FadeUp>
        <FadeUp step={1} className="mt-6 max-w-[460px] space-y-4 text-sm leading-[1.65] text-body">
          {overview.text.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </FadeUp>
      </div>

      <div className="grid grid-cols-[1fr_auto] gap-4">
        <ImageReveal className="col-span-2 aspect-[4/3] rounded-img sm:col-span-1 sm:aspect-auto sm:min-h-[420px]">
          <Photo image={overview.image} width={400} height={440} />
        </ImageReveal>
        <FadeUp
          step={2}
          className={`col-span-2 flex min-h-[150px] flex-col justify-between rounded-img p-5 sm:col-span-1 sm:w-[182px] sm:self-end ${bg[service.color]}`}
        >
          <p className="text-[40px] leading-none font-medium tracking-[-0.02em]">{overview.stat.value}</p>
          <p className="mt-6 max-w-[150px] text-xs leading-[1.5] text-ink/70">{overview.stat.label}</p>
        </FadeUp>
      </div>
    </section>
  );
}

function Treatments({ service }: { service: Service }) {
  const { bookCta } = site;

  return (
    <section
      aria-labelledby="treatments-title"
      className="shell shell-pad rounded-[20px] bg-white py-14 md:rounded-panel md:py-20 lg:py-24"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <FadeUp>
          <h2 id="treatments-title" className="h2">
            What&apos;s Included
          </h2>
          <p className="mt-3 max-w-[380px] text-[13px] leading-[1.6] text-body">
            The treatments we offer as part of {service.title.toLowerCase()}, all under one roof on Frankford Avenue.
          </p>
        </FadeUp>
        <FadeUp step={1}>
          <PillButton href={bookCta.href}>{bookCta.label}</PillButton>
        </FadeUp>
      </div>

      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
        {service.page.treatments.map((treatment, i) => (
          <li key={treatment.title}>
            <FadeUp
              step={i % 3}
              className={`flex h-full min-h-[220px] flex-col justify-between rounded-card p-7 ${bg[service.color]}`}
            >
              <span className="grid size-11 place-items-center rounded-full bg-white text-[13px] font-medium">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mt-10">
                <h3 className="text-[20px] leading-[1.3] font-medium tracking-[-0.01em]">{treatment.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.55] text-ink/70">{treatment.text}</p>
              </div>
            </FadeUp>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Steps({ service }: { service: Service }) {
  return (
    <section aria-labelledby="steps-title" className="shell shell-pad py-[72px] md:py-24 lg:py-[110px]">
      <FadeUp>
        <Eyebrow>your visit</Eyebrow>
        <h2 id="steps-title" className="h2 mt-4">
          What to Expect
        </h2>
      </FadeUp>

      <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
        {service.page.steps.map((step, i) => (
          <li key={step.title}>
            <FadeUp step={i} className="border-t border-ink/15 pt-5">
              <p className="text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-6 text-[20px] leading-[1.3] font-medium tracking-[-0.01em]">{step.title}</h3>
              <p className="mt-2 max-w-[260px] text-[13px] leading-[1.6] text-body">{step.text}</p>
            </FadeUp>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Faqs({ service }: { service: Service }) {
  const { brand } = site;

  return (
    <section
      aria-labelledby="faq-title"
      className={`shell shell-pad grid gap-10 rounded-[20px] py-14 md:rounded-panel md:py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:py-24 ${bg[service.color]}`}
    >
      <FadeUp>
        <Eyebrow tone="ink">faq</Eyebrow>
        <h2 id="faq-title" className="h2 mt-4">
          Common
          <br />
          Questions
        </h2>
        <p className="mt-4 max-w-[320px] text-[13px] leading-[1.6] text-ink/70">
          Can&apos;t find your answer? Our front desk is happy to help, Monday to Friday, 9am to 8pm.
        </p>
        <PillButton
          href={brand.phone.href}
          leadingIcon={<Phone aria-hidden size={14} strokeWidth={1.75} />}
          className="mt-6"
        >
          {brand.phone.label}
        </PillButton>
      </FadeUp>

      <FadeUp step={1} className="divide-y divide-ink/15 border-y border-ink/15">
        {service.page.faqs.map((faq) => (
          <details key={faq.question} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-base leading-[1.4] font-medium [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white">
                <Plus
                  aria-hidden
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-open:rotate-45"
                />
              </span>
            </summary>
            <p className="max-w-[560px] pb-6 text-sm leading-[1.65] text-ink/70">{faq.answer}</p>
          </details>
        ))}
      </FadeUp>
    </section>
  );
}

function OtherServices({ service }: { service: Service }) {
  const others = site.services.items.filter((item) => item.slug !== service.slug);

  return (
    <section aria-labelledby="other-title" className="shell shell-pad py-[72px] md:py-24 lg:py-[110px]">
      <FadeUp>
        <h2 id="other-title" className="h2">
          Other Services
        </h2>
      </FadeUp>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-14">
        {others.map((item) => (
          <ServiceCard key={item.slug} service={item} />
        ))}
      </div>
    </section>
  );
}

export function ServiceDetail({ service }: { service: Service }) {
  return (
    <>
      <ServiceHero service={service} />
      <Overview service={service} />
      <Treatments service={service} />
      <Steps service={service} />
      <Faqs service={service} />
      <OtherServices service={service} />
    </>
  );
}
