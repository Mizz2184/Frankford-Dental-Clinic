import type { ServiceIconName } from "@/content/site";

/** Symmetric molar outline on a 24px grid. */
const TOOTH =
  "M12 5.2C10.6 4.2 9.5 3.5 7.8 3.5 5.3 3.5 3.8 5.5 3.8 8c0 1.7.5 3.1 1 4.6.6 1.9.8 3.8 1.2 5.7.3 1.5.9 2.2 1.7 2.2 1.1 0 1.5-1.2 1.8-2.6.3-1.5.8-3.4 2.5-3.4s2.2 1.9 2.5 3.4c.3 1.4.7 2.6 1.8 2.6.8 0 1.4-.7 1.7-2.2.4-1.9.6-3.8 1.2-5.7.5-1.5 1-2.9 1-4.6 0-2.5-1.5-4.5-4-4.5-1.7 0-2.8.7-4.2 1.7Z";

/** Solid white tooth used inline in the hero headline ("Dental 🦷 Care"). */
export function ToothGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="3 3 18 18" aria-hidden focusable="false" className={className}>
      <path d={TOOTH} fill="currentColor" />
      <path
        d="M6.4 7.6c.1-1.3.9-2.1 2-2.2"
        fill="none"
        stroke="rgba(17,17,17,.18)"
        strokeWidth=".9"
        strokeLinecap="round"
      />
    </svg>
  );
}

const details: Record<ServiceIconName, string[]> = {
  // Enamel shine: protection
  cavity: ["M9.3 8.4c.8.6 1.7.9 2.7.9s1.9-.3 2.7-.9", "M17.6 2.4v2.2M16.5 3.5h2.2"],
  // Canals running into the roots
  rootCanal: ["M9.6 9.8l-.5 5.2", "M14.4 9.8l.5 5.2"],
  // Surgical cross
  surgery: ["M12 7.1v4.6", "M9.7 9.4h4.6"],
};

/** Thin-line (1.25px) dental icons for the service cards. */
export function ServiceIcon({ name, className = "" }: { name: ServiceIconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={TOOTH} />
      {details[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
