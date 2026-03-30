"use client";

import { cn } from "@/lib/utils";

const defaultSize = 14;

export interface IconMessageFailedProps {
  className?: string;
  size?: number;
}

export function IconMessageFailed({
  className,
  size = defaultSize,
}: IconMessageFailedProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <circle
        cx="8"
        cy="8"
        r="7"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 5V8M8 10V10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
