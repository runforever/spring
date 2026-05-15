import type { SVGProps } from "react";

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  size?: number;
  color?: string;
}

const svg = (children: React.ReactNode, props: IconProps) => {
  const { size = 16, color = "currentColor", style, className, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
      {...rest}
    >
      {children}
    </svg>
  );
};

export const Search = (p: IconProps) =>
  svg(<><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></>, p);

export const ArrowLeft = (p: IconProps) =>
  svg(<><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></>, p);

export const Braces = (p: IconProps) =>
  svg(<><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/></>, p);

export const Maximize2 = (p: IconProps) =>
  svg(<><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></>, p);

export const Minimize2 = (p: IconProps) =>
  svg(<><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" x2="21" y1="10" y2="3"/><line x1="3" x2="10" y1="21" y2="14"/></>, p);

export const RotateCcw = (p: IconProps) =>
  svg(<><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></>, p);

export const Sparkles = (p: IconProps) =>
  svg(<><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></>, p);

export const Copy = (p: IconProps) =>
  svg(<><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></>, p);

export const Check = (p: IconProps) =>
  svg(<><path d="M20 6 9 17l-5-5"/></>, p);

export const Trash2 = (p: IconProps) =>
  svg(<><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></>, p);

export const FileJson = (p: IconProps) =>
  svg(<><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"/><path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"/></>, p);

export const ExternalLink = (p: IconProps) =>
  svg(<><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></>, p);

export const SearchX = (p: IconProps) =>
  svg(<><path d="m13.5 8.5-5 5"/><path d="m8.5 8.5 5 5"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></>, p);

export const X = (p: IconProps) =>
  svg(<><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>, p);

export const CheckCircle = (p: IconProps) =>
  svg(<><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></>, p);
