"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Palette } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Main } from "@/components/layout/main";
import { SidebarNav } from "./components/sidebar-nav";

type SettingsProps = {
  children?: React.ReactNode;
};

export function Settings({ children }: SettingsProps) {
  const t = useTranslations("settings");

  const sidebarNavItems = useMemo(
    () => [
      {
        title: t("nav.appearance"),
        href: "/settings/appearance",
        icon: <Palette size={18} />,
      },
    ],
    [t],
  );

  return (
    <Main fixed>
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
      </div>
      <Separator className="my-2 lg:my-4" />
      <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12">
        <aside className="top-0 lg:sticky lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex w-full overflow-y-hidden p-1">{children}</div>
      </div>
    </Main>
  );
}
