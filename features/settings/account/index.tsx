"use client"

import { useTranslations } from "next-intl"

import { ContentSection } from "@/features/settings/components/content-section"
import { AccountForm } from "@/features/settings/account/account-form"

export function SettingsAccount() {
  const t = useTranslations("settings")

  return (
    <ContentSection title={t("account.title")} desc={t("account.description")}>
      <AccountForm />
    </ContentSection>
  )
}
