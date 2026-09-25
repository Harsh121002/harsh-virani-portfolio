"use client";

import { getIcon } from "@/lib/icons";

type Props = {
  slug: string;
  size?: number;
  className?: string;
  title?: string;
};

export default function TechIcon({
  slug,
  size = 24,
  className = "",
  title,
}: Props) {
  const icon = getIcon(slug);
  if (!icon) {
    return (
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded bg-white/10 text-[10px] font-mono text-accent-cyan ${className}`}
        title={title ?? slug}
      >
        {slug.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-label={title ?? icon.title}
    >
      <title>{title ?? icon.title}</title>
      <path fill={`#${icon.hex}`} d={icon.path} />
    </svg>
  );
}
