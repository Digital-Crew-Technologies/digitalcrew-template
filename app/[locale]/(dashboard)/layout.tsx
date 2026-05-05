import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import { redirect } from "@/lib/i18n/navigation"
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function DashboardLayout({ children, params }: Props) {
  const { locale } = await params

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect({ href: "/login", locale })
  }

  return <AuthenticatedLayout>{children}</AuthenticatedLayout>
}
