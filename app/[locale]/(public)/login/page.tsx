import { Suspense } from "react"

import SignIn from "@/features/auth/sign-in"

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <SignIn />
    </Suspense>
  )
}
