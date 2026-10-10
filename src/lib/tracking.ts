declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const trackingConfig = {
  googleAdsId: "AW-18234588536",
  labels: {
    // The conversion label for successful form submissions (opens WhatsApp)
    formSubmit: process.env.NEXT_PUBLIC_GADS_LABEL_FORM || "",
    // The conversion label for clicks on WhatsApp buttons/links
    whatsappClick: process.env.NEXT_PUBLIC_GADS_LABEL_WHATSAPP || "",
    // The conversion label for clicks on telephone (tel:) links
    phoneClick: process.env.NEXT_PUBLIC_GADS_LABEL_PHONE || "",
  }
};

export const trackConversion = (action: keyof typeof trackingConfig.labels) => {
  if (typeof window !== "undefined" && window.gtag) {
    const label = trackingConfig.labels[action];
    if (label) {
      window.gtag("event", "conversion", {
        send_to: `${trackingConfig.googleAdsId}/${label}`,
      });
    } else {
      console.warn(`Google Ads Conversion Label missing for: ${action}. Set NEXT_PUBLIC_GADS_LABEL_${action.toUpperCase()} in .env`);
    }
  }
};
