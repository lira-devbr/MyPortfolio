import { BookOpen, BriefcaseBusiness, Target } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card } from "../../shared/components/Card";

export default function AboutPage() {
  const { t } = useTranslation();

  const items = [
    { icon: BriefcaseBusiness, text: t("about.experience") },
    { icon: BookOpen, text: t("about.education") },
    { icon: Target, text: t("about.goal") },
  ];

  return (
    <section className="mx-auto min-h-[70vh] max-w-6xl px-5 py-20">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">{t("nav.about")}</p>
      <h1 className="max-w-4xl font-display text-5xl font-semibold leading-tight sm:text-7xl">{t("about.title")}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{t("about.body")}</p>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <Card key={item.text}>
            <item.icon className="mb-8 h-8 w-8 text-primary" />
            <p className="leading-7 text-muted-foreground">{item.text}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
