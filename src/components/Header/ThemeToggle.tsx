import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/Select/Select";
import { useEffect, useState } from "react";
import { RxMoon, RxSun } from "react-icons/rx";

type Theme = "light" | "dark" | "system";

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
      value={theme}
      onValueChange={(value: Theme) => {
        const actions = {
          light: () => {
            setTheme("light");
          },
          dark: () => {
            setTheme("dark");
          },
          system: () => {
            setTheme("system");
          },
        };

        actions[value]();
      }}
    >
      <SelectTrigger
        showIcon={false}
        className="hover:bg-muted hover:text-accent-foreground"
      >
        <RxMoon className="hidden dark:block" />
        <RxSun className="dark:hidden" />
        <span className="sr-only">Toggle theme</span>
      </SelectTrigger>
      <SelectContent position="popper" align="end">
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default ThemeToggle;
