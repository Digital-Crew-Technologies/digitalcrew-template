"use client";

import { useTranslations } from "next-intl";
import { SupportChannels } from "./components/support-channels";

export function Support() {
  const t = useTranslations("support");

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-1 flex-col gap-4 sm:gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("intro")}</p>
        </div>

        <div className="p-4" />
        <SupportChannels />
      </div>
    </div>
  );
}
