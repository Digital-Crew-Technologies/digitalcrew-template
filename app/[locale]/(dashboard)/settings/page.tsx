import { redirect } from "@/lib/i18n/navigation"

type Props = {
  params: Promise<{ locale: string }>
}

export default async function SettingsPage({ params }: Props) {
  const { locale } = await params
  redirect({ href: "/settings/account", locale })
}
