"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export default function AppTitle() {
  const t = useTranslations("nav");
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const brand = t("brandName");

  return (
    <div
      className={cn(
        isCollapsed
          ? "flex justify-center py-4"
          : "flex items-center gap-2 px-4 py-3",
      )}
    >
      {isCollapsed ? (
        <>
          <Image
            src="/images/logo/logo-icon-black.png"
            alt={brand}
            width={20}
            height={20}
            className="dark:hidden"
          />
          <Image
            src="/images/logo/logo-icon-white.png"
            alt={brand}
            width={20}
            height={20}
            className="hidden dark:block"
          />
        </>
      ) : (
        <>
          <Image
            src="/images/logo/logo-black-complete.svg"
            alt={brand}
            width={140}
            height={20}
            className="dark:hidden"
            priority
          />
          <Image
            src="/images/logo/logo-white-complete.svg"
            alt={brand}
            width={140}
            height={20}
            className="hidden dark:block"
            priority
          />
        </>
      )}
    </div>
  );
}
