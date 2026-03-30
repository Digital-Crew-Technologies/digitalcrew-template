"use client"

import { useLocale, useTranslations } from "next-intl"

import { Link } from "@/lib/i18n/navigation"
import { localeNames, routing } from "@/lib/i18n/routing"
import { cn } from "@/lib/utils"

export function LocaleSwitcher() {
  const locale = useLocale()
  const t = useTranslations("locale")

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="text-muted-foreground">{t("label")}:</span>
      <div className="flex flex-wrap gap-1">
        {routing.locales.map((loc) => (
          <Link
            key={loc}
            href="/"
            locale={loc}
            className={cn(
              "rounded-md px-2 py-1 transition-colors hover:bg-muted",
              loc === locale && "bg-muted font-medium",
            )}
          >
            {localeNames[loc]}
          </Link>
        ))}
      </div>
    </div>
  )
}
