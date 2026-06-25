import { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../utils/cn";

export function Card({ className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-5 shadow-sm transition hover:border-primary/50",
        className,
      )}
      {...props}
    />
  );
}
