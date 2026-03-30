import {
  LayoutDashboard,
  Settings,
  Palette,
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
