import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link, Navigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Badge } from "../../shared/components/Badge";
import { StackBadge } from "../../shared/components/StackBadge";
import { projects } from "../../shared/constants/projects";
import { cn } from "../../shared/utils/cn";

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const { t } = useTranslation();
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <section className="mx-auto min-h-[70vh] max-w-6xl px-5 py-20">
      <Link className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground" to="/projects">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t("action.backToProjects")}
      </Link>

      <div className="mt-10 grid overflow-hidden rounded-lg border border-border bg-card md:grid-cols-2">
        <div className="relative min-h-[360px] overflow-hidden bg-[#030607]">
          <div className={cn("absolute inset-0 bg-gradient-to-br opacity-90", project.accentClass)} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_24%,rgba(255,255,255,0.24),transparent_13rem),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_46%)]" />
          <div className="absolute left-8 right-8 top-8 rounded-md border border-white/12 bg-black/34 p-4 shadow-2xl backdrop-blur-sm">
            <div className="mb-5 flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-white/50" />
              <span className="h-2 w-2 rounded-full bg-white/25" />
              <span className="h-2 w-2 rounded-full bg-white/25" />
            </div>
            <div className="grid gap-4">
              <span className="h-3 w-2/3 rounded-full bg-white/55" />
              <span className="h-32 rounded-md border border-white/10 bg-white/12" />
              <span className="h-3 w-5/6 rounded-full bg-white/20" />
              <span className="h-3 w-1/2 rounded-full bg-white/20" />
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">{t("projects.detailEyebrow")}</p>
          <Badge>{t(`projects.${project.category}`)}</Badge>
          <h1 className="mt-8 font-display text-5xl font-semibold leading-tight sm:text-7xl">
            {t(`projects.items.${project.id}.title`)}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{t(`projects.items.${project.id}.description`)}</p>

          <div className="mt-10 grid gap-6">
            <div>
              <h2 className="font-display text-2xl font-semibold">{t("projects.detailResult")}</h2>
              <p className="mt-3 text-muted-foreground">{t(`projects.metrics.${project.metricKey}`)}</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold">{t("projects.detailStack")}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <StackBadge key={item} name={item} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:bg-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              href={project.repositoryUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              {t("action.repository")}
            </a>
            <a
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              {t("action.live")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
