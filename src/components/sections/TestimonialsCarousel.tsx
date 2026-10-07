"use client";

import { useRef } from "react";
import { Icon } from "@/components/icons";

const testimonials = [
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
    quote: "Called Docathome for my grandmother. The doctor was very empathetic, reviewed her old files, and adjusted her medication. We finally found a reliable family doctor who visits home.",
  },
  {
    name: "Suresh Pillai",
    place: "Delhi",
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

export type TestimonialData = {
  _id?: string;
  name: string;
  place: string;
  date: string;
  quote: string;
};

export function TestimonialsCarousel({ data }: { data?: TestimonialData[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayData = data && data.length > 0 ? data : testimonials;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350; 
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="patients" className="section overflow-hidden bg-surface py-16">
      <div className="shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Patient experience</p>
            <h2 className="h2 text-brand-deep">What families tell us matters</h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
              Real stories from patients across Delhi NCR who trusted Docathome for their healthcare needs.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-end">
            <button
              onClick={() => scroll("left")}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-brand-deep shadow-sm transition-colors hover:bg-brand hover:text-white hover:border-brand"
              aria-label="Previous testimonials"
            >
              <Icon name="chevronDown" className="rotate-90" size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-brand-deep shadow-sm transition-colors hover:bg-brand hover:text-white hover:border-brand"
              aria-label="Next testimonials"
            >
              <Icon name="chevronDown" className="-rotate-90" size={20} />
            </button>
          </div>
        </div>

        <div className="relative mt-12 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {displayData.map((t, i) => (
              <div
                key={t._id || i}
                className="card flex w-[85vw] max-w-[380px] shrink-0 snap-center flex-col justify-between p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[350px] bg-white border border-line/60 rounded-[22px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#fbbc04]">
                      {[...Array(5)].map((_, idx) => (
                        <svg key={idx} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[1.1rem] h-[1.1rem]">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f8f9fa] border border-line px-2.5 py-1 text-[0.72rem] font-bold text-brand-deep">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Verified
                    </span>
                  </div>
                  <blockquote className="mt-2 text-[0.98rem] leading-relaxed text-brand-deep/85">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>
                
                <div className="mt-6 flex items-center gap-3 pt-5 border-t border-line/50">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 font-bold text-brand uppercase">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[0.92rem] font-bold text-brand-deep">{t.name}</p>
                    <p className="text-[0.8rem] text-muted">{t.place} • {t.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  );
}
