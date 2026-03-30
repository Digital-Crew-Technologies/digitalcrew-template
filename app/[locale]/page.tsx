import Link from "next/link"
import { getTranslations } from "next-intl/server"

import { LocaleSwitcher } from "@/components/locale-switcher"
import { Button } from "@/components/ui/button"
import { SplashCursor } from "@/components/splash-cursor"

export default async function Page() {
  const t = await getTranslations("home")

  return (
    <div className="flex min-h-svh flex-col gap-6 p-6">
      <SplashCursor />
      <LocaleSwitcher />
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">{t("title")}</h1>
          <p>{t("subtitle")}</p>
          <p>{t("buttonHint")}</p>
          <Link href="/dashboard">
            <Button className="mt-2">{t("button")}</Button>
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
