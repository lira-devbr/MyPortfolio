import { zodResolver } from "@hookform/resolvers/zod";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { dispatchAnalyticsEvent } from "../analytics/analytics";
import { Button } from "../../shared/components/Button";
import { Card } from "../../shared/components/Card";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { t } = useTranslation();
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  function handleSubmit(data: ContactFormData) {
    dispatchAnalyticsEvent("completedForms", { form: "contact", hasEmail: Boolean(data.email) });
    form.reset();
  }

  return (
    <section className="mx-auto grid min-h-[70vh] max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">{t("nav.contact")}</p>
        <h1 className="font-display text-5xl font-semibold sm:text-7xl">{t("contact.title")}</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">{t("contact.body")}</p>
        <div className="mt-10 grid gap-3">
          {[
            { icon: MessageCircle, label: t("contact.whatsapp"), href: "https://wa.me/5500000000000" },
            { icon: Linkedin, label: t("contact.linkedin"), href: "https://www.linkedin.com/" },
            { icon: Github, label: t("contact.github"), href: "https://github.com/" },
            { icon: Mail, label: t("contact.email"), href: "mailto:hello@example.com" },
          ].map((item) => (
            <a
              key={item.label}
              className="flex items-center gap-3 rounded-lg border border-border p-4 text-sm transition hover:border-primary hover:bg-muted"
              href={item.href}
            >
              <item.icon className="h-5 w-5 text-primary" />
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <Card>
        <form className="grid gap-5" onSubmit={form.handleSubmit(handleSubmit)}>
          <label className="grid gap-2">
            <span className="text-sm text-muted-foreground">{t("contact.name")}</span>
            <input className="rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-primary" {...form.register("name")} />
          </label>
          <label className="grid gap-2">
            <span className="text-sm text-muted-foreground">{t("contact.email")}</span>
            <input className="rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-primary" {...form.register("email")} />
          </label>
          <label className="grid gap-2">
            <span className="text-sm text-muted-foreground">{t("contact.message")}</span>
            <textarea
              className="min-h-40 resize-y rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-primary"
              {...form.register("message")}
            />
          </label>
          <Button type="submit">{t("action.send")}</Button>
        </form>
      </Card>
    </section>
  );
}
