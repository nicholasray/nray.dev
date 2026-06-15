import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { RxMoon, RxSun } from "react-icons/rx";

type Theme = "light" | "dark" | "system";

const themeItems = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
] satisfies Array<{ label: string; value: Theme }>;

function toggleMetaTags() {
  // Iterate through the relevant meta tags and change to value for dark mode.
  const metaTags =
    document.head.querySelectorAll<HTMLMetaElement>(".meta-theme");
  for (let i = 0; i < metaTags.length; i++) {
    const meta = metaTags[i];
    const other = meta.dataset.other as string;
    meta.dataset.other = meta.content;
    meta.content = other;
  }
}

function enableDarkMode() {
  if (!document.documentElement.classList.contains("dark")) {
    toggleMetaTags();
    document.documentElement.classList.add("dark");
  }
}

function enableLightMode() {
  if (document.documentElement.classList.contains("dark")) {
    toggleMetaTags();
    document.documentElement.classList.remove("dark");
  }
}

function getTheme() {
  if (
    typeof window === "undefined" ||
    localStorage.theme === "dark" ||
    !("theme" in localStorage)
  ) {
    return "dark";
  }

  if (localStorage.theme === "light") {
    return "light";
  }

  return "system";
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    return getTheme();
  });

  useEffect(() => {
    const actions = {
      light: () => {
        localStorage.setItem("theme", "light");
        enableLightMode();
      },
      dark: () => {
        localStorage.setItem("theme", "dark");
        enableDarkMode();
      },
      system: () => {
        localStorage.setItem("theme", "system");
      },
    };

    actions[theme]();
  }, [theme]);

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

    function handleSystemChange() {
      if (mediaQueryList.matches) {
        // User has enabled their system's dark mode setting.
        enableDarkMode();
      } else {
        // User has enabled their system's light mode setting.
        enableLightMode();
      }
    }

    function bindMediaQueryListener() {
      // Handle system theme changes.
      if (mediaQueryList.addEventListener) {
        mediaQueryList.addEventListener("change", handleSystemChange);
      } else {
        // In Safari versions < 14, the `addEventListener` API is not
        // available, so use `addListener` method instead.
        mediaQueryList.addListener(handleSystemChange);
      }

      return mediaQueryList;
    }

    if (theme === "system") {
      bindMediaQueryListener();
      handleSystemChange();
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", handleSystemChange);
      } else {
        mediaQueryList.removeListener(handleSystemChange);
      }
    };
  }, [theme]);

  return (
    <Select
      items={themeItems}
      value={theme}
      onValueChange={(value) => {
        if (value === null || Array.isArray(value)) {
          return;
        }

        setTheme(value);
      }}
    >
      <SelectTrigger
        aria-label="Toggle theme"
        showIcon={false}
        className="text-foreground/80 hover:bg-muted hover:text-foreground border-none"
      >
        <RxMoon className="hidden h-5 w-5 dark:block" />
        <RxSun className="h-5 w-5 dark:hidden" />
        <SelectValue className="sr-only" />
        <span className="sr-only">Toggle theme</span>
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} align="end" sideOffset={4}>
        {themeItems.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default ThemeToggle;
