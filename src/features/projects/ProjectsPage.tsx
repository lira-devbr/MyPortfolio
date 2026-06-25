import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../shared/components/Button";
import { ProjectCard } from "../../shared/components/ProjectCard";
import { ProjectCategory, projects } from "../../shared/constants/projects";

const categories: Array<ProjectCategory | "all"> = ["all", "web", "automation", "data"];

export default function ProjectsPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProjectCategory | "all">("all");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const title = t(`projects.items.${project.id}.title`).toLowerCase();
      const description = t(`projects.items.${project.id}.description`).toLowerCase();
      const matchesQuery = `${title} ${description}`.includes(query.toLowerCase());
      const matchesCategory = category === "all" || project.category === category;

      return matchesQuery && matchesCategory;
    });
  }, [category, query, t]);

  return (
    <section className="mx-auto min-h-[70vh] max-w-6xl px-5 py-20">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">{t("nav.projects")}</p>
      <h1 className="font-display text-5xl font-semibold sm:text-7xl">{t("projects.title")}</h1>

      <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <label className="relative w-full md:max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary"
            placeholder={t("projects.search")}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <Button
              key={item}
              variant={category === item ? "secondary" : "ghost"}
              onClick={() => setCategory(item)}
              type="button"
            >
              {t(`projects.${item}`)}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
