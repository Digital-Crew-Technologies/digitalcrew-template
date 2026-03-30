import {
  LayoutDashboard,
  List,
  UserSearch,
  Rocket,
  UsersRound,
  Settings,
  Palette,
  LifeBuoy,
  Building,
  Building2,
  Plug,
  Inbox,
  Key,
} from "lucide-react"
import { type SidebarData } from "../types"

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: "MAIN",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "SYSTEM",
      items: [
        {
          title: "Settings",
          icon: Settings,
          items: [
            {
              title: "Appearance",
              url: "/settings/appearance",
              icon: Palette,
            },
          ],
        },
        {
          title: "Help & Support",
          url: "/support",
          icon: LifeBuoy,
        },
      ],
    },
  ],
}
