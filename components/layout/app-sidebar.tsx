import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import { sidebarData } from "./data/sidebar-data";
import { NavGroup } from "./nav-group";
import AppTitle from "./app-title";

type AppSidebarProps = {
  showProjectSwitcher?: boolean;
  showUserMenu?: boolean;
  collapsible?: "offcanvas" | "icon" | "none";
};

export function AppSidebar({
  showUserMenu = true,
  collapsible = "icon",
}: AppSidebarProps = {}) {
  return (
    <Sidebar collapsible={collapsible} variant="inset">
      <SidebarHeader>
        <AppTitle />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.titleKey} {...props} />
        ))}
      </SidebarContent>
      {showUserMenu && (
        <SidebarFooter>
          <SidebarMenu>
          </SidebarMenu>
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
