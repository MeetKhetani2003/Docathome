"use client";

import { useEffect } from "react";
import { trackConversion } from "@/lib/tracking";

export function ConversionTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Find the closest anchor tag that was clicked
      const target = (e.target as Element).closest("a");
      if (!target) return;

      const href = target.getAttribute("href") || "";

      if (href.startsWith("tel:")) {
        trackConversion("phoneClick");
      } else if (href.includes("wa.me") || href.includes("whatsapp.com") || href.includes("api.whatsapp.com")) {
        trackConversion("whatsappClick");
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
