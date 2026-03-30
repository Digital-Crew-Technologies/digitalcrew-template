"use client";

import { cn } from "@/lib/utils";

const defaultSize = 14;

export interface IconMessageReadProps {
  className?: string;
  size?: number;
}

/** Double check (read) – both checks green. */
export function IconMessageRead({
  className,
  size = defaultSize,
}: IconMessageReadProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "shrink-0 text-green-500 dark:text-green-400",
        className
      )}
      aria-hidden
    >
      <path
        d="M1 5.5L4 8.5L9 2.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 5.5L9 8.5L14.5 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
