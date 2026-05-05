import { routing } from "@/lib/i18n/routing"

const localeSet = new Set<string>(routing.locales)

/**
 * Removes the leading `/<locale>` segment when it matches a configured locale.
 * Safe for next-intl `Link` / `useRouter` hrefs, which must be locale-agnostic.
 */
export function pathWithoutLocalePrefix(pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`
  const segments = normalized.split("/").filter(Boolean)
  if (segments.length === 0) return "/"

  const first = segments[0]
  if (localeSet.has(first)) {
    const rest = segments.slice(1).join("/")
    return rest ? `/${rest}` : "/"
  }

  return normalized
}

/**
 * Parses `returnTo` from the query string: strips an accidental locale prefix,
 * rejects open redirects, and returns a path suitable for `router.push(href)`.
 */
export function normalizeReturnTo(
  raw: string | null | undefined,
): string | undefined {
  if (raw == null) return undefined
  const trimmed = raw.trim()
  if (!trimmed) return undefined

  let path: string
  try {
    path = decodeURIComponent(trimmed)
  } catch {
    return undefined
  }

  if (!path.startsWith("/") || path.startsWith("//")) return undefined
  if (/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(path)) return undefined
  if (path.includes("\\")) return undefined

  return pathWithoutLocalePrefix(path)
}
