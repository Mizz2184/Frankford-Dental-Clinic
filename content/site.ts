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

/** Content for a service's own page (/services/<slug>/). */
export type ServicePage = {
  intro: string;
  hero: SiteImage;
  overview: { title: string[]; text: string[]; image: SiteImage; stat: { value: string; label: string } };
  treatments: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

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
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Team", href: "/#team" },
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
    // Each service has its own page at /services/<slug>/ (app/services/[slug]/page.tsx).
    items: [
      {
        slug: "preventive-care",
        title: "Preventive Care",
        description: "Exams, cleanings, digital X-rays and gum care that catch small problems before they become big ones.",
        icon: "cavity",
        color: "sage",
        page: {
          intro: "Regular exams and professional cleanings keep your smile healthy and catch small problems while they are still quick and easy to fix.",
          hero: {
            src: unsplash("photo-1663755489920-5e09f66d011a"),
            alt: "Dentist in blue gloves examining a smiling patient's teeth",
            position: "center 40%",
          },
          overview: {
            title: ["Healthy Teeth Start", "With Prevention"],
            text: [
              "Most dental problems start small and without pain. A routine visit lets us spot early decay, gum inflammation and worn fillings long before they turn into toothaches, root canals or lost teeth.",
              "Every check-up at Frankford Avenue Dental Group combines a thorough exam, a gentle professional cleaning and clear advice for your home care, for adults and children alike.",
            ],
            image: {
              src: photos.treatmentRoom,
              alt: "Modern treatment room with a dental chair and digital X-ray screen",
              position: "center 45%",
            },
            stat: { value: "2x", label: "Check-ups a year recommended for most patients" },
          },
          treatments: [
            { title: "Dental Exams", text: "A careful check of every tooth, your gums, bite and existing fillings, crowns or bridges." },
            { title: "Professional Cleanings", text: "Removal of plaque and hardened tartar that brushing can't reach, finished with a polish." },
            { title: "Digital X-rays", text: "Low-radiation images that show decay between teeth and below the gum line, with instant results." },
            { title: "Gum Care", text: "Early treatment of gingivitis and deep cleanings for gum disease to protect the bone around your teeth." },
            { title: "Oral Cancer Screening", text: "A quick, painless look at your mouth, tongue and throat as part of every routine exam." },
            { title: "Fluoride & Sealants", text: "Extra protection for children's and adults' teeth that are prone to cavities." },
          ],
          steps: [
            { title: "Welcome", text: "We review your health history and ask about any concerns or sensitivity you've noticed." },
            { title: "Exam & X-rays", text: "The dentist examines your teeth and gums, with digital X-rays when they are due." },
            { title: "Cleaning", text: "Your hygienist removes plaque and tartar, then polishes and flosses every tooth." },
            { title: "Your Plan", text: "We explain what we found, answer your questions and book your next visit." },
          ],
          faqs: [
            {
              question: "How often should I have a check-up?",
              answer: "For most people we recommend an exam and cleaning every six months. If you have gum disease or a higher risk of cavities, we may suggest visits every three to four months.",
            },
            {
              question: "Does a cleaning hurt?",
              answer: "Routine cleanings are comfortable for most patients. If your teeth or gums are sensitive, let us know and we'll go gently and can numb the area if needed.",
            },
            {
              question: "Are dental X-rays safe?",
              answer: "Yes. Digital X-rays use a very small amount of radiation, far less than traditional film, and we only take them when they are needed for your care.",
            },
            {
              question: "Do you see children?",
              answer: "Yes. We care for the whole family, and starting regular check-ups early helps children build good habits and feel at ease at the dentist.",
            },
          ],
        },
      },
      {
        slug: "root-canals-fillings",
        title: "Root Canals & Fillings",
        description: "Painless, one-visit root canals and tooth-coloured fillings that treat cavities and save your natural teeth.",
        icon: "rootCanal",
        color: "lavender",
        page: {
          intro: "Tooth-coloured fillings and painless, one-visit root canals that stop the pain and save your natural teeth.",
          hero: {
            src: unsplash("photo-1662543701887-91f8f042a338"),
            alt: "Patient in the chair while gloved hands hold a dental mirror",
            position: "center 45%",
          },
          overview: {
            title: ["Save Your Tooth,", "Stop the Pain"],
            text: [
              "When decay reaches past the enamel, a filling repairs the tooth before the damage spreads. When it reaches the nerve, a root canal removes the infection and lets you keep your own tooth instead of losing it.",
              "Using modern equipment and techniques, Dr. Anvar provides painless root canals in a single visit, usually completed in one hour or less.",
            ],
            image: {
              src: unsplash("photo-1749638479393-5f2b74e2a66c"),
              alt: "Dentist examining a patient",
              position: "40% center",
            },
            stat: { value: "1 hr", label: "Most one-visit root canals take an hour or less" },
          },
          treatments: [
            { title: "Tooth-Coloured Fillings", text: "Composite fillings matched to your natural shade, so repairs blend in with the rest of your smile." },
            { title: "One-Visit Root Canals", text: "Removal of infected or inflamed nerve tissue, then cleaning and sealing the tooth, in a single appointment." },
            { title: "Protective Crowns", text: "A custom crown after a root canal or large filling to strengthen the tooth and restore your bite." },
            { title: "Toothache Relief", text: "Prompt care for pain, swelling or sensitivity. Call us and we'll see you as soon as we can." },
            { title: "Replacing Old Fillings", text: "Swapping worn, leaking or dark silver fillings for strong, natural-looking composite." },
            { title: "Chipped & Cracked Teeth", text: "Bonding or crowns to repair damage and keep a cracked tooth from breaking further." },
          ],
          steps: [
            { title: "Diagnosis", text: "An exam and digital X-ray show how deep the decay or infection goes." },
            { title: "Comfort First", text: "We numb the area fully and check you're comfortable before we begin." },
            { title: "Treatment", text: "We remove the decay or infected tissue, then clean and seal the tooth." },
            { title: "Restore", text: "A filling or crown restores the tooth, and we check your bite before you leave." },
          ],
          faqs: [
            {
              question: "Does a root canal hurt?",
              answer: "With modern anaesthetic, a root canal feels much like getting a filling. Most patients say the procedure relieves the pain they came in with. Mild tenderness for a few days afterward is normal.",
            },
            {
              question: "How long does a root canal take?",
              answer: "Most root canals at our office are completed in a single visit of about an hour. Some teeth with several roots or a severe infection may need a second appointment.",
            },
            {
              question: "Will I need a crown after a root canal?",
              answer: "Back teeth usually need a crown afterward, because a treated tooth can become brittle. We'll tell you what your tooth needs during your visit.",
            },
            {
              question: "I have a toothache right now. What should I do?",
              answer: "Call us on (215) 333-4744. We keep time for urgent visits and are open until 8pm Monday to Friday. If you have swelling that affects your breathing or swallowing, go to the emergency room.",
            },
          ],
        },
      },
      {
        slug: "implants-cosmetic",
        title: "Implants & Cosmetic",
        description: "Implants, crowns, bridges, veneers, Clear Correct aligners and professional whitening.",
        icon: "surgery",
        color: "sky",
        page: {
          intro: "Replace missing teeth and refresh your smile with implants, crowns, veneers, Clear Correct aligners and professional whitening.",
          hero: {
            src: unsplash("photo-1654373535457-383a0a4d00f9"),
            alt: "Close-up of a bright, healthy smile",
            position: "center 55%",
          },
          overview: {
            title: ["A Smile You'll", "Love to Share"],
            text: [
              "Whether you're replacing a missing tooth or simply want a brighter, straighter smile, we start by listening to what you'd like to change, then explain every option so you can choose what's right for you.",
              "Dr. Anvar is a premier provider for Clear Correct and veneers, with extensive experience in crown and bridge work and all aspects of cosmetic dentistry.",
            ],
            image: {
              src: photos.reception,
              alt: "Bright reception desk at Frankford Avenue Dental Group",
              position: "center 70%",
            },
            stat: { value: "Premier", label: "Clear Correct and veneers provider" },
          },
          treatments: [
            { title: "Dental Implants", text: "A permanent replacement for a missing tooth that looks, feels and works like a natural one." },
            { title: "Crowns", text: "Natural-looking caps that restore broken, worn or weakened teeth to full strength." },
            { title: "Bridges", text: "Fixed replacement teeth anchored to the teeth on either side of a gap." },
            { title: "Porcelain Veneers", text: "Thin, custom shells that cover chips, gaps, stains and uneven teeth." },
            { title: "Clear Correct Aligners", text: "Nearly invisible, removable aligners that straighten teeth without metal braces." },
            { title: "Professional Whitening", text: "Safe whitening that lifts years of coffee, tea and everyday stains." },
          ],
          steps: [
            { title: "Consultation", text: "Tell us what you'd like to change. We examine your teeth and take the images we need." },
            { title: "Your Options", text: "We walk you through each treatment, the timeline and the cost before anything begins." },
            { title: "Treatment", text: "Your treatment is completed with care, over one visit or several depending on the plan." },
            { title: "Aftercare", text: "We check the result, fine-tune your bite and show you how to keep your new smile bright." },
          ],
          faqs: [
            {
              question: "Am I a candidate for dental implants?",
              answer: "Most adults with healthy gums and enough jawbone can have an implant. We'll check your gums and bone with an exam and X-rays during a consultation and explain every option, including bridges.",
            },
            {
              question: "How does Clear Correct compare to braces?",
              answer: "Clear Correct uses a series of clear, removable aligners instead of brackets and wires. They're nearly invisible, you can take them out to eat and brush, and they suit many mild to moderate cases.",
            },
            {
              question: "Do veneers look natural?",
              answer: "Yes. Veneers are custom-made to match the shape and shade you choose, so they blend in with your smile and reflect light like natural enamel.",
            },
            {
              question: "How long does professional whitening last?",
              answer: "Results often last a year or more. How long they last depends on your habits: coffee, tea, red wine and smoking all bring stains back sooner.",
            },
          ],
        },
      },
    ] satisfies {
      slug: string;
      title: string;
      description: string;
      icon: ServiceIconName;
      color: ServiceColor;
      page: ServicePage;
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
        image: { src: photos.neelima, alt: "Dr. Neelima Pitchika", crop: "faces" },
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
          { label: "Home", href: "/#home" },
          { label: "About Us", href: "/#about" },
          { label: "Services", href: "/#services" },
          { label: "Patient Stories", href: "/#works" },
          { label: "Meet the Team", href: "/#team" },
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

/** URL of a service's own page. */
export const servicePath = (slug: string) => `/services/${slug}/`;
