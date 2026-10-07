import type { SVGProps } from "react";

/**
 * Docathome icon set — a single coherent family drawn on a 24x24 grid,
 * 1.6 stroke, round caps. Do not mix with another icon library.
 */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 24, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconStethoscope = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 3.5v4a3.6 3.6 0 0 0 7.2 0v-4" />
    <path d="M4.6 3.5h2.8M11.8 3.5h2.8" />
    <path d="M9.6 11.2v2.6a4.6 4.6 0 0 0 4.6 4.6 3.4 3.4 0 0 0 3.4-3.4v-1.4" />
    <circle cx="17.6" cy="11.6" r="2.4" />
  </Base>
);

export const IconThermometer = (p: IconProps) => (
  <Base {...p}>
    <path d="M14.2 13.6V5.2a2.2 2.2 0 1 0-4.4 0v8.4a4 4 0 1 0 4 0Z" />
    <path d="M12 10.4v4.6" />
    <path d="M14.2 7.4h2M14.2 10h2" />
  </Base>
);

export const IconGauge = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.6 17.4a8.4 8.4 0 1 1 16.8 0" />
    <path d="M12 17.4 16.4 11" />
    <circle cx="12" cy="17.4" r="1.3" />
    <path d="M3.6 17.4h1.9M18.5 17.4h1.9M12 6.6V8.4" />
  </Base>
);

export const IconChild = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="6.4" r="2.9" />
    <path d="M7.6 20.4v-3.6a4.4 4.4 0 0 1 8.8 0v3.6" />
    <path d="M9.4 13.4h5.2" />
  </Base>
);

export const IconBandage = (p: IconProps) => (
  <Base {...p}>
    <rect x="2.6" y="9.2" width="18.8" height="5.6" rx="2.8" transform="rotate(-45 12 12)" />
    <path d="m10.2 10.2 3.6 3.6M13.8 10.2l-3.6 3.6" />
  </Base>
);

export const IconPrescription = (p: IconProps) => (
  <Base {...p}>
    <path d="M6.5 3h7.1L18 7.4V19a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
    <path d="M13.4 3.2v4.4H18" />
    <path d="M8 12.4h6.2M8 15.6h4.4" />
  </Base>
);

export const IconHeart = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 20s-7.6-4.5-7.6-9.4A4.1 4.1 0 0 1 12 8.2a4.1 4.1 0 0 1 7.6 2.4C19.6 15.5 12 20 12 20Z" />
    <path d="M4.9 12.6h3.3l1.4-2.3 1.7 4 1.4-2.4h5.4" />
  </Base>
);

export const IconClock = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.4" />
    <path d="M12 7.6V12l3 1.9" />
  </Base>
);

export const IconRupee = (p: IconProps) => (
  <Base {...p}>
    <path d="M7.4 4.4h9.2M7.4 8.4h9.2" />
    <path d="M14.6 4.4c2 1.5 2.2 3.9.4 5.3-1.4 1.1-3.5 1.3-5.3 1.3l6.3 8.6" />
  </Base>
);

export const IconMapPin = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s6.6-5.6 6.6-10.2a6.6 6.6 0 1 0-13.2 0C5.4 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.4" r="2.5" />
  </Base>
);

export const IconPhone = (p: IconProps) => (
  <Base {...p}>
    <path d="M8.2 3.6 9.9 7 8.1 8.8a12 12 0 0 0 6.3 6.3l1.8-1.8 3.4 1.7v3a1.8 1.8 0 0 1-2 1.8C10.9 19.3 4.4 12.8 3.6 5.6a1.8 1.8 0 0 1 1.8-2Z" />
  </Base>
);

export const IconWhatsApp = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.4a8.6 8.6 0 0 0-7.4 13l-1.2 4.4 4.5-1.2a8.6 8.6 0 1 0 4.1-16.2Z" />
    <path d="M9 8.5c.2-.5.4-.6.7-.6h.5c.2 0 .4 0 .6.5l.6 1.5c.1.2 0 .4-.1.6l-.4.4c-.1.2-.2.4 0 .6a7.6 7.6 0 0 0 2.1 1.9c.2.1.4.1.6-.1l.4-.5c.2-.2.4-.2.6-.1l1.5.7c.2.1.3.2.3.5 0 .8-.6 1.4-1.4 1.5-.5 0-1 0-2.7-.6a8.3 8.3 0 0 1-3.5-3.3c-.5-1-.7-1.8-.5-2.6" />
  </Base>
);

export const IconChat = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 5.4h16v10.2H9.4L5.6 19v-3.4H4Z" />
    <path d="M8 9h8M8 12h5" />
  </Base>
);

export const IconArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.4 12h15M14 6.6 19.4 12 14 17.4" />
  </Base>
);

export const IconArrowUpRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7M8.6 7H17v8.4" />
  </Base>
);

export const IconCheck = (p: IconProps) => (
  <Base {...p}>
    <path d="m4.8 12.6 4.4 4.2L19.2 7" />
  </Base>
);

export const IconClose = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const IconMenu = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.6 7h16.8M3.6 12h16.8M3.6 17h16.8" />
  </Base>
);

