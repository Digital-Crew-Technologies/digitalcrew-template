import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type ContentSectionProps = {
  title: string;
  desc: string;
  children: React.JSX.Element;
  fullWidth?: boolean;
};

export function ContentSection({
  title,
  desc,
  children,
  fullWidth = false,
}: ContentSectionProps) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-none">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <Separator className="my-4 flex-none" />
      <div className="faded-bottom h-full w-full overflow-y-auto scroll-smooth pe-4 pb-12">
        <div className={cn("-mx-1 px-1.5", !fullWidth && "lg:max-w-xl")}>
          {children}
        </div>
      </div>
    </div>
  );
}
