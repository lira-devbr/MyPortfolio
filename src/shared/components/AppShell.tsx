import { PropsWithChildren, useState } from "react";
import { Home, Menu, X } from "lucide-react";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { cn } from "../utils/cn";
import { Button } from "./Button";

const navItems = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/projects", key: "nav.projects" },
  { to: "/contact", key: "nav.contact" },
];

export function AppShell({ children }: PropsWithChildren) {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const MenuIcon = isMobileMenuOpen ? X : Menu;

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-[#020303]/95 text-white backdrop-blur-xl">
        <nav className="mx-auto max-w-6xl px-5 py-4 md:py-6" aria-label="Primary">
          <div className="flex items-center justify-between md:justify-center">
            <NavLink
              to="/"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10 md:hidden"
              aria-label={t("nav.homeLogo")}
              onClick={closeMobileMenu}
            >
              <Home className="h-4 w-4" aria-hidden="true" />
            </NavLink>

            <div className="hidden flex-wrap items-center justify-center gap-x-10 gap-y-3 sm:gap-x-14 md:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "relative py-1 text-[10px] font-bold uppercase tracking-[0.48em] text-white/64 transition hover:text-white",
                      isActive &&
                        "text-white after:absolute after:-bottom-1 after:left-1/2 after:h-px after:w-5 after:-translate-x-1/2 after:bg-white",
                    )
                  }
                >
                  {t(item.key)}
                </NavLink>
              ))}
            </div>

            <Button
              className="border-white/15 text-white hover:bg-white/10 md:hidden"
              variant="ghost"
              size="icon"
              aria-label={t(isMobileMenuOpen ? "nav.closeMenu" : "nav.openMenu")}
              aria-controls="mobile-navigation"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((current) => !current)}
            >
              <MenuIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <div
            id="mobile-navigation"
            className={cn(
              "grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 md:hidden",
              isMobileMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="min-h-0">
              <div className="flex flex-col gap-1 border-t border-white/10 py-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      cn(
                        "rounded-md px-1 py-3 text-sm font-bold uppercase tracking-[0.32em] text-white/64 transition hover:text-white",
                        isActive && "text-white",
                      )
                    }
                  >
                    {t(item.key)}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="border-t border-border bg-[#030607] text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <p className="font-editorial text-3xl text-white/55">Matheus Lisboa</p>
          <div className="flex flex-wrap gap-8 text-xs font-semibold uppercase tracking-[0.45em] text-white/48">
            <a className="transition hover:text-white" href="https://github.com/">
              Github
            </a>
            <a className="transition hover:text-white" href="https://www.linkedin.com/">
              Linkedin
            </a>
            <a className="transition hover:text-white" href="https://twitter.com/">
              Twitter
            </a>
          </div>
          <p className="text-sm text-white/45 md:text-right">{t("footer.line")}</p>
        </div>
      </footer>
    </div>
  );
}
