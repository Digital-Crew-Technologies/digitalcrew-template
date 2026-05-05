import { NextRequest, NextResponse } from "next/server"
import createIntlMiddleware from "next-intl/middleware"
import { getSessionCookie } from "better-auth/cookies"

import { routing } from "@/lib/i18n/routing"
import { pathWithoutLocalePrefix } from "@/lib/i18n/pathname"

const intlMiddleware = createIntlMiddleware(routing)

const localePattern = routing.locales.join("|")
const protectedPath = new RegExp(
  `^/(?:${localePattern})/(dashboard|settings|support)(?:/|$)`,
)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (protectedPath.test(pathname)) {
    const sessionCookie = getSessionCookie(request)
    if (!sessionCookie) {
      const segments = pathname.split("/").filter(Boolean)
      const locale = routing.locales.includes(segments[0] as (typeof routing.locales)[number])
        ? segments[0]
        : routing.defaultLocale

      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = `/${locale}/login`
      loginUrl.searchParams.set("returnTo", pathWithoutLocalePrefix(pathname))
      return NextResponse.redirect(loginUrl)
    }
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: [
    "/",
    "/(en|fr|es|zh)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
}
