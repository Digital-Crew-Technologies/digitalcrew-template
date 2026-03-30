"use client";

import { useTranslations } from "next-intl";
import { ContentSection } from "../components/content-section";
import { AppearanceForm } from "./appearance-form";

export function SettingsAppearance() {
  const t = useTranslations("settings");

  return (
    <ContentSection
      title={t("appearance.title")}
      desc={t("appearance.description")}
    >
      <AppearanceForm />
    </ContentSection>
  );
}
