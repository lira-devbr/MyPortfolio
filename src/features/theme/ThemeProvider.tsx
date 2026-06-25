import { PropsWithChildren, useEffect } from "react";
import { useThemeStore } from "./themeStore";

export function ThemeProvider({ children }: PropsWithChildren) {
  const preference = useThemeStore((state) => state.preference);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = preference === "dark" || (preference === "system" && prefersDark);

    document.documentElement.classList.toggle("dark", shouldUseDark);
    document.documentElement.dataset.theme = preference;
  }, [preference]);

  return children;
}
