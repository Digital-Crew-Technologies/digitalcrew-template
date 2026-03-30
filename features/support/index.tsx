"use client";

import { SupportChannels } from "./components/support-channels";

export function Support() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-1 flex-col gap-4 sm:gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Help & Support</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Digital Crew is your AI-powered platform for automating sales workflows, managing prospect lists, and running multi-channel campaigns. Whether you need help with onboarding, campaign setup, or have questions about our features, we&apos;re here to support you every step of the way.
          </p>
        </div>

        <div className="p-4" />
        <SupportChannels />
      </div>
    </div>
  );
}
