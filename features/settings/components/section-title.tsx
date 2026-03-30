import { cn } from "@/lib/utils"

interface SectionTitleProps {
  title: string
  className?: string
}

export function SectionTitle({ title, className }: SectionTitleProps) {
  return (
    <h2 className={cn("text-xl font-semibold", className)}>
      {title}
    </h2>
  )
}
