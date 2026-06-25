import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../../shared/components/Button";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const nextLanguage = i18n.language === "pt-BR" ? "en-US" : "pt-BR";

  function changeLanguage() {
    localStorage.setItem("portfolio-language", nextLanguage);
    void i18n.changeLanguage(nextLanguage);
  }

  return (
    <Button
      className="border-white/15 text-white hover:bg-white/10"
      variant="ghost"
      size="icon"
      onClick={changeLanguage}
      aria-label="Change language"
    >
      <Languages aria-hidden="true" />
    </Button>
  );
}
