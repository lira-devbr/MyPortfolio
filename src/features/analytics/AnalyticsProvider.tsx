import { PropsWithChildren, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { dispatchAnalyticsEvent } from "./analytics";

export function AnalyticsProvider({ children }: PropsWithChildren) {
  const location = useLocation();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    dispatchAnalyticsEvent("pageVisited", {
      previousPage: previousPath.current,
      nextPage: location.pathname,
      entryPage: previousPath.current === null ? location.pathname : undefined,
    });
    previousPath.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    let maxScrollDepth = 0;
    const startedAt = performance.now();

    function handleScroll() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollDepth = scrollableHeight <= 0 ? 100 : Math.round((window.scrollY / scrollableHeight) * 100);
      maxScrollDepth = Math.max(maxScrollDepth, scrollDepth);

      dispatchAnalyticsEvent("scrollDepth", {
        scrollDepth,
        maxScrollDepth,
        timeUntilScroll: Math.round(performance.now() - startedAt),
      });
    }

    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const interactiveElement = target.closest("a,button,[data-analytics]");

      if (!interactiveElement) return;

      dispatchAnalyticsEvent("interactionClick", {
        tagName: interactiveElement.tagName,
        label: interactiveElement.textContent?.trim(),
        href: interactiveElement instanceof HTMLAnchorElement ? interactiveElement.href : undefined,
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
      dispatchAnalyticsEvent("visitEnd", { visitEnd: new Date().toISOString(), maxScrollDepth });
    };
  }, []);

  return children;
}
