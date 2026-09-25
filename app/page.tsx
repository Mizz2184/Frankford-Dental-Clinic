import { SiteHeader } from "@/components/SiteHeader";
import { BookingDialog } from "@/components/booking/BookingDialog";
import { About } from "@/components/sections/About";
import { CostCare } from "@/components/sections/CostCare";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { OurWorks } from "@/components/sections/OurWorks";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Visit } from "@/components/sections/Visit";

export default function Home() {
  return (
    <div className="relative">
      <a
        href="#about"
        className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-sm text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Services />
        <OurWorks />
        <CostCare />
        <Team />
        <Visit />
      </main>
      <Footer />
      <BookingDialog />
    </div>
  );
}
