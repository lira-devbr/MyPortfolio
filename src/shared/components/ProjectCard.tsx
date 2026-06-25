import { ArrowUpRight, ExternalLink, Github, Info } from "lucide-react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Project } from "../constants/projects";
import { cn } from "../utils/cn";
import { Badge } from "./Badge";
import { StackBadge } from "./StackBadge";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

function ProjectActions({ project, compact = false }: { project: Project; compact?: boolean }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-foreground text-background transition hover:bg-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          compact ? "h-10 w-10 p-0" : "px-4 py-2 text-sm font-medium",
        )}
        to={`/projects/${project.id}`}
        aria-label={compact ? t("action.details") : undefined}
      >
        <Info className="h-4 w-4" aria-hidden="true" />
        {!compact && t("action.details")}
      </Link>
      <a
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-transparent text-foreground transition hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        href={project.repositoryUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={t("action.repository")}
      >
        <Github className="h-4 w-4" aria-hidden="true" />
      </a>
      <a
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-transparent text-foreground transition hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          compact ? "h-10 w-10 p-0" : "px-4 py-2 text-sm font-medium",
        )}
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={compact ? t("action.live") : undefined}
      >
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
        {!compact && t("action.live")}
      </a>
    </div>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  return (
    <div
      className="relative min-h-64 overflow-hidden bg-[#030607] md:min-h-full"
      aria-label="Project visual preview"
      role="img"
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-90", project.accentClass)} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_24%,rgba(255,255,255,0.24),transparent_13rem),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_46%)]" />
      <div className="absolute left-8 right-8 top-8 rounded-md border border-white/12 bg-black/34 p-3 shadow-2xl backdrop-blur-sm">
        <div className="mb-4 flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/50" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
        </div>
        <div className="grid gap-3">
          <span className="h-3 w-2/3 rounded-full bg-white/55" />
          <span className="h-20 rounded-md border border-white/10 bg-white/12" />
          <span className="h-3 w-5/6 rounded-full bg-white/20" />
          <span className="h-3 w-1/2 rounded-full bg-white/20" />
        </div>
      </div>
      <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-3">
        {project.stack.map((item) => (
          <span key={item} className="h-16 rounded-md border border-white/10 bg-white/10 backdrop-blur-sm" />
        ))}
      </div>
      <div className="absolute inset-y-0 right-0 hidden w-px bg-border md:block" />
    </div>
  );
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const { t } = useTranslation();

  if (featured) {
    return (
      <article
        className="group relative isolate grid min-h-[460px] overflow-hidden rounded-lg border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-glow md:grid-cols-2"
        data-analytics="project-card"
      >
        <ProjectPreview project={project} />

        <div className="relative flex min-h-[420px] flex-col justify-between p-6 md:p-8">
          <div className={cn("absolute inset-0 -z-10 bg-gradient-to-br opacity-80", project.accentClass)} />
          <div className="absolute right-5 top-5 rounded-full border border-border bg-background/70 p-2 opacity-70 transition group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </div>

          <div>
            <Badge>{t(`projects.${project.category}`)}</Badge>
            <h3 className="mt-8 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              {t(`projects.items.${project.id}.title`)}
            </h3>
            <p className="mt-4 max-w-xl text-lg leading-7 text-muted-foreground">
              {t(`projects.items.${project.id}.description`)}
            </p>
          </div>

          <div>
            <p className="mb-5 font-display text-2xl font-semibold text-primary">{t(`projects.metrics.${project.metricKey}`)}</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <StackBadge key={item} name={item} />
              ))}
            </div>
            <div className="mt-6">
              <ProjectActions project={project} />
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group relative isolate flex overflow-hidden rounded-lg border border-border bg-card p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-glow",
        "min-h-80 flex-col justify-between",
      )}
      data-analytics="project-card"
    >
      <div className={cn("absolute inset-0 -z-10 bg-gradient-to-br opacity-80", project.accentClass)} />
      <div className="absolute right-5 top-5 rounded-full border border-border bg-background/70 p-2 opacity-70 transition group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4" />
      </div>

      <div>
        <Badge>{t(`projects.${project.category}`)}</Badge>
        <h3 className={cn("mt-8 font-display font-semibold leading-tight", featured ? "text-5xl" : "text-3xl")}>
          {t(`projects.items.${project.id}.title`)}
        </h3>
        <p className={cn("mt-4 leading-7 text-muted-foreground", featured && "max-w-xl text-lg")}>
          {t(`projects.items.${project.id}.description`)}
        </p>
      </div>

      <div>
        <p className="mb-5 font-display text-2xl font-semibold text-primary">{t(`projects.metrics.${project.metricKey}`)}</p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <StackBadge key={item} name={item} />
          ))}
        </div>
        <div className="mt-6">
          <ProjectActions project={project} compact />
        </div>
      </div>
    </article>
  );
}
