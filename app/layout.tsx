import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/context/theme-provider"
import { cn } from "@/lib/utils";
import { SplashCursorProvider } from "@/context/splash-cursor-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <ThemeProvider>
          <SplashCursorProvider>
            {children}
            <Toaster />
          </SplashCursorProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
