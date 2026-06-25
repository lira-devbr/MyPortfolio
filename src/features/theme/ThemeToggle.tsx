import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "../../shared/components/Button";
import { ThemePreference, useThemeStore } from "./themeStore";

const preferences: ThemePreference[] = ["light", "dark", "system"];

export function ThemeToggle() {
  const preference = useThemeStore((state) => state.preference);
  const setPreference = useThemeStore((state) => state.setPreference);

  function rotateTheme() {
    const currentIndex = preferences.indexOf(preference);
    setPreference(preferences[(currentIndex + 1) % preferences.length]);
  }

  const Icon = preference === "light" ? Sun : preference === "dark" ? Moon : Monitor;

  return (
    <Button
      className="border-white/15 text-white hover:bg-white/10"
      variant="ghost"
      size="icon"
      onClick={rotateTheme}
      aria-label="Change theme"
    >
      <Icon aria-hidden="true" />
    </Button>
  );
}
