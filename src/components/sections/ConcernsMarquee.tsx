"use client";

import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";

type Concern = {
  label: string;
  icon: IconName;
  color: "green" | "orange";
};

const row1: Concern[] = [
  { label: "Weakness & Fatigue", icon: "leaf", color: "green" },
  { label: "Fever & High Temperature", icon: "thermometer", color: "green" },
  { label: "Blood Pressure & Sugar", icon: "gauge", color: "orange" },
  { label: "Cold, Flu & Seasonal Illness", icon: "leaf", color: "green" },
  { label: "Breathing & Chest Discomfort", icon: "heart", color: "orange" },
];

const row2: Concern[] = [
  { label: "Childhood Illness & Fever", icon: "child", color: "orange" },
  { label: "Elderly Health Assessment", icon: "users", color: "green" },
  { label: "Joint Pain & Backache", icon: "shield", color: "orange" },
  { label: "Dengue & Typhoid Care", icon: "shield", color: "green" },
  { label: "Diabetes Management", icon: "shield", color: "green" },
  { label: "Emergency First Response", icon: "alert", color: "orange" },
  { label: "Post-Operative Recovery", icon: "bandage", color: "orange" },
  { label: "General Unwellness", icon: "stethoscope", color: "orange" },
];

function MarqueeRow({ items, reverse = false }: { items: Concern[]; reverse?: boolean }) {
  // Duplicate items enough times so that ONE single track is wider than any screen (e.g., 4 times)
  const trackItems = [...items, ...items, ...items, ...items];
  
  const animationClass = reverse ? "animate-marquee-new-reverse" : "animate-marquee-new";
  
  return (
    <div className="flex w-full overflow-hidden group gap-4">
      {/* Track 1 */}
      <div className={cn("flex shrink-0 gap-4 group-hover:[animation-play-state:paused]", animationClass)}>
        {trackItems.map((c, i) => (
          <div
            key={`t1-${i}`}
            className={cn(
              "flex items-center gap-2 rounded-full px-5 py-2.5 whitespace-nowrap border border-transparent transition-colors",
              c.color === "green" 
                ? "bg-[#eef5f4] text-[#2c534f] hover:border-[#2c534f]/20" 
                : "bg-[#fdf3e7] text-[#865d2f] hover:border-[#865d2f]/20"
            )}
          >
            <Icon name={c.icon} size={18} className={c.color === "green" ? "text-[#2c534f]" : "text-[#865d2f]"} />
            <span className="text-[0.95rem] font-semibold">{c.label}</span>
          </div>
        ))}
      </div>
      
      {/* Track 2 (Seamless loop copy) */}
      <div className={cn("flex shrink-0 gap-4 group-hover:[animation-play-state:paused]", animationClass)} aria-hidden="true">
        {trackItems.map((c, i) => (
          <div
            key={`t2-${i}`}
            className={cn(
              "flex items-center gap-2 rounded-full px-5 py-2.5 whitespace-nowrap border border-transparent transition-colors",
              c.color === "green" 
                ? "bg-[#eef5f4] text-[#2c534f] hover:border-[#2c534f]/20" 
                : "bg-[#fdf3e7] text-[#865d2f] hover:border-[#865d2f]/20"
            )}
          >
            <Icon name={c.icon} size={18} className={c.color === "green" ? "text-[#2c534f]" : "text-[#865d2f]"} />
            <span className="text-[0.95rem] font-semibold">{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ConcernsMarquee() {
  return (
    <section className="bg-surface py-12 md:py-16 overflow-hidden">
      <div className="shell mb-8 text-center max-w-4xl mx-auto">
        <p className="text-[1.05rem] leading-relaxed text-muted">
          From a 4 a.m. fever to BP, sugar or an elderly parent&apos;s check-up, your doctor reviews your case before they knock. Explore care by concern:
        </p>
      </div>

      {/* Relative container for fading edges */}
      <div className="relative flex flex-col gap-4">
        {/* Left fade gradient */}
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 md:w-32 bg-gradient-to-r from-surface to-transparent" />
        {/* Right fade gradient */}
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 md:w-32 bg-gradient-to-l from-surface to-transparent" />

        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}
