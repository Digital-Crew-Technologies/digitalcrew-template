"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { LayoutDashboard, Loader2, LogOut, Settings } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Link, useRouter } from "@/lib/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

type ProfileDropdownProps = {
  /** Use "sidebar" when rendering in the app sidebar footer. */
  variant?: "default" | "sidebar";
};

function getInitials(input: { name?: string | null; email?: string | null }) {
  const name = input.name?.trim();
  const email = input.email?.trim() ?? "";

  if (name) {
    const parts = name.split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name[0]?.toUpperCase() || "U";
  }

  if (email) return email[0]?.toUpperCase() || "U";
  return "U";
}

export function ProfileDropdown({ variant = "default" }: ProfileDropdownProps) {
  useLocale();
  const router = useRouter();
  const tNav = useTranslations("nav");

  const { data: session, isPending } = authClient.useSession();

  const vm = useMemo(() => {
    const user = session?.user;
    const displayName =
      user?.name?.trim() ||
      user?.email?.trim() ||
      tNav("myAccount");
    const email = user?.email ?? "";
    const avatarUrl = user?.image ?? "/avatars/01.png";
    const initials = getInitials({
      name: user?.name,
      email: user?.email,
    });
    return { displayName, email, avatarUrl, initials };
  }, [session?.user, tNav]);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  const dropdownContent = (
    <>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col gap-1.5">
          <p className="text-sm leading-none font-medium">{vm.displayName}</p>
          {vm.email && (
            <p className="text-xs leading-none text-muted-foreground">
              {vm.email}
            </p>
          )}
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="h-4 w-4" />
            <span>{tNav("dashboard")}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings/account">
            <Settings className="h-4 w-4" />
            <span>{tNav("settings")}</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive" onClick={() => void handleSignOut()}>
        <LogOut className="h-4 w-4" />
        <span>{tNav("logout")}</span>
        <DropdownMenuShortcut className="text-current">
          ⇧⌘Q
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </>
  );

  if (isPending) {
    const trigger = (
      <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full" disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    );
    if (variant === "sidebar") {
      return (
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" disabled className="gap-3 px-2 py-2">
            <Loader2 className="size-4 animate-spin" />
            <span className="truncate text-sm text-muted-foreground">{tNav("myAccount")}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    }
    return trigger;
  }

  if (variant === "sidebar") {
    return (
      <SidebarMenuItem>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              tooltip={vm.displayName}
              className={cn(
                "data-[size=lg]:flex data-[size=lg]:items-center data-[size=lg]:gap-3 data-[size=lg]:px-2 data-[size=lg]:py-2",
              )}
            >
              <Avatar className="h-8 w-8 shrink-0 rounded-full">
                <AvatarImage src={vm.avatarUrl} alt={vm.displayName} />
                <AvatarFallback className="rounded-full text-xs">
                  {vm.initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 flex-col gap-0.5 overflow-hidden text-left text-sm leading-none group-data-[collapsible=icon]:hidden">
                <span className="truncate font-medium">{vm.displayName}</span>
                {vm.email && (
                  <span className="truncate text-xs text-muted-foreground">
                    {vm.email}
                  </span>
                )}
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56"
            align="start"
            side="top"
            sideOffset={4}
            forceMount
          >
            {dropdownContent}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={vm.avatarUrl} alt={vm.displayName} />
            <AvatarFallback>{vm.initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {dropdownContent}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
