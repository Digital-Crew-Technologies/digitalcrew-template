import { Suspense } from "react"

import SignUp from "@/features/auth/sign-up"

export default function SignUpPage() {
  return (
    <Suspense fallback={null}>
      <SignUp />
    </Suspense>
  )
}
