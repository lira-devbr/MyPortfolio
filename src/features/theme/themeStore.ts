import { create } from "zustand";

export type ThemePreference = "light" | "dark" | "system";

type ThemeState = {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  preference: (localStorage.getItem("portfolio-theme") as ThemePreference | null) || "dark",
  setPreference: (preference) => {
    localStorage.setItem("portfolio-theme", preference);
    set({ preference });
  },
}));
