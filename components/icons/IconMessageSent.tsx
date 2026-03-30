"use client";

import { cn } from "@/lib/utils";

const defaultSize = 14;

export interface IconMessageSentProps {
  className?: string;
  size?: number;
}

/** WhatsApp-style: sent = single check. */
export function IconMessageSent({
  className,
  size = defaultSize,
}: IconMessageSentProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <path
        d="M1.5 6.5L5.5 10.5L14.5 1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
