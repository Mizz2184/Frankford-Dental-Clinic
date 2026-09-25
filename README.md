# Frankford Avenue Dental Group — website

Static marketing site built with Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion and Lucide icons.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → ./out (upload that folder to any static host)
```

## Edit content

All copy, links and images live in [`content/site.ts`](content/site.ts). Components only read from it.

- **Images**: clinic photos are ImageKit URLs and a few supporting shots are Unsplash URLs, all resized on the fly (`components/ui/Photo.tsx`). To use your own photos,
  drop them in `public/images/` and set `src: "/images/your-photo.jpg"`. `position` controls the crop focus.
- **Headlines** are arrays of lines (one `<br />` between them). In the Cost Care title, `{icon}` marks
  where the small rounded photo sits.
- **Booking**: every link to `#book` (all "Book Appointment" buttons and the "Appointment" nav link) opens the
  booking flow; a direct visit to `/#book` opens it too. Treatments, opening days, time slots and wording live under
  `booking` in `content/site.ts`. Set `booking.endpoint` to a form service URL (e.g. Formspree) to receive requests;
  while it is empty, the flow only shows the confirmation screen. "Call Now" is a `tel:` link.

## Structure

```
app/                 layout (font, metadata), page, global tokens (globals.css)
components/
  SiteHeader.tsx     hero nav pill, pinned nav on scroll, mobile full-screen menu
  booking/           BookingDialog: 4-step booking flow (treatment, date & time, details, review)
  ContactForm.tsx    footer contact form (set footer.contact.endpoint to receive messages)
  icons.tsx          tooth glyph + service icons
  sections/          Hero, About, Services, OurWorks (patient stories), CostCare (our office), Team, Visit (getting here + map), Footer
  ui/                PillButton, Eyebrow, ReadMore, Photo, BeforeAfter slider, Reveal (motion helpers)
content/site.ts      everything editable
```

Design tokens (colors, radii, type scale, panel frame) are defined at the top of `app/globals.css`.
