"use client";

import { Settings } from "@/features/settings";
import { SettingsAppearance } from "@/features/settings/appearance";

export default function SettingsPage() {
  return (
    <Settings>
      <SettingsAppearance />
    </Settings>
  );
}
