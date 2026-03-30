"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { supportChannels } from "../data/support-data";

export function SupportChannels() {
  return (
    <section className="grid gap-4 sm:gap-6 lg:grid-cols-2">
      {supportChannels.map(({ title, description, helper, cta, href, icon: Icon }) => (
        <div
          key={title}
          className="rounded-md border bg-card p-5"
        >
          <div className="flex items-start gap-4">
            <div className="flex size-10 items-center justify-center rounded-md bg-muted">
              <Icon className="size-5" />
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="text-xs text-muted-foreground">{helper}</p>
              </div>
              <p className="text-sm text-muted-foreground">{description}</p>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {cta}
                  <ArrowUpRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

