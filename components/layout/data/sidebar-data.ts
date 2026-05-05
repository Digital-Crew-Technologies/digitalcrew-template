import {
  LayoutDashboard,
  Settings,
  Palette,
  UserCircle,
  LifeBuoy,
} from "lucide-react"
import { type SidebarData } from "../types"

export const sidebarData: SidebarData = {
  navGroups: [
    {
      titleKey: "groupMain",
      items: [
        {
          titleKey: "dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      titleKey: "groupSystem",
      items: [
        {
          titleKey: "settings",
          icon: Settings,
          items: [
            {
              titleKey: "account",
              url: "/settings/account",
              icon: UserCircle,
            },
            {
              titleKey: "appearance",
              url: "/settings/appearance",
              icon: Palette,
            },
          ],
        },
        {
          titleKey: "helpSupport",
          url: "/support",
          icon: LifeBuoy,
        },
      ],
    },
  ],
}
