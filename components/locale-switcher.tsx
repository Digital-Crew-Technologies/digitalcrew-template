"use client"

import { Check, ChevronDown, Languages } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "@/lib/i18n/navigation"
import { localeNames, routing, type AppLocale } from "@/lib/i18n/routing"
import { cn } from "@/lib/utils"

type LocaleSwitcherProps = {
  /** `default`: label + language name (landing). `icon`: icon button like ThemeSwitcher (header). */
  variant?: "default" | "icon"
}

export function LocaleSwitcher({ variant = "default" }: LocaleSwitcherProps) {
  const locale = useLocale() as AppLocale
  const t = useTranslations("locale")
  const pathname = usePathname()
  const router = useRouter()

  const menu = (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        {variant === "icon" ? (
          <Button
            variant="ghost"
            size="icon"
            className="scale-95 rounded-full"
            aria-label={`${t("label")}: ${localeNames[locale]}`}
          >
            <Languages className="size-[1.2rem]" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="h-auto gap-1 rounded-md px-2 py-1 text-xs font-medium hover:bg-muted data-[state=open]:bg-muted"
            aria-label={`${t("label")}: ${localeNames[locale]}`}
          >
            {localeNames[locale]}
            <ChevronDown className="size-3 opacity-60" aria-hidden />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={variant === "icon" ? "end" : "start"}
        className="min-w-40"
      >
        {routing.locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            className="cursor-pointer"
            onClick={() => router.replace(pathname, { locale: loc })}
          >
            {localeNames[loc]}
            <Check
              size={14}
              className={cn("ms-auto", loc !== locale && "hidden")}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  if (variant === "icon") {
    return menu
  }

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="text-muted-foreground">{t("label")}:</span>
      {menu}
    </div>
  )
}
