"use client";

import { cn } from "@/lib/utils";

const defaultSize = 14;

export interface IconMessageDeliveredProps {
  className?: string;
  size?: number;
}

/** Double check (delivered) – two checkmarks, one gray one default. */
export function IconMessageDelivered({
  className,
  size = defaultSize,
}: IconMessageDeliveredProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <g
        className="text-muted-foreground"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 5.5L4 8.5L9 2.5" />
      </g>
      <g
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 5.5L9 8.5L14.5 2" />
      </g>
    </svg>
  );
}
