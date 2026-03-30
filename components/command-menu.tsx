"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/i18n/navigation";
import { ArrowRight, ChevronRight, Laptop, Moon, Sun } from "lucide-react";
import { useSearch } from "@/context/search-provider";
import { useTheme } from "@/context/theme-provider";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { sidebarData } from "@/components/layout/data/sidebar-data";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CommandMenu() {
  const t = useTranslations("nav");
  const tCommand = useTranslations("commandMenu");
  const tSettings = useTranslations("settings");
  const router = useRouter();
  const { setTheme } = useTheme();
  const { open, setOpen } = useSearch();

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false);
      command();
    },
    [setOpen]
  );

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <CommandInput placeholder={tCommand("placeholder")} />
      <CommandList>
        <ScrollArea className="h-72 pe-1">
          <CommandEmpty>{tCommand("empty")}</CommandEmpty>
          {sidebarData.navGroups.map((group) => (
            <CommandGroup key={group.titleKey} heading={t(group.titleKey)}>
              {group.items.map((navItem, i) => {
                if (navItem.url)
                  return (
                    <CommandItem
                      key={`${navItem.url}-${i}`}
                      value={t(navItem.titleKey)}
                      onSelect={() => {
                        runCommand(() => router.push(navItem.url!));
                      }}
                    >
                      <div className="flex size-4 items-center justify-center">
                        <ArrowRight className="size-2 text-muted-foreground/80" />
                      </div>
                      {t(navItem.titleKey)}
                    </CommandItem>
                  );

                return navItem.items?.map((subItem, j) => (
                  <CommandItem
                    key={`${navItem.titleKey}-${subItem.url}-${j}`}
                    value={`${t(navItem.titleKey)}-${subItem.url}`}
                    onSelect={() => {
                      runCommand(() => router.push(subItem.url));
                    }}
                  >
                    <div className="flex size-4 items-center justify-center">
                      <ArrowRight className="size-2 text-muted-foreground/80" />
                    </div>
                    {t(navItem.titleKey)} <ChevronRight /> {t(subItem.titleKey)}
                  </CommandItem>
                ));
              })}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading={tCommand("themeGroup")}>
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Sun /> <span>{tSettings("appearance.theme.light")}</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon className="scale-90" />
              <span>{tSettings("appearance.theme.dark")}</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Laptop />
              <span>{tSettings("appearance.theme.system")}</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  );
}
