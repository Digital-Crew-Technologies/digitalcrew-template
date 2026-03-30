import { LocaleSwitcher } from "@/components/locale-switcher"
import { Button } from "@/components/ui/button"
import { SplashCursor } from "@/components/splash-cursor"
import { Link } from "@/lib/i18n/navigation"
import { useTranslations } from "next-intl"

export function Landing() {
  const t = useTranslations("home")

  return (
    <div className="flex min-h-svh flex-col gap-6 p-6">
      <SplashCursor />
      <LocaleSwitcher />
      <div className="flex max-w-xl min-w-0 flex-col gap-5 text-sm leading-relaxed">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
          <p className="text-muted-foreground">{t("buttonHint")}</p>
          <Link href="/dashboard">
            <Button className="mt-1">{t("button")}</Button>
          </Link>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          {t.rich("darkModeHint", {
            kbd: (chunks) => <kbd>{chunks}</kbd>,
          })}
        </div>
      </div>
    </div>
  )
}
