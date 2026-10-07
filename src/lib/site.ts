/**
 * Single source of truth for Docathome business content.
 * Everything visible on the site is derived from this file where practical,
 * so a CMS or a copy review can replace one file instead of thirty.
 */

export const siteConfig = {
  name: "Docathome",
  legalName: "Docathome",
  descriptor: "Doctor home visits across Delhi NCR",
  tagline: "A qualified doctor, at your door.",
  description:
    "Book a doctor home visit in Delhi, Gurgaon, Noida, Ghaziabad and Dwarka. Flat ₹899 visit fee, pay after the visit, and one week of free follow-up.",
  /** Used for canonical URLs + structured data. Override with NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://docathome.in",
  phone: {
    display: "+91 96258 53584",
    href: "tel:+919625853584",
    whatsapp: "https://wa.me/919625853584",
  },
  price: {
    amount: "₹899",
    label: "Flat visit fee",
    note: "Pay ₹899 after the visit.",
  },
  arrival: {
    short: "~15 min",
    label: "Typical arrival",
    sentence: "The doctor usually reaches in about 15 minutes.",
  },
  followUp: {
    short: "1 week",
    label: "Free follow-up",
    sentence: "One week of free follow-up after your visit.",
  },
  areasLabel: "Delhi NCR",
  emergency: {
    number: "112",
    href: "tel:112",
  },
  hours: "Bookings are taken by phone and WhatsApp.",
} as const;

export const heroTrust = [
  { value: "₹899", label: "Flat visit fee" },
  { value: "~15 min", label: "Typical arrival" },
  { value: "1 week", label: "Free follow-up" },
  { value: "Delhi NCR", label: "Home visits" },
];

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Services", href: "/services" },
  { label: "Areas", href: "/#areas" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Book a Visit", href: "/book" },
];

export const footerNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Services", href: "/services" },
  { label: "Service areas", href: "/#areas" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Book a visit", href: "/book" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Medical Disclaimer", href: "/medical-disclaimer" },
];

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  summary: string;
  intro: string;
  covers: string[];
  who: string;
  expect: string[];
  usefulWhen: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "fever-infections",
    name: "Fever & Infections",
    shortName: "Fever & infections",
    icon: "thermometer",
    summary: "Viral fever, cough and cold, throat and stomach infections.",
    intro:
      "A doctor comes to you for fever and common infections, examines the patient at home, explains what is likely going on and writes down the medicines to take.",
    covers: [
      "Viral fever and high temperature",
      "Cough, cold and throat infection",
      "Stomach infection, loose motion, vomiting",
      "Body ache, weakness and tiredness with fever",
      "Advice on tests when the doctor feels they are needed",
    ],
    who: "Adults and children with fever or infection who would rather be examined at home than sit in a clinic waiting room.",
    expect: [
      "The doctor asks about symptoms, how long they have lasted and any existing conditions.",
      "A physical examination at home, with vitals checked.",
      "A written prescription with clear dosing and duration.",
      "Home-care advice: what to eat, what to watch for, when to call again.",
      "One week of free follow-up if symptoms continue.",
    ],
    usefulWhen: [
      "Fever has started but the patient is too weak to travel",
      "A young child or an elderly parent is unwell at night or early morning",
      "You want an opinion before deciding whether a hospital visit is needed",
    ],
    faqs: [
      {
        q: "Can the doctor come for a child with fever?",
        a: "Yes. Children's common concerns such as fever, rashes and stomach upset are among the conditions listed for home visits. Please tell us the child's age when you book.",
      },
      {
        q: "Will the doctor prescribe medicines during the visit?",
        a: "The doctor examines the patient and writes a prescription with clear medicine instructions. We do not give medical advice on this website without an examination.",
      },
    ],
  },
  {
    slug: "elderly-care",
    name: "Elderly Care",
    shortName: "Elderly care",
    icon: "heart",
    summary: "Regular checks for patients who find it hard to travel.",
    intro:
      "For older patients, travel is often the hardest part of a clinic visit. Docathome brings the consultation to them, at their own table, in their own chair.",
    covers: [
      "Regular check-ups for patients who find travel difficult",
      "Fever, infection and general weakness in older adults",
      "Blood pressure and sugar monitoring",
      "Medicine review and advice for long-term conditions",
      "Post-illness weakness and mobility concerns",
    ],
    who: "Elderly parents, patients with limited mobility, bed-assisted patients, and the family members who coordinate their care.",
    expect: [
      "The doctor examines the patient where they are most comfortable.",
      "Current medicines are reviewed with the family present.",
      "Vitals are recorded and explained in plain language.",
      "You are told what to watch for and when to call again.",
      "Follow-up within one week is free.",
    ],
    usefulWhen: [
      "A parent needs a routine check but cannot manage the trip to a clinic",
      "You are a caregiver and want a medical opinion without moving the patient",
      "There is a sudden change in an elderly patient who is otherwise stable",
    ],
    faqs: [
      {
        q: "Can a family member book for an elderly parent?",
        a: "Yes. A family member can contact us and provide the patient's details, symptoms and location. The patient does not need to make the call themselves.",
      },
      {
        q: "Do you handle bedridden patients?",
        a: "Please call us and describe the situation so we can confirm that a home visit is appropriate for the patient's condition before we dispatch a doctor.",
      },
    ],
  },
  {
    slug: "blood-pressure-sugar",
    name: "Blood Pressure & Sugar",
    shortName: "BP & sugar",
    icon: "gauge",
    summary: "Monitoring, medicine review and advice for long-term conditions.",
    intro:
      "Long-term conditions need steady follow-up rather than occasional urgent visits. The doctor checks your readings at home and reviews the medicines you are already taking.",
    covers: [
      "Blood pressure checks and review",
      "Blood sugar monitoring and review",
      "Medicine review for long-term conditions",
      "Advice on lifestyle and reporting patterns",
      "Guidance on when a laboratory or hospital review is needed",
    ],
    who: "People managing hypertension, diabetes or other ongoing conditions, and families who monitor readings for them.",
    expect: [
      "Readings are taken at home and compared with what you report.",
      "The doctor reviews the current prescription with you.",
      "You get clear written instructions on what to continue and what to change only as advised.",
      "Free follow-up for one week for questions about the medicines.",
    ],
    usefulWhen: [
      "Readings have been irregular for a few days",
      "You want a medicine review without travelling to a clinic",
      "An elderly relative needs a scheduled check",
    ],
    faqs: [
      {
        q: "Should I stop or change medicines on my own?",
        a: "No. Any change in long-term medication should be made by a qualified doctor after examination. The home visit gives you that review without travel.",
      },
    ],
  },
  {
    slug: "children",
    name: "Children",
    shortName: "Children",
    icon: "child",
    summary: "Fever, rashes, stomach upset and routine concerns, seen at home.",
    intro:
      "Sick children are often worst at night, and taking a feverish child through traffic adds stress. The doctor examines them in familiar surroundings while a parent stays close.",
    covers: [
      "Fever in children",
      "Rashes and skin irritation",
      "Stomach upset, loose motion, vomiting",
      "Cough, cold and throat complaints",
      "Weight, appetite and general concerns parents want checked",
    ],
    who: "Parents and grandparents caring for a child who is unwell but does not need an emergency department.",
    expect: [
      "The doctor examines the child calmly, with the parent present throughout.",
      "Dosage is written clearly, in a way a parent can follow at night.",
      "You are told which warning signs mean you should go to hospital.",
      "One week free follow-up for questions and re-checks.",
    ],
    usefulWhen: [
      "A child develops fever after clinic hours",
      "There is more than one sick child at home",
      "You want a medical opinion before deciding on a hospital trip",
    ],
    faqs: [
      {
        q: "Is a home visit suitable for a very young infant?",
        a: "Please call us first and tell us the age and symptoms. For babies with danger signs, we will advise you to go to the nearest hospital rather than wait for a home visit.",
      },
    ],
  },
  {
    slug: "injury-dressing",
    name: "Injury, Suturing & Dressing",
    shortName: "Injury & dressing",
    icon: "bandage",
    summary: "Minor cuts and wounds, stitches, dressing changes and follow-up after procedures.",
    intro:
      "Wound care is routine but it needs repeating, and every repeat means a trip. Docathome covers minor injuries and the dressing follow-up that comes after them.",
    covers: [
      "Minor cuts and wounds",
      "Suturing where appropriate",
      "Dressing changes",
      "Follow-up after procedures",
      "Stitch removal review and wound checks",
    ],
    who: "Patients with minor injuries, and anyone whose wound needs repeated dressing that would otherwise mean daily travel.",
    expect: [
      "The doctor assesses the wound and whether a home visit is appropriate.",
      "Cleaning, suturing or dressing is done at home with the required kit.",
      "You are told how to keep the wound between visits and what to watch for.",
      "Follow-up visits for dressing are arranged by phone or WhatsApp.",
    ],
    usefulWhen: [
      "A small cut needs stitches but is not a heavy-bleeding emergency",
      "Dressing must be changed again in a few days",
      "An elderly patient has a wound and cannot easily travel for changes",
    ],
    faqs: [
      {
        q: "What if the bleeding is heavy?",
        a: "Heavy bleeding is an emergency. Call 112 or go to the nearest hospital right away instead of waiting for a home visit.",
      },
    ],
  },
  {
    slug: "prescriptions",
    name: "Prescriptions",
    shortName: "Prescriptions",
    icon: "prescription",
    summary: "Written prescription after examination, with clear instructions.",
    intro:
      "Every Docathome visit ends with something you can hold: a written prescription and plain-language instructions on how to take the medicines.",
    covers: [
      "Written prescription after examination",
      "Clear medicine instructions: dose, timing, duration",
      "Medicine review for ongoing conditions",
      "Advice on what to do if symptoms continue",
      "Guidance on tests where the doctor considers them necessary",
    ],
    who: "Patients who want an examined, documented prescription rather than advice over the phone.",
    expect: [
      "The doctor examines the patient before writing anything.",
      "The prescription lists medicines with timing and duration.",
      "You can ask questions before the doctor leaves.",
      "Questions about the same prescription within one week are free.",
    ],
    usefulWhen: [
      "You need a fresh prescription after an examination",
      "Existing medicines need review by a doctor",
      "A family member needs documentation for the patient's records",
    ],
    faqs: [
      {
        q: "Do you provide prescriptions without an examination?",
        a: "No. A prescription is written after the doctor has examined the patient at home.",
      },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

/* ------------------------------------------------------------------ */
/* Areas                                                               */
/* ------------------------------------------------------------------ */

export type Area = {
  slug: string;
  name: string;
  region: string;
  line: string;
  note: string;
};

export const areas: Area[] = [
  {
    slug: "delhi",
    name: "Delhi",
    region: "NCT of Delhi",
    line: "Doctor home visits across Delhi",
    note: "We currently list Delhi as a service city. Call us to confirm your exact locality before booking.",
  },
  {
    slug: "gurgaon",
    name: "Gurgaon",
    region: "Haryana",
    line: "Doctor home visits in Gurgaon",
    note: "Gurgaon is listed as a Docathome service city. Availability by sector is confirmed on call.",
  },
  {
    slug: "noida",
    name: "Noida",
    region: "Uttar Pradesh",
    line: "Doctor home visits in Noida",
    note: "Noida is listed as a Docathome service city. Please confirm your locality when you call or WhatsApp.",
  },
  {
    slug: "ghaziabad",
    name: "Ghaziabad",
    region: "Uttar Pradesh",
    line: "Doctor home visits in Ghaziabad",
    note: "Ghaziabad is listed as a Docathome service city. Coverage of your exact area is confirmed on call.",
  },
  {
    slug: "dwarka",
    name: "Dwarka",
    region: "South West Delhi",
    line: "Doctor home visits in Dwarka",
    note: "Dwarka is listed as a Docathome service area. Call to confirm your sector before booking.",
  },
];

export const areaBySlug = (slug: string) => areas.find((a) => a.slug === slug);

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export const steps = [
  {
    n: "01",
    title: "Call or message",
    body: "Tell us the patient's age, symptoms and your address. A phone call or a WhatsApp message is enough — no account, no app, no form to sign.",
    icon: "chat",
  },
  {
    n: "02",
    title: "We confirm the visit",
    body: "We confirm the arrival time. The doctor usually reaches you in about 15 minutes, depending on your location and availability.",
    icon: "clock",
  },
  {
    n: "03",
    title: "Examination at home",
    body: "The doctor examines the patient, explains the diagnosis and writes the prescription. You pay the ₹899 fee only after the visit.",
    icon: "stethoscope",
  },
  {
    n: "04",
    title: "One week free follow-up",
    body: "For one week after the visit, follow-up is free. Call or WhatsApp us if symptoms continue or you have questions about the medicines.",
    icon: "refresh",
  },
];

export const whyDocathome = [
  {
    icon: "house",
    title: "The doctor comes to you",
    body: "No transport to arrange, no parking to find, no carrying a feverish patient through a waiting room.",
  },
  {
    icon: "route",
    title: "Avoid clinic travel",
    body: "One of the biggest burdens of a routine consultation is the journey there and back. Remove it.",
  },
  {
    icon: "sofa",
    title: "Examined where you are comfortable",
    body: "Your own chair, your own medicines on the table, family in the room. Better information for the doctor too.",
  },
  {
    icon: "rupee",
    title: "Transparent ₹899 visit fee",
    body: "A flat ₹899 for the visit, paid after the doctor has examined the patient. No hidden consultation markup on this page.",
  },
  {
    icon: "refresh",
    title: "One week free follow-up",
    body: "If symptoms continue or you have questions about the medicines, the follow-up within one week is free.",
  },
  {
    icon: "phone",
    title: "Book in under a minute",
    body: "Call +91 96258 53584 or send us a WhatsApp message. A person reads it and replies — booking is not left to a bot.",
  },
];

export const comparison = [
  { label: "Travelling with a sick patient", home: "Stay comfortably at home" },
  { label: "Waiting room and queue", home: "Examination in your own living room" },
  { label: "Finding transport and parking", home: "The doctor comes to your address" },
  { label: "Repeated travel for follow-up", home: "One week free follow-up" },
  { label: "Unpredictable consultation charges", home: "Flat ₹899, paid after the visit" },
];

export const trustPoints = [
  {
    icon: "badge",
    title: "Well-qualified MBBS doctors and specialists",
    body: "Our MBBS doctors, and specialists when your condition needs one, come to your home.",
  },
  {
    icon: "rupee",
    title: "Pay ₹899 after the visit",
    body: "The flat visit fee is settled once the doctor has examined the patient.",
  },
  {
    icon: "chat",
    title: "A real person answers",
    body: "Call or WhatsApp us with the patient's details. We confirm the visit before anything is arranged.",
  },
  {
    icon: "shield",
    title: "Clear limits on what we do",
    body: "Docathome is for appropriate non-emergency care. Emergencies need 112 or the nearest hospital.",
  },
];

export const experienceNotes = [
  {
    icon: "clipboard",
    title: "What the doctor needs from you",
    items: [
      "The patient's name and age",
      "The main symptoms and since when",
      "Your area and building details",
      "Any ongoing conditions and current medicines",
    ],
  },
  {
    icon: "house",
    title: "How to prepare your home",
    items: [
      "Keep the patient's medicines and past reports together",
      "A chair or bed with some light, and a space to examine",
      "A family member present if the patient needs help",
      "Phone reachable in case the doctor needs directions",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export type Faq = { q: string; a: string; group?: string };

export const faqs: Faq[] = [
  {
    q: "How much does a home doctor visit cost?",
    a: "The flat visit fee is ₹899. Payment is made after the visit.",
    group: "Pricing",
  },
  {
    q: "How quickly can the doctor reach me?",
    a: "The doctor usually reaches in about 15 minutes. Please call to confirm availability for your exact location.",
    group: "Timing",
  },
  {
    q: "Which areas do you cover?",
    a: "Delhi, Gurgaon, Noida, Ghaziabad and Dwarka. Call us to confirm your exact locality.",
    group: "Coverage",
  },
  {
    q: "Can I book for my parent?",
    a: "Yes. A family member can contact us and provide the patient's details, symptoms and location.",
    group: "Booking",
  },
  {
    q: "How do I book?",
    a: "Call or WhatsApp +91 96258 53584. You can also use the request form on this page — it opens WhatsApp with your details written out for you.",
    group: "Booking",
  },
  {
    q: "Is follow-up included?",
    a: "One week of follow-up is free after the visit.",
    group: "After the visit",
  },
  {
    q: "Can I book for a child?",
    a: "Children's common concerns such as fever, rashes and stomach upset are among the conditions listed for home visits.",
    group: "Booking",
  },
  {
    q: "What should I do in an emergency?",
    a: "For chest pain, breathing trouble, heavy bleeding or loss of consciousness, call 112 or go to the nearest hospital immediately.",
    group: "Safety",
  },
  {
    q: "Do I need to pay before the visit?",
    a: "No. You pay the ₹899 visit fee after the doctor has examined the patient.",
    group: "Pricing",
  },
  {
    q: "Will the doctor write a prescription?",
    a: "Yes. A written prescription is provided after examination, with clear medicine instructions.",
    group: "After the visit",
  },
  {
    q: "Is Docathome an ambulance or emergency service?",
    a: "No. Docathome provides doctor home visits for appropriate non-emergency care. Serious emergency symptoms need 112 or the nearest hospital.",
    group: "Safety",
  },
  {
    q: "What information is stored when I use the booking form?",
    a: "Nothing is stored on this page. The form simply writes your details into a WhatsApp message and opens it, so you can read it before sending.",
    group: "Privacy",
  },
];

export const homeFaqSubset = [0, 1, 2, 3, 4, 5, 7];

/* ------------------------------------------------------------------ */
/* Misc                                                                */
/* ------------------------------------------------------------------ */

export const timings = ["As soon as possible", "Today", "Tomorrow"] as const;

export const demoNote =
  "Sample patient feedback — replace with verified reviews before launch.";
