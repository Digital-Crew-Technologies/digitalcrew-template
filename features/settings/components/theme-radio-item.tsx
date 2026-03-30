"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cn } from "@/lib/utils"
import type { SVGProps } from "react"
import { useTheme } from "next-themes"

interface ThemeRadioItemProps {
  item: {
    value: string
    label: string
    icon: React.ComponentType<SVGProps<SVGSVGElement>>
  }
  isTheme?: boolean
}

export function ThemeRadioItem({ item, isTheme = false }: ThemeRadioItemProps) {
  const Icon = item.icon
  const { theme } = useTheme()
  const isChecked = theme === item.value

  if (isTheme) {
    return (
      <div className="relative">
        <RadioGroupPrimitive.Item
          value={item.value}
          id={item.value}
          className="sr-only"
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center" />
        </RadioGroupPrimitive.Item>
        <label
          htmlFor={item.value}
          className={cn(
            "flex flex-col items-center gap-2 rounded-lg border-2 p-4 cursor-pointer transition-all",
            "hover:bg-accent/50 hover:border-primary/50",
            isChecked ? "border-primary bg-accent/50" : "border-border"
          )}
        >
          <Icon className="h-12 w-12" />
          <span className="text-sm font-medium">{item.label}</span>
        </label>
      </div>
    )
  }

  return null
}
