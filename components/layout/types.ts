type BaseNavItem = {
  titleKey: string;
  badge?: string;
  icon?: React.ElementType;
};

type NavLink = BaseNavItem & {
  url: string;
  items?: never;
};

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: string })[];
  url?: never;
};

type NavItem = NavCollapsible | NavLink;

type NavGroup = {
  titleKey: string;
  items: NavItem[];
};

type SidebarData = {
  navGroups: NavGroup[];
};

export type { SidebarData, NavGroup, NavItem, NavCollapsible, NavLink };
