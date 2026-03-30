import { Mail, Calendar } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SupportChannel {
  title: string;
  description: string;
  helper: string;
  cta: string;
  href: string;
  icon: LucideIcon;
}

export interface SupportResource {
  title: string;
  body: string;
  href: string;
}

export const supportChannels: SupportChannel[] = [
  {
    title: "Book a Call",
    description: "Schedule a meeting with our founder to discuss your needs and explore how Digital Crew can help your business.",
    helper: "Schedule a personalized consultation",
    cta: "Schedule Meeting",
    href: "https://cal.com/mario-moinet-uf3ocz/founder-chat-explore-ai-workforce",
    icon: Calendar,
  },
  {
    title: "Send an Email",
    description: "Reach out via email for support, questions, or feedback. We'll get back to you shortly.",
    helper: "We reply to every message within a business day",
    cta: "mario@digitalcrew.tech",
    href: "mailto:mario@digitalcrew.tech",
    icon: Mail,
  },
];

export const supportResources: SupportResource[] = [
  {
    title: "Status & uptime",
    body: "Track automation health, partner APIs, and scheduled maintenance.",
    href: "https://status.digitalcrew.tech",
  },
  {
    title: "Security & compliance",
    body: "SOC 2 Type II, GDPR, and data retention documentation for procurement.",
    href: "https://www.digitalcrew.tech/security",
  },
  {
    title: "Product releases",
    body: "What's new inside Sophie + Max each week, shipped straight from the team.",
    href: "https://www.digitalcrew.tech/changelog",
  },
];

