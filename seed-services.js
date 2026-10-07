require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.DATABASE_URL;

const FaqSchema = new mongoose.Schema({
  q: { type: String, required: true },
  a: { type: String, required: true },
});

const ServiceSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  icon: { type: String, required: true },
  summary: { type: String, required: true },
  intro: { type: String, required: true },
  covers: [{ type: String }],
  who: { type: String, required: true },
  expect: [{ type: String }],
  usefulWhen: [{ type: String }],
  faqs: [FaqSchema],
  createdAt: { type: Date, default: Date.now },
});

const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);

const services = [
  {
    slug: "general-consultation",
    name: "General Doctor Consultation",
    shortName: "General checkup",
    icon: "stethoscope",
    summary: "Complete clinical examination and prescription for most routine illnesses.",
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
    summary: "Professional cleaning, suturing and dressing for non-emergency injuries.",
    intro:
      "A minor cut or burn needs clean, careful attention, not a crowded waiting room. We provide professional wound care, suturing and dressing changes in a clean home environment.",
    covers: [
      "Cleaning and dressing of minor cuts, scrapes and burns",
      "Suturing (stitches) for simple lacerations",
      "Suture removal after healing",
      "Post-surgery dressing changes",
      "Diabetic foot ulcer care and advice",
    ],
    who: "Anyone with a minor injury, patients recovering from surgery, and those needing regular dressing changes without travel.",
    expect: [
      "The wound is assessed to ensure it does not need a hospital setting.",
      "Sterile equipment is used for cleaning and dressing.",
      "Pain relief is prescribed if appropriate.",
      "You are given clear instructions on keeping the dressing dry and clean.",
      "We schedule follow-up visits for dressing changes if required.",
    ],
    usefulWhen: [
      "A kitchen knife slip needs a few stitches",
      "An elderly patient needs a surgical dressing changed every two days",
      "A child has a scrape that looks infected",
    ],
    faqs: [
      {
        q: "Do you bring all the necessary supplies?",
        a: "Yes, our doctors carry sterile dressing kits, sutures, and basic local anesthetics for minor procedures.",
      },
      {
        q: "Can you handle deep cuts or heavy bleeding?",
        a: "No. Heavy bleeding, deep wounds, or injuries involving bones must be treated in a hospital emergency room immediately.",
      },
    ],
  },
  {
    slug: "injection-drip",
    name: "Injection & IV Drip",
    shortName: "Injection & IV drip",
    icon: "syringe",
    summary: "Prescribed injections and IV fluids administered safely at home.",
    intro:
      "When you need a single injection or a course of IV antibiotics, travelling to a clinic every time is exhausting. We administer prescribed treatments safely at home.",
    covers: [
      "Intramuscular (IM) and Intravenous (IV) injections",
      "IV fluid administration for dehydration",
      "Administration of prescribed IV antibiotics",
      "Vitamin injections (as prescribed)",
      "Canula insertion and removal",
    ],
    who: "Patients recovering from illness, those with severe dehydration from stomach upsets, and patients requiring daily antibiotic courses.",
    expect: [
      "The doctor verifies your existing prescription before any administration.",
      "Vitals are checked before and after the procedure.",
      "The procedure is done using sterile, single-use equipment.",
      "The doctor monitors you for any immediate adverse reactions.",
    ],
    usefulWhen: [
      "You have a bout of food poisoning and need IV fluids",
      "A hospital has discharged you but you need three more days of IV antibiotics",
      "You need a routine B12 or iron injection",
    ],
    faqs: [
      {
        q: "Do you provide the medicines or just administer them?",
        a: "We can provide basic fluids and common injectables, which will be billed at MRP. For specific antibiotics or specialized medicines, you must procure them based on your prescription.",
      },
      {
        q: "Will you administer an injection without a prescription?",
        a: "No. We strictly require a valid prescription from a registered medical practitioner for any injection or IV drip, unless it is prescribed by our own doctor during the visit.",
      },
    ],
  }
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to DB");
  const count = await Service.countDocuments();
  if (count === 0) {
    await Service.insertMany(services);
    console.log("Inserted services!");
  } else {
    console.log("Already has services.");
  }
  process.exit(0);
}

seed();
