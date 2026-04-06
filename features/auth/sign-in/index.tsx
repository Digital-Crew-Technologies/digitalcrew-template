"use client"

import { useId, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Loader2, UserIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { GoogleIcon } from "@/components/icons"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useRouter } from "@/lib/i18n/navigation"

export default function SignIn() {
  const id = useId()
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations("auth.signIn")
  const tCommon = useTranslations("auth.common")

  const returnTo = searchParams.get("returnTo") ?? undefined
  const satelliteRedirect = searchParams.get("redirect") ?? undefined

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitDisabled = loading || !email || !password

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 350))
      router.push(returnTo ?? "/dashboard")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = () => {
    setError(null)
    toast.info(tCommon("googleConnectHint"))
  }

  return (
    <div className="flex min-h-screen items-center justify-center py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div
              className="flex size-14 shrink-0 items-center justify-center rounded-full border border-border"
              aria-hidden="true"
            >
              <UserIcon className="size-6 stroke-zinc-800 dark:stroke-zinc-100" />
            </div>
          </div>
          <div className="space-y-2 text-center">
            <CardTitle className="text-2xl">{t("title")}</CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-6 rounded-md border border-red-200 bg-red-100 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${id}-email`}>{tCommon("emailLabel")}</Label>
                <Input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={tCommon("emailPlaceholder")}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-password`}>{tCommon("passwordLabel")}</Label>
                <Input
                  id={`${id}-password`}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={tCommon("passwordPlaceholder")}
                  disabled={loading}
                />
              </div>
            </div>

            <Button type="submit" disabled={submitDisabled} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("submitting")}
                </>
              ) : (
                t("submit")
              )}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
            <span className="text-xs text-muted-foreground">{tCommon("or")}</span>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogle}
            disabled={loading}
          >
            <>
              <GoogleIcon className="mr-2 h-4 w-4" />
              {tCommon("continueWithGoogle")}
            </>
          </Button>

          <div className="mt-2 text-center text-sm text-muted-foreground">
            {t("noAccount")}&nbsp;
            <Link
              href={
                satelliteRedirect
                  ? `/sign-up?${new URLSearchParams({
                      ...(returnTo ? { returnTo } : {}),
                      redirect: satelliteRedirect,
                    }).toString()}`
                  : returnTo
                    ? `/sign-up?returnTo=${encodeURIComponent(returnTo)}`
                    : "/sign-up"
              }
              className="text-primary hover:underline"
            >
              {t("signUpLink")}
            </Link>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-sm text-muted-foreground hover:underline"
          >
            {tCommon("backToHome")}
          </button>
        </CardFooter>
      </Card>
    </div>
  )
}
