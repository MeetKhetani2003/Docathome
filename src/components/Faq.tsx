"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";
import type { Faq as FaqType } from "@/lib/site";

export function FaqAccordion({
  items,
  idPrefix = "faq",
  className,
}: {
  items: FaqType[];
  idPrefix?: string;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-line overflow-hidden rounded-[18px] border border-line bg-surface", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3 className="m-0">
              <button
                type="button"
                id={`${idPrefix}-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  "flex w-full items-start gap-4 px-4 py-4 text-left transition-colors sm:px-5 sm:py-5",
                  isOpen ? "bg-brand-tint/45" : "hover:bg-brand-tint/30",
                )}
              >
                <span className="num mt-0.5 hidden text-[0.82rem] font-bold text-brand/70 sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-display text-[1.04rem] font-bold leading-snug text-brand-deep sm:text-[1.1rem]">
                  {item.q}
                </span>
                <span
                  className={cn(
                    "mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-brand transition-transform duration-300",
                    isOpen && "rotate-180 border-brand bg-brand text-white",
                  )}
                  aria-hidden="true"
                >
                  <Icon name="chevronDown" size={17} />
                </span>
              </button>
            </h3>
            <div id={`${idPrefix}-panel-${i}`} role="region" aria-labelledby={`${idPrefix}-btn-${i}`} className="acc-panel" data-open={isOpen}>
              <div>
                <p className="px-4 pb-5 text-[0.98rem] leading-relaxed text-muted sm:px-5 sm:pl-[3.6rem]">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
