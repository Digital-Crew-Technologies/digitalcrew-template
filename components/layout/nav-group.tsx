"use client";

import { type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/lib/i18n/navigation";
import { Link } from "@/lib/i18n/navigation";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  type NavCollapsible,
  type NavItem,
  type NavLink,
  type NavGroup as NavGroupProps,
} from "./types";

export function NavGroup({ titleKey, items }: NavGroupProps) {
  const t = useTranslations("nav");
  const { state, isMobile } = useSidebar();
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t(titleKey)}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const key = `${item.titleKey}-${item.url ?? "collapsible"}`;

          if (!item.items)
            return (
              <SidebarMenuLink key={key} item={item} pathname={pathname} />
            );

          if (state === "collapsed" && !isMobile)
            return (
              <SidebarMenuCollapsedDropdown
                key={key}
                item={item}
                pathname={pathname}
              />
            );

          return (
            <SidebarMenuCollapsible key={key} item={item} pathname={pathname} />
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function NavBadge({ children }: { children: ReactNode }) {
  return <Badge className="rounded-full px-1 py-0 text-xs">{children}</Badge>;
}

function SidebarMenuLink({
  item,
  pathname,
}: {
  item: NavLink;
  pathname: string;
}) {
  const t = useTranslations("nav");
  const { setOpenMobile } = useSidebar();
  const label = t(item.titleKey);
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={checkIsActive(pathname, item)}
        tooltip={label}
      >
        <Link href={item.url} onClick={() => setOpenMobile(false)}>
          {item.icon && <item.icon />}
          <span>{label}</span>
          {item.badge && <NavBadge>{item.badge}</NavBadge>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function SidebarMenuCollapsible({
  item,
  pathname,
}: {
  item: NavCollapsible;
  pathname: string;
}) {
  const t = useTranslations("nav");
  const { setOpenMobile } = useSidebar();
  const label = t(item.titleKey);
  return (
    <Collapsible
      asChild
      defaultOpen={checkIsActive(pathname, item, true)}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={label}>
            {item.icon && <item.icon />}
            <span>{label}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="CollapsibleContent">
          <SidebarMenuSub>
            {item.items.map((subItem) => (
              <SidebarMenuSubItem key={subItem.titleKey}>
                <SidebarMenuSubButton
                  asChild
                  isActive={checkIsActive(pathname, subItem)}
                >
                  <Link href={subItem.url} onClick={() => setOpenMobile(false)}>
                    {subItem.icon && <subItem.icon />}
                    <span>{t(subItem.titleKey)}</span>
                    {subItem.badge && <NavBadge>{subItem.badge}</NavBadge>}
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

function SidebarMenuCollapsedDropdown({
  item,
  pathname,
}: {
  item: NavCollapsible;
  pathname: string;
}) {
  const t = useTranslations("nav");
  const label = t(item.titleKey);
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            tooltip={label}
            isActive={checkIsActive(pathname, item)}
          >
            {item.icon && <item.icon />}
            <span>{label}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" sideOffset={4}>
          <DropdownMenuLabel>
            {label} {item.badge ? `(${item.badge})` : ""}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {item.items.map((sub) => (
            <DropdownMenuItem key={`${sub.titleKey}-${sub.url}`} asChild>
              <Link
                href={sub.url}
                className={`${
                  checkIsActive(pathname, sub) ? "bg-secondary" : ""
                }`}
              >
                {sub.icon && <sub.icon />}
                <span className="max-w-52 text-wrap">{t(sub.titleKey)}</span>
                {sub.badge && (
                  <span className="ms-auto text-xs">{sub.badge}</span>
                )}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}

function checkIsActive(href: string, item: NavItem, mainNav = false) {
  const normalizePath = (value: string) => {
    const basePath = value.split("?")[0];
    const segments = basePath.split("/").filter(Boolean);
    const firstSegment = segments[0];

    if (firstSegment && /^[a-z]{2}(?:-[A-Z]{2})?$/.test(firstSegment)) {
      segments.shift();
    }

    return `/${segments.join("/")}`;
  };

  const normalizedHref = normalizePath(href);
  const normalizedItemUrl = normalizePath(item.url ?? "/");

  return (
    normalizedHref === normalizedItemUrl ||
    !!item?.items?.some((i) => normalizePath(i.url ?? "/") === normalizedHref) ||
    (mainNav &&
      normalizedHref.split("/")[1] !== "" &&
      normalizedHref.split("/")[1] === normalizedItemUrl.split("/")[1])
  );
}
