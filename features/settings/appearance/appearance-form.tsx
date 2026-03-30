import { type SVGProps } from "react";
import { Root as Radio, Item } from "@radix-ui/react-radio-group";
import { CircleCheck, RotateCcw, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/theme-provider";
import { useSplashCursor } from "@/context/splash-cursor-provider";
import { Button } from "@/components/ui/button";
import { IconThemeDark, IconThemeLight, IconThemeSystem, IconSplashCursor, IconSplashCursorDisabled } from "@/components/icons";

function ThemeConfig() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <SectionTitle title="Theme" />
      <Radio
        value={theme}
        onValueChange={setTheme}
        className="grid w-full max-w-md grid-cols-3 gap-4"
        aria-label="Select theme preference"
        aria-describedby="theme-description"
      >
        {[
          {
            value: "system",
            label: "System",
            icon: IconThemeSystem,
          },
          {
            value: "light",
            label: "Light",
            icon: IconThemeLight,
          },
          {
            value: "dark",
            label: "Dark",
            icon: IconThemeDark,
          },
        ].map((item) => (
          <RadioGroupItem key={item.value} item={item} isTheme />
        ))}
      </Radio>
      <div id="theme-description" className="sr-only">
        Choose between system preference, light mode, or dark mode
      </div>
    </div>
  );
}

function SplashCursorConfig() {
  const { splashCursorEnabled, setSplashCursorEnabled } = useSplashCursor();
  const value = splashCursorEnabled ? "enabled" : "disabled";
  
  const handleValueChange = (newValue: string) => {
    setSplashCursorEnabled(newValue === "enabled");
  };

  return (
    <div>
      <SectionTitle title="Splash Cursor" />
      <Radio
        value={value}
        onValueChange={handleValueChange}
        className="grid w-full max-w-md grid-cols-3 gap-4"
        aria-label="Select splash cursor preference"
        aria-describedby="splash-cursor-description"
      >
        {[
          {
            value: "enabled",
            label: "Enabled",
            icon: IconSplashCursor,
          },
          {
            value: "disabled",
            label: "Disabled",
            icon: IconSplashCursorDisabled,
          },
        ].map((item) => (
          <RadioGroupItem key={item.value} item={item} isTheme />
        ))}
      </Radio>
      <div id="splash-cursor-description" className="sr-only">
        Choose to enable or disable the splash cursor animation effect
      </div>
    </div>
  );
}

export function AppearanceForm() {
  return (
    <div className="space-y-6 overflow-y-auto px-4">
      <ThemeConfig />
      <SplashCursorConfig />
    </div>
  );
}

function SectionTitle({
  title,
  showReset = false,
  onReset,
  className,
}: {
  title: string;
  showReset?: boolean;
  onReset?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground",
        className
      )}
    >
      {title}
      {showReset && onReset && (
        <Button
          size="icon"
          variant="secondary"
          className="size-4 rounded-full"
          onClick={onReset}
        >
          <RotateCcw className="size-3" />
        </Button>
      )}
    </div>
  );
}

function RadioGroupItem({
  item,
  isTheme = false,
}: {
  item: {
    value: string;
    label: string;
    icon: LucideIcon | ((props: SVGProps<SVGSVGElement>) => React.ReactElement);
  };
  isTheme?: boolean;
}) {
  return (
    <Item
      value={item.value}
      className={cn("group outline-none", "transition duration-200 ease-in")}
      aria-label={`Select ${item.label.toLowerCase()}`}
      aria-describedby={`${item.value}-description`}
    >
      <div
        className={cn(
          "relative rounded-[6px] ring-[1px] ring-border",
          "group-data-[state=checked]:ring-primary",
          "group-focus-visible:ring-2"
        )}
        role="img"
        aria-hidden="false"
        aria-label={`${item.label} option preview`}
      >
        <CircleCheck
          className={cn(
            "size-6 fill-primary stroke-white",
            "group-data-[state=unchecked]:hidden",
            "absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
          )}
          aria-hidden="true"
        />
        {(() => {
          const IconComponent = item.icon;
          return (
            <IconComponent
              className={cn(
                !isTheme &&
                  "fill-primary stroke-primary group-data-[state=unchecked]:fill-muted-foreground group-data-[state=unchecked]:stroke-muted-foreground"
              )}
              aria-hidden="true"
            />
          );
        })()}
      </div>
      <div
        className="mt-1 text-xs"
        id={`${item.value}-description`}
        aria-live="polite"
      >
        {item.label}
      </div>
    </Item>
  );
}
