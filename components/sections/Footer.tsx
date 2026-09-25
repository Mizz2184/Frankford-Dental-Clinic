import { site } from "@/content/site";
import { ContactForm } from "@/components/ContactForm";

export function Footer() {
  const { footer, brand } = site;

  return (
    <footer
      id="contact"
      className="shell on-dark relative mb-3 overflow-hidden rounded-[20px] bg-footer text-white md:mb-4 md:rounded-panel lg:mb-6"
    >
      <div className="shell-pad grid gap-12 pt-14 md:pt-16 lg:grid-cols-[1fr_auto] lg:gap-16 lg:pt-[72px]">
        <div className="max-w-[460px]">
          <h2 className="text-[28px] leading-[1.2] font-medium tracking-[-0.02em]">
            {footer.title[0]}
            <br />
            {footer.title[1]}
          </h2>
          <ContactForm endpoint={footer.contact.endpoint} success={footer.contact.success} className="mt-8" />
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-[150px_auto_auto] lg:gap-x-12">
          {footer.columns.map((column) => {
            const links = column.links.filter((link) => link.href);
            if (!links.length) return null;
            return (
              <nav key={column.label} aria-label={column.label}>
                <ul className="space-y-[18px] text-sm leading-[1.2] text-white/75">
                  {links.map((link) => {
                    const external = link.href.startsWith("http");
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="break-words transition-colors duration-200 hover:text-white"
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            );
          })}
        </div>
      </div>

      <p className="shell-pad mt-12 text-xs text-white/45">
        © {brand.legalName}
      </p>

      {/* Giant wordmark, stretched to the content width and cropped by the panel's bottom edge. */}
      <div aria-hidden className="shell-pad mt-4 select-none">
        <svg viewBox="0 0 1000 150" className="block w-full">
          <text
            x="0"
            y="178"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className="fill-wordmark"
            style={{ fontSize: 236, fontWeight: 600, letterSpacing: "-0.05em", fontFamily: "var(--font-inter-tight)" }}
          >
            {brand.wordmark}
          </text>
        </svg>
      </div>
    </footer>
  );
}