export const IconChevronDown = (p: IconProps) => (
  <Base {...p}>
    <path d="m6 9.6 6 5.4 6-5.4" />
  </Base>
);

export const IconHouse = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 10.6 12 4l8 6.6V20H4Z" />
    <path d="M9.6 20v-5.4h4.8V20" />
  </Base>
);

export const IconRoute = (p: IconProps) => (
  <Base {...p}>
    <circle cx="5.6" cy="18.4" r="2.2" />
    <circle cx="18.4" cy="5.6" r="2.2" />
    <path d="M8 18.4h5.4a3.4 3.4 0 0 0 0-6.8h-3a3.4 3.4 0 0 1 0-6.8h5.2" />
  </Base>
);

export const IconSofa = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12.8V8.4a2.4 2.4 0 0 1 2.4-2.4h11.2A2.4 2.4 0 0 1 20 8.4v4.4" />
    <path d="M2.6 12.8a2 2 0 0 1 4 0v2.4h10.8v-2.4a2 2 0 0 1 4 0V18a2 2 0 0 1-2 2H4.6a2 2 0 0 1-2-2Z" />
  </Base>
);

export const IconRefresh = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 6.6v4.2h-4.2" />
    <path d="M19.3 10.4A7.6 7.6 0 0 0 6 7.4" />
    <path d="M4 17.4v-4.2h4.2" />
    <path d="M4.7 13.6A7.6 7.6 0 0 0 18 16.6" />
  </Base>
);

export const IconShield = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.2 5.4 5.8v5.4c0 4.2 2.8 7.4 6.6 8.8 3.8-1.4 6.6-4.6 6.6-8.8V5.8Z" />
    <path d="m9.2 11.8 2 2 3.6-3.8" />
  </Base>
);

export const IconBadge = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="9.4" r="5.4" />
    <path d="m8.4 13.8-1.2 6 4.8-2.4 4.8 2.4-1.2-6" />
    <path d="m10.2 9.4 1.3 1.4 2.4-2.6" />
  </Base>
);

export const IconClipboard = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 4.6H7.2A1.8 1.8 0 0 0 5.4 6.4v12.2a1.8 1.8 0 0 0 1.8 1.8h9.6a1.8 1.8 0 0 0 1.8-1.8V6.4a1.8 1.8 0 0 0-1.8-1.8H15" />
    <rect x="9" y="2.8" width="6" height="3.6" rx="1.2" />
    <path d="M8.6 11h6.8M8.6 14.4h4.6" />
  </Base>
);

export const IconAlert = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.8 21 19.4H3Z" />
    <path d="M12 9.6v4M12 16.4h.01" />
  </Base>
);

export const IconCalendar = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.6" y="5.4" width="16.8" height="15" rx="2.2" />
    <path d="M3.6 9.6h16.8M8.4 3.6v3.4M15.6 3.6v3.4" />
    <path d="m9.4 14.6 1.8 1.8 3.4-3.6" />
  </Base>
);

export const IconCar = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.4 15.6h17.2v-3l-1.7-.6-2-4.2a1.8 1.8 0 0 0-1.6-1H9.7a1.8 1.8 0 0 0-1.6 1l-2 4.2-1.7.6Z" />
    <circle cx="7.4" cy="18.2" r="1.8" />
    <circle cx="16.6" cy="18.2" r="1.8" />
    <path d="M5.6 12h12.8" />
  </Base>
);

export const IconUsers = (p: IconProps) => (
  <Base {...p}>
    <circle cx="9.4" cy="8" r="3.2" />
    <path d="M3.6 19.4v-1.8a5.8 5.8 0 0 1 11.6 0v1.8" />
    <path d="M16 5.2a3.2 3.2 0 0 1 0 5.8M17.4 12.6a5.8 5.8 0 0 1 3 4.9v1.9" />
  </Base>
);

export const IconLeaf = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 4c-9 0-14 3.4-14 9.4A6.6 6.6 0 0 0 12.6 20C18 20 20 13.6 20 4Z" />
    <path d="M5.2 20.4C7 14.4 11 10.2 16 7.6" />
  </Base>
);

export const icons = {
  stethoscope: IconStethoscope,
  thermometer: IconThermometer,
  gauge: IconGauge,
  child: IconChild,
  bandage: IconBandage,
  prescription: IconPrescription,
  heart: IconHeart,
  clock: IconClock,
  rupee: IconRupee,
  mapPin: IconMapPin,
  phone: IconPhone,
  whatsapp: IconWhatsApp,
  chat: IconChat,
  arrowRight: IconArrowRight,
  arrowUpRight: IconArrowUpRight,
  check: IconCheck,
  close: IconClose,
  menu: IconMenu,
  chevronDown: IconChevronDown,
  house: IconHouse,
  route: IconRoute,
  sofa: IconSofa,
  refresh: IconRefresh,
  shield: IconShield,
  badge: IconBadge,
  clipboard: IconClipboard,
  alert: IconAlert,
  calendar: IconCalendar,
  car: IconCar,
  users: IconUsers,
  leaf: IconLeaf,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, ...rest }: { name: IconName } & IconProps) {
  const Cmp = icons[name] ?? IconStethoscope;
  return <Cmp {...rest} />;
}
