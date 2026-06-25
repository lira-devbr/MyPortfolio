import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../utils/cn";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
    size?: "default" | "icon";
  }
>;

export function Button({ className, variant = "primary", size = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "border-primary bg-primary px-5 py-2.5 text-primary-foreground shadow-glow hover:opacity-90",
        variant === "secondary" && "border-border bg-foreground px-5 py-2.5 text-background hover:bg-foreground/90",
        variant === "ghost" && "border-border bg-transparent px-5 py-2.5 text-foreground hover:bg-muted",
        size === "icon" && "h-10 w-10 p-0",
        className,
      )}
      {...props}
    />
  );
}
