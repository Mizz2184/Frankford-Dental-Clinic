import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/SiteHeader";
import { BookingDialog } from "@/components/booking/BookingDialog";
import { Footer } from "@/components/sections/Footer";
import { ServiceDetail } from "@/components/sections/ServiceDetail";

// Static export: only the services listed in content/site.ts get a page.
export const dynamicParams = false;

export function generateStaticParams() {
  return site.services.items.map((service) => ({ slug: service.slug }));
}

const findService = (slug: string) => site.services.items.find((service) => service.slug === slug);

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = findService((await params).slug);
  if (!service) return {};
  return {
    title: `${service.title} | ${site.brand.name}`,
    description: `${service.page.intro} Northeast Philadelphia, 7538 Frankford Ave. Call ${site.brand.phone.label}.`,
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = findService((await params).slug);
  if (!service) notFound();

  return (
    <div className="relative">
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-sm text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <SiteHeader current="services" />
      <main id="main">
        <ServiceDetail service={service} />
      </main>
      <Footer />
      <BookingDialog />
    </div>
  );
}
