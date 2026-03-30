"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Header } from "@/components/layout/header";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { SearchProvider } from "@/context/search-provider";
import { Search } from "@/components/search";
import { useSplashCursor } from "@/context/splash-cursor-provider";
import { SplashCursor } from "../splash-cursor";
  
type AuthenticatedLayoutProps = {
  children?: React.ReactNode;
};

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const t = useTranslations("nav");
  const { splashCursorEnabled } = useSplashCursor();
  return (
    <SearchProvider>
      <SidebarProvider>
        {splashCursorEnabled && <SplashCursor />}
        <AppSidebar />
        <SidebarInset
          className={cn(
            "@container/content",
            "has-data-[layout=fixed]:h-svh",
            "peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]",
            "relative z-10 bg-background/70 backdrop-blur-xl border border-glass shadow-2xl md:m-2 md:ml-0 md:rounded-[10px]",
          )}
        >
          <Header fixed>
            <Search placeholder={t("searchPlaceholder")} />
            <div className="flex-1" />
            <LocaleSwitcher variant="icon" />
            <ThemeSwitcher />
          </Header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </SearchProvider>
  );
}
