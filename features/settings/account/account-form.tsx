"use client"

import { useEffect, useId, useState } from "react"
import { useTranslations } from "next-intl"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"
import {
  changePasswordSchema,
  updateProfileSchema,
} from "@/features/settings/account/schema"

/** Matches subsection headings in `appearance-form` (`SectionTitle`). */
function SectionTitle({
  title,
  className,
}: {
  title: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground",
        className,
      )}
    >
      {title}
    </div>
  )
}

export function AccountForm() {
  const t = useTranslations("settings.account")
  const id = useId()
  const { data: session, isPending: sessionLoading } = authClient.useSession()

  const [name, setName] = useState("")
  const [profileLoading, setProfileLoading] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordLoading, setPasswordLoading] = useState(false)

  useEffect(() => {
    const n = session?.user?.name?.trim()
    if (n) setName(n)
  }, [session?.user?.name])

  const email = session?.user?.email ?? ""

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = updateProfileSchema.safeParse({ name })
    if (!parsed.success) {
      toast.error(parsed.error.flatten().fieldErrors.name?.[0] ?? t("profileSaveError"))
      return
    }
    setProfileLoading(true)
    try {
      const { error } = await authClient.updateUser({ name: parsed.data.name })
      if (error) {
        toast.error(error.message ?? t("profileSaveError"))
        return
      }
      toast.success(t("profileSaved"))
    } finally {
      setProfileLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = changePasswordSchema.safeParse({
      currentPassword,
      newPassword,
      confirmPassword,
    })
    if (!parsed.success) {
      const msg =
        parsed.error.flatten().fieldErrors.confirmPassword?.[0] ??
        parsed.error.flatten().fieldErrors.newPassword?.[0] ??
        t("passwordSaveError")
      toast.error(msg)
      return
    }
    setPasswordLoading(true)
    try {
      const { error } = await authClient.changePassword({
        currentPassword: parsed.data.currentPassword,
        newPassword: parsed.data.newPassword,
        revokeOtherSessions: false,
      })
      if (error) {
        toast.error(error.message ?? t("passwordSaveError"))
        return
      }
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      toast.success(t("passwordSaved"))
    } finally {
      setPasswordLoading(false)
    }
  }

  if (sessionLoading) {
    return (
      <div className="space-y-6 overflow-y-auto px-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" aria-hidden />
          <span>{t("loading")}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 overflow-y-auto px-4">
      <div>
        <SectionTitle title={t("profileTitle")} />
        <form
          onSubmit={handleProfileSubmit}
          className="w-full max-w-md space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor={`${id}-email`}>{t("emailLabel")}</Label>
            <Input
              id={`${id}-email`}
              type="email"
              value={email}
              disabled
              readOnly
              className="bg-muted"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-name`}>{t("nameLabel")}</Label>
            <Input
              id={`${id}-name`}
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={profileLoading}
            />
          </div>
          <Button type="submit" disabled={profileLoading}>
            {profileLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                {t("saving")}
              </>
            ) : (
              t("saveProfile")
            )}
          </Button>
        </form>
      </div>

      <div>
        <SectionTitle title={t("passwordTitle")} />
        <form
          onSubmit={handlePasswordSubmit}
          className="w-full max-w-md space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor={`${id}-current`}>{t("currentPasswordLabel")}</Label>
            <Input
              id={`${id}-current`}
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={passwordLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-new`}>{t("newPasswordLabel")}</Label>
            <Input
              id={`${id}-new`}
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={passwordLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-confirm`}>{t("confirmPasswordLabel")}</Label>
            <Input
              id={`${id}-confirm`}
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={passwordLoading}
            />
          </div>
          <Button type="submit" disabled={passwordLoading}>
            {passwordLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                {t("updatingPassword")}
              </>
            ) : (
              t("updatePassword")
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
