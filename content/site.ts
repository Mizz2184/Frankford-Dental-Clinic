/**
 * Every piece of editable copy, link and image on the site lives here.
 * Components only read from this file.
 *
 * Images: `src` is an ImageKit or Unsplash URL (both resized on the fly by
 * components/ui/Photo.tsx) or a local path such as "/images/hero.jpg".
 * `position` is a CSS object-position; `crop: "faces"` centres small crops on a face.
 */

export type SiteImage = {
  src: string;
  alt: string;
  position?: string;
  crop?: string;
};

export type Link = { label: string; href: string };

export type ServiceColor = "sage" | "lavender" | "sky";
export type ServiceIconName = "cavity" | "rootCanal" | "surgery";

const unsplash = (id: string) => `https://images.unsplash.com/${id}`;
const kit = (file: string) => `https://ik.imagekit.io/wyvfe8vjna/${file}`;

// Clinic photography (hosted on ImageKit)
const photos = {
  hero: kit("ChatGPT%20Image%20Sep%209,%202026,%2011_27_01%20AM.png"),
  neelima: kit("Sep%2025,%202026,%2001_12_30%20PM.png?updatedAt=1790356409983"),
  anvarali: kit("Sep%2025,%202026,%2001_11_24%20PM.png?updatedAt=1790356400519"),
  treatmentRoom: kit("interiorofnewmoderndentalclinicoffice-1-683x1024.jpg"),
  reception: kit("Receptionroominclinic.jpg"),
  before: kit("before-1-1024x355.jpg"),
  janeMiller: kit("Untitled-4-2.jpg"),
  jenniferD: kit("Untitled-5-2.jpg"),
  marieAnneD: kit("Untitled-6-2.jpg"),
};

