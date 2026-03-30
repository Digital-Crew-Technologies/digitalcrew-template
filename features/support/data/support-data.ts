import { Mail, Calendar } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SupportChannelId = "bookCall" | "email";

export type SupportChannelDef = {
  id: SupportChannelId;
  href: string;
  icon: LucideIcon;
};

export const supportChannelDefs: SupportChannelDef[] = [
  {
    id: "bookCall",
    href: "https://cal.com/mario-moinet-uf3ocz/founder-chat-explore-ai-workforce",
    icon: Calendar,
  },
  {
    id: "email",
    href: "mailto:mario@digitalcrew.tech",
    icon: Mail,
  },
];
