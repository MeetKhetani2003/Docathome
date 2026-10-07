require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.DATABASE_URL;

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  place: { type: String, required: true },
  date: { type: String, required: true },
  quote: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);

const existingTestimonials = [
  {
    name: "Rajat Sharma",
    place: "Delhi",
    date: "2 weeks ago",
    quote: "Finding a qualified MBBS doctor at home in Delhi late at night seemed impossible until I found Docathome. The doctor arrived in 20 minutes for my father's severe fever. Extremely professional and reassuring.",
  },
  {
    name: "Priya Kapoor",
    place: "Gurgaon",
    date: "1 month ago",
    quote: "The best doctor home visit service in Gurgaon. I needed an urgent checkup for my toddler. The pediatrician was so gentle, wrote a clear prescription, and even followed up after two days.",
  },
  {
    name: "Anil Verma",
    place: "Noida",
    date: "3 weeks ago",
    quote: "Excellent home healthcare! My mother needed post-surgery dressing changes. The doctor came home exactly on time and maintained strict hygiene. Highly recommend for elderly care at home in Noida.",
  },
  {
    name: "Neha Singh",
    place: "Ghaziabad",
    date: "1 month ago",
    quote: "Booked a home visit doctor in Ghaziabad for my husband's food poisoning. Fast response, IV drip provided at home, and the flat ₹899 fee is incredibly reasonable for the quality of care.",
  },
  {
    name: "Vikram Malhotra",
    place: "South Delhi",
    date: "2 months ago",
    quote: "Very reliable house call doctor service. I had severe back pain and couldn't travel to a clinic. The doctor examined me at home, prescribed meds, and guided me perfectly.",
  },
  {
    name: "Meera Desai",
    place: "Gurgaon Sector 56",
    date: "3 months ago",
    quote: "I appreciate the transparency. They told me the exact arrival time and the doctor was very polite. A lifesaver for working parents who need a doctor at home quickly.",
  },
  {
    name: "Amitabh Banerjee",
    place: "Delhi NCR",
    date: "1 week ago",
    quote: "Having a doctor visit home is a blessing for senior citizens. The doctor checked my parents' blood pressure and sugar levels with immense patience. 5 stars for the service.",
  },
  {
    name: "Sneha Reddy",
    place: "Noida Sector 62",
    date: "2 weeks ago",
    quote: "I was down with a viral infection and couldn't sit in a clinic waiting room. The home consultation was thorough, and the 7-day free follow-up over WhatsApp is a fantastic feature.",
  },
  {
    name: "Karan Johar",
    place: "Delhi",
    date: "4 months ago",
    quote: "Top-notch medical care at home. The doctor was knowledgeable and explained the diagnosis in plain terms. Much better than rushed 2-minute clinic visits.",
  },
  {
    name: "Divya Agarwal",
    place: "Ghaziabad",
    date: "3 weeks ago",
    quote: "Super convenient! Used Docathome for routine blood tests and a doctor consultation for my grandmother. The entire process was seamless from booking to the actual visit.",
  },
  {
    name: "Suresh Pillai",
    place: "Delhi NCR",
    date: "2 months ago",
    quote: "Booking was effortless via WhatsApp. The doctor was at my doorstep in Delhi within 30 minutes. The ₹899 fee with no hidden charges is very honest.",
  },
  {
    name: "Aarti Chawla",
    place: "Gurgaon",
    date: "1 month ago",
    quote: "The doctor not only treated my son's ear infection but also calmed him down. The convenience of getting a trusted doctor at home in Gurgaon is unmatched.",
  }
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to DB");
  const count = await Testimonial.countDocuments();
  if (count === 0) {
    await Testimonial.insertMany(existingTestimonials);
    console.log("Inserted testimonials!");
  } else {
    console.log("Already has testimonials.");
  }
  process.exit(0);
}

seed();