export const site = {
  brand: {
    name: "Frankford Avenue Dental Group",
    logoLines: ["Frankford Avenue", "Dental Group"],
    wordmark: "Frankford", // giant cropped word at the bottom of the footer
    legalName: "Frankford Avenue Dental Group LLC",
    phone: { label: "(215) 333-4744", href: "tel:+12153334744" },
    email: "support@frankforddentistry.com",
    address: ["7538 Frankford Ave", "Philadelphia, PA 19136"],
    hours: "Mon – Fri, 9am – 8pm",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=7538+Frankford+Ave,+Philadelphia,+PA+19136",
    mapsEmbed: "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s7538+Frankford+Ave,+Philadelphia,+PA+19136!6i15",
  },

  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Team", href: "#team" },
    { label: "Appointments", href: "#book" },
  ] satisfies Link[],

  // "Book Appointment" buttons go to the clinic's Zocdoc page (opens in a new tab).
  // Any other link to "#book" still opens the on-site booking flow (components/booking/BookingDialog.tsx).
  bookCta: {
    label: "Book Appointment",
    href: "https://www.zocdoc.com/dentist/neelima-pitchika-dds-481832?LocIdent=252267&entity_id=pr_D0axZaBCuE6-8uUPMu0r1h-lo_8PalW5IzLkivxHFdfgUxBx-entity&rwg_token=AE37R_hC52G_TTRRofZoUf4dmo-HN6d8sfYulex6l9w-Fl-1sdgiVkkbdzOwzaV0D8K0efWUnSrwJps-zMEXXrPmZX2amt_K8A%3D%3D&dd_referrer=",
  } satisfies Link,

  hero: {
    titleTop: "Plan Your",
    titleBottom: ["Visit", "Now"], // white tooth icon sits between these two words
    text: "Begin the change. Expert, gentle dental care for Northeast Philadelphia families for more than 20 years.",
    image: {
      src: photos.hero,
      alt: "Smiling woman with a bright, healthy smile",
      position: "72% 30%",
    },
  },

  about: {
    eyebrow: "about us",
    title: ["A Warm Welcome and", "a Beautiful Smile"],
    text: "Our clients are our priority. At Frankford Avenue Dental Group, our team is enthusiastic about providing expert dental work and making sure every patient has a healthy foundation with great oral hygiene.",
    stat: { value: "8pm", label: "Evening appointments, Monday to Friday" },
    images: {
      left: {
        src: photos.reception,
        alt: "Bright reception desk at Frankford Avenue Dental Group",
        position: "center 70%",
      },
      right: {
        src: photos.neelima,
        alt: "Dr. Neelima Pitchika, DMD, BDS",
        position: "center 35%",
      },
      bottom: {
        src: unsplash("photo-1654373535457-383a0a4d00f9"),
        alt: "Close-up of a bright, healthy smile",
        position: "center 55%",
      },
    } satisfies Record<string, SiteImage>,
    /**
     * Before/after slider shown in place of the bottom photo.
     * It only appears once `after` is a different image from `before`.
     */
    beforeAfter: {
      before: { src: photos.before, alt: "Smile before whitening" },
      after: { src: photos.before, alt: "Smile after whitening" },
    } satisfies Record<"before" | "after", SiteImage>,
  },

  services: {
    title: ["Discover", "The Dental Clinic"],
    text: "Here are some of the main procedures that we routinely do, all under one roof on Frankford Avenue.",
    sideLabel: "our services",
    items: [
      {
        title: "Preventive Care",
        description: "Exams, cleanings, digital X-rays and gum care that catch small problems before they become big ones.",
        icon: "cavity",
        color: "sage",
        href: "#book",
      },
      {
        title: "Root Canals & Fillings",
        description: "Painless, one-visit root canals and tooth-coloured fillings that treat cavities and save your natural teeth.",
        icon: "rootCanal",
        color: "lavender",
        href: "#book",
      },
      {
        title: "Implants & Cosmetic",
        description: "Implants, crowns, bridges, veneers, Clear Correct aligners and professional whitening.",
        icon: "surgery",
        color: "sky",
        href: "#book",
      },
    ] satisfies {
      title: string;
      description: string;
      icon: ServiceIconName;
      color: ServiceColor;
      href: string;
    }[],
    video: {
      image: {
        src: unsplash("photo-1663755489920-5e09f66d011a"),
        alt: "Dentist in blue gloves examining a smiling patient's teeth",
        position: "center 40%",
      } satisfies SiteImage,
    },
  },

  works: {
    eyebrow: "patient stories",
    title: ["Our Cases &", "Patient Stories"],
    text: "Real smiles from our Frankford Avenue patients, from whitening to complete restorations.",
    community: {
      label: ["20+ years in", "Northeast Philly"],
      avatars: [
        { src: photos.janeMiller, alt: "", position: "center 30%" },
        { src: photos.jenniferD, alt: "", position: "center 30%" },
        { src: photos.marieAnneD, alt: "", position: "center 30%" },
      ] satisfies SiteImage[],
    },
    items: [
      {
        title: "Jane Miller",
        text: "Clinical case",
        image: { src: photos.janeMiller, alt: "Patient Jane Miller smiling", position: "center 45%" },
      },
      {
        title: "Jennifer D.",
        text: "Teeth whitening",
        image: { src: photos.jenniferD, alt: "Patient Jennifer D. smiling", position: "center 45%" },
      },
      {
        title: "Marie-Anne D.",
        text: "Clinical case",
        image: { src: photos.marieAnneD, alt: "Patient Marie-Anne D. smiling", position: "center 45%" },
      },
    ] satisfies { title: string; text: string; image: SiteImage }[],
  },

  costCare: {
    eyebrow: "our office",
    // "{icon}" marks where the small rounded photo sits inside the headline.
    title: ["About Our", "Dental {icon} Office"],
    titleIcon: {
      src: photos.anvarali,
      alt: "",
      crop: "faces",
    } satisfies SiteImage,
    note: "We have been at this location for more than 20 years, and we pride our business on oral expertise for Northeast Philly families.",
    text: "Our well-trained staff is dedicated to making sure our high standards are met for every patient who walks in the door. We treat patients using the latest technology, with thorough care during every examination, procedure and professional cleaning.",
    stat: { value: "20+", label: "Years caring for Northeast Philly" },
    images: {
      main: {
        src: photos.treatmentRoom,
        alt: "Modern treatment room with a dental chair and digital X-ray screen",
        position: "center 45%",
      },
      wide: {
        src: unsplash("photo-1662543701887-91f8f042a338"),
        alt: "Patient in the chair while gloved hands hold a dental mirror",
        position: "center 45%",
      },
      tall: {
        src: unsplash("photo-1749638479393-5f2b74e2a66c"),
        alt: "Dentist examining a patient",
        position: "40% center",
      },
    } satisfies Record<string, SiteImage>,
  },

  team: {
    title: "Meet the Team",
    text: "Two dentists with one philosophy: painless, stress-free dentistry and relationships that last.",
    members: [
      {
        name: "Dr. Anvarali Mohammadh",
        credentials: "DMD, BDS",
        image: { src: photos.anvarali, alt: "Dr. Anvarali Mohammadh", position: "center 30%" },
        bio: [
          "Dr. Anvarali Mohammadh graduated from the University of Medicine and Dentistry of New Jersey in 2010. What really separates Dr. Anvar from other dentists is his passion and love for the profession, and his strong desire to please every patient in his care.",
          "Dr. Anvar is a premier provider for Clear Correct and veneers, and excels in all aspects of cosmetic dentistry. Using the latest modern equipment and techniques, he provides painless one-visit root canals completed in just one hour or less, and has extensive experience in veneers, crown and bridge work.",
          "Dr. Anvar and his staff welcome you to our office and are always happy to answer your questions and meet your dental needs.",
        ],
      },
      {
        name: "Dr. Neelima Pitchika",
        credentials: "DMD, BDS",
        image: { src: photos.neelima, alt: "Dr. Neelima Pitchika", position: "center 30%" },
        bio: [
          "“Building long-lasting relationships is the best part of my job.” Dr. Neelima believes it's not just important to provide painless dentistry, but stress-less dentistry: explaining everything to patients so they know they're in control, and educating them about their procedure so the visit goes as effortlessly as possible.",
          "Dr. Neelima Pitchika earned her D.D.S. from the University of Colorado School of Dental Medicine. She is well trained in restorative, endodontic and surgical dentistry.",
          "In her free time, she enjoys time with family and friends, painting, cooking and reading.",
        ],
      },
    ] satisfies { name: string; credentials: string; image: SiteImage; bio: string[] }[],
  },

  visit: {
    title: "Getting Here",
    activeIndex: 1, // card shown in its photo state when nothing is hovered
    cards: [
      {
        label: "Location",
        title: ["7538 Frankford Ave", "Philadelphia, PA"],
        text: "On Frankford Avenue between Cottman Avenue and Rhawn Street, in Northeast Philadelphia.",
        link: { label: "Get directions", href: "https://www.google.com/maps/search/?api=1&query=7538+Frankford+Ave,+Philadelphia,+PA+19136" },
        image: { src: photos.treatmentRoom, alt: "", position: "center 45%" },
      },
      {
        label: "Opening hours",
        title: ["Monday – Friday", "9am – 8pm"],
        text: "Evening appointments available every weekday, so you can visit after work or school.",
        link: { label: "Book appointment", href: "#book" },
        image: { src: photos.reception, alt: "", position: "center 60%" },
      },
      {
        label: "Contact",
        title: ["(215) 333-4744", "Front desk"],
        text: "Call our front desk, email support@frankforddentistry.com, or send us a message below.",
        link: { label: "Call now", href: "tel:+12153334744" },
        image: { src: photos.hero, alt: "", position: "70% center" },
      },
    ] satisfies { label: string; title: string[]; text: string; link: Link; image: SiteImage }[],
  },

  booking: {
    /**
     * Where bookings are sent: any endpoint that accepts a JSON POST (e.g. a Formspree form URL
     * like "https://formspree.io/f/abcdwxyz"). Leave empty to only show the confirmation screen.
     */
    endpoint: "",
    title: ["Book Your", "Appointment"],
    intro: "Fill in the form and someone from our team will contact you as soon as possible to confirm.",
    steps: ["Reason for visit", "Preferred time", "Your details", "Review"],
    services: [
      { id: "exam", title: "Exam and Cleaning", description: "Routine check-up and professional cleaning.", duration: 60, color: "sage" },
      { id: "consultation", title: "Consultation", description: "Talk through a concern or treatment plan.", duration: 30, color: "beige" },
      { id: "emergency", title: "Emergency Visit", description: "Pain, swelling or a broken tooth.", duration: 30, color: "lavender" },
      { id: "cosmetic", title: "Cosmetic & Whitening", description: "Whitening, veneers or Clear Correct.", duration: 60, color: "sky" },
      { id: "referral", title: "Referral", description: "Referred to us by another provider.", duration: 30, color: "sage" },
      { id: "other", title: "Other", description: "Tell us more in the next steps.", duration: 30, color: "beige" },
    ] satisfies { id: string; title: string; description: string; duration: number; color: "sage" | "lavender" | "sky" | "beige" }[],
    patientTypes: ["New patient", "Returning patient"],
    daysAhead: 14,
    closedWeekdays: [0, 6], // Sunday, Saturday
    times: {
      Morning: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"],
      Afternoon: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"],
      Evening: ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30"],
    } satisfies Record<string, string[]>,
    consent: "I agree to be contacted by Frankford Avenue Dental Group about this appointment request.",
    success: {
      title: "Request received!",
      text: "Someone from our team will contact you as soon as possible to confirm your appointment.",
    },
  },

  footer: {
    title: ["Questions? Call Us Anytime", "or Send a Message"],
    contact: {
      /** Same as booking.endpoint: a JSON POST endpoint. Empty = confirm on screen only. */
      endpoint: "",
      success: "Thanks! We'll get back to you as soon as we can.",
    },
    columns: [
      {
        label: "Explore",
        links: [
          { label: "Home", href: "#home" },
          { label: "About Us", href: "#about" },
          { label: "Services", href: "#services" },
          { label: "Patient Stories", href: "#works" },
          { label: "Meet the Team", href: "#team" },
        ],
      },
      {
        label: "Visit",
        links: [
          { label: "7538 Frankford Ave", href: "https://www.google.com/maps/search/?api=1&query=7538+Frankford+Ave,+Philadelphia,+PA+19136" },
          { label: "Philadelphia, PA 19136", href: "https://www.google.com/maps/search/?api=1&query=7538+Frankford+Ave,+Philadelphia,+PA+19136" },
          { label: "Mon – Fri, 9am – 8pm", href: "#book" },
          { label: "(215) 333-4744", href: "tel:+12153334744" },
          { label: "support@frankforddentistry.com", href: "mailto:support@frankforddentistry.com" },
        ],
      },
      {
        // Add the clinic's profile URLs; links without an href are hidden.
        label: "Social",
        links: [
          { label: "Facebook", href: "" },
          { label: "Twitter", href: "" },
          { label: "Instagram", href: "" },
          { label: "Pinterest", href: "" },
        ],
      },
    ] satisfies { label: string; links: Link[] }[],
  },
};

export type Site = typeof site;
