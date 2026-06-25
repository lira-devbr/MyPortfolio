import { ArrowRight, ChevronLeft, ChevronRight, Gauge, GitBranch, Layers, MousePointerClick } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import type { TouchEvent } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "../../shared/components/Button";
import { Card } from "../../shared/components/Card";
import { ProjectCard } from "../../shared/components/ProjectCard";
import { StackBadge } from "../../shared/components/StackBadge";
import { projects } from "../../shared/constants/projects";

const skillIcons = [Layers, MousePointerClick, GitBranch, Gauge];
const technologies = [
  { key: "react", name: "React" },
  { key: "typescript", name: "TypeScript" },
  { key: "tailwind", name: "TailwindCSS" },
  { key: "node", name: "Node.js" },
  { key: "query", name: "TanStack Query" },
  { key: "motion", name: "Framer Motion" },
] as const;

export default function LandingPage() {
  const { t } = useTranslation();
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);

  function showPreviousProject() {
    setFeaturedIndex((currentIndex) => (currentIndex === 0 ? projects.length - 1 : currentIndex - 1));
  }

  function showNextProject() {
    setFeaturedIndex((currentIndex) => (currentIndex + 1) % projects.length);
  }

  function handleCarouselTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0].clientX;
    touchCurrentX.current = event.touches[0].clientX;
  }

  function handleCarouselTouchMove(event: TouchEvent<HTMLDivElement>) {
    touchCurrentX.current = event.touches[0].clientX;
  }

  function handleCarouselTouchEnd() {
    if (touchStartX.current === null || touchCurrentX.current === null) {
      return;
    }

    const swipeDistance = touchStartX.current - touchCurrentX.current;
    const minimumSwipeDistance = 48;

    if (swipeDistance > minimumSwipeDistance) {
      showNextProject();
    }

    if (swipeDistance < -minimumSwipeDistance) {
      showPreviousProject();
    }

    touchStartX.current = null;
    touchCurrentX.current = null;
  }

  return (
    <div>
      <section className="bg-[#020303] px-5 pb-12 pt-2 sm:pb-16">
        <motion.div
          className="relative mx-auto min-h-[calc(100svh-6rem)] max-w-6xl overflow-hidden bg-[#020303] px-6 text-white sm:min-h-[700px] sm:px-12"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent_18%,transparent_72%,rgba(255,255,255,0.025))]" />

          <div className="absolute left-1/2 top-14 h-[420px] w-[min(86vw,640px)] -translate-x-1/2 opacity-85 sm:top-20">
            <div className="absolute left-[16%] top-[12%] h-[78%] w-[34%] rounded-[58%_42%_48%_52%] bg-[linear-gradient(102deg,transparent_0%,rgba(255,255,255,0.05)_34%,rgba(255,255,255,0.28)_56%,rgba(255,255,255,0.03)_72%,transparent_100%)] blur-[1px] [mask-image:linear-gradient(to_right,transparent,black_42%,transparent_92%)]" />
            <div className="absolute left-[35%] top-[2%] h-[92%] w-[30%] rounded-[45%_55%_52%_48%] bg-[linear-gradient(118deg,transparent_4%,rgba(255,255,255,0.08)_36%,rgba(255,255,255,0.34)_52%,rgba(255,255,255,0.06)_66%,transparent_100%)] blur-[0.5px] [mask-image:linear-gradient(to_bottom,black_0%,black_62%,transparent_96%)]" />
            <div className="absolute right-[16%] top-[22%] h-[68%] w-[30%] rounded-[50%_46%_48%_56%] bg-[linear-gradient(96deg,transparent_0%,rgba(255,255,255,0.07)_32%,rgba(255,255,255,0.42)_58%,rgba(255,255,255,0.08)_73%,transparent_100%)] blur-[0.5px] [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)]" />
            <div className="absolute inset-x-[8%] bottom-0 h-32 bg-[linear-gradient(180deg,transparent,rgba(2,3,3,0.96)_68%)]" />
          </div>

          <div className="relative z-10 flex min-h-[calc(100svh-6rem)] flex-col items-center justify-end pb-14 pt-[25rem] text-center sm:min-h-[700px] sm:pb-16">
            <p className="font-editorial text-3xl italic leading-none text-white/80">{t("hero.eyebrow")}</p>
            <h1 className="mt-4 max-w-full font-editorial text-[clamp(2.45rem,8vw,6rem)] font-normal uppercase leading-none tracking-[0.18em] text-white sm:tracking-[0.32em]">
              {t("hero.title")}
            </h1>
            <div className="mt-6 h-px w-10 bg-white/40" />
            <p className="mt-6 max-w-3xl text-[11px] font-medium leading-6 text-white/55 sm:text-xs">{t("hero.body")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/projects">
                <Button className="border-white/20 bg-white px-5 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#020303] shadow-none hover:bg-white/86">
                  {t("action.projects")}
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="border-white/20 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white hover:bg-white/10" variant="ghost">
                  {t("action.contact")}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">{t("sections.intro")}</p>
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">{t("intro.title")}</h2>
          <p className="text-lg leading-8 text-muted-foreground">{t("intro.body")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-primary">{t("sections.skills")}</p>
        <div className="grid gap-4 md:grid-cols-4">
          {["architecture", "product", "automation", "analytics"].map((key, index) => {
            const Icon = skillIcons[index];
            return (
              <Card key={key}>
                <Icon className="mb-8 h-8 w-8 text-primary" />
                <h3 className="font-display text-xl font-semibold">{t(`skills.${key}`)}</h3>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-20 md:grid-cols-3">
        {["readable", "accessible", "measurable"].map((key) => (
          <Card key={key} className="bg-transparent">
            <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">{t("sections.differentials")}</p>
            <h3 className="mt-6 font-display text-2xl font-semibold">{t(`differentials.${key}`)}</h3>
          </Card>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-primary">{t("sections.tech")}</p>
        <div className="flex flex-wrap gap-3">
          {technologies.map((technology) => (
            <StackBadge key={technology.key} name={technology.name} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">{t("sections.featured")}</p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={showPreviousProject} aria-label="Previous featured project">
              <ChevronLeft aria-hidden="true" />
            </Button>
            <Button variant="ghost" size="icon" onClick={showNextProject} aria-label="Next featured project">
              <ChevronRight aria-hidden="true" />
            </Button>
          </div>
        </div>
        <div
          className="overflow-hidden rounded-lg touch-pan-y"
          onTouchStart={handleCarouselTouchStart}
          onTouchMove={handleCarouselTouchMove}
          onTouchEnd={handleCarouselTouchEnd}
        >
          <motion.div
            className="flex"
            animate={{ x: `-${featuredIndex * 100}%` }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {projects.map((project) => (
              <div key={project.id} className="min-w-full">
                <ProjectCard project={project} featured />
              </div>
            ))}
          </motion.div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2" aria-label="Featured project carousel controls">
            {projects.map((project, index) => (
              <button
                key={project.id}
                className={`h-2.5 rounded-full transition-all ${
                  featuredIndex === index ? "w-10 bg-primary" : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/55"
                }`}
                onClick={() => setFeaturedIndex(index)}
                aria-label={`Show featured project ${index + 1}: ${t(`projects.items.${project.id}.title`)}`}
                aria-current={featuredIndex === index}
                type="button"
              />
            ))}
          </div>
          <Link className="text-sm text-muted-foreground hover:text-foreground" to="/projects">
            {t("action.projects")}
          </Link>
        </div>
      </section>

      <section className="border-t border-border bg-[#030607] px-5 py-28 text-center text-white sm:py-36">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.45em] text-white/45">{t("sections.ctaEyebrow")}</p>
        <h2 className="mx-auto max-w-5xl font-editorial text-6xl font-normal leading-none tracking-normal sm:text-8xl">
          {t("sections.cta")}
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg font-medium leading-8 text-white/48 sm:text-xl">{t("sections.ctaBody")}</p>
        <Link
          className="mt-9 inline-flex rounded-full bg-white px-7 py-4 text-base font-medium text-[#06090b] transition hover:bg-white/[0.88] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          to="/contact"
        >
          {t("action.send")}
        </Link>
      </section>
    </div>
  );
}
