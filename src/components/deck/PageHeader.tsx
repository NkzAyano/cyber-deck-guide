import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  back,
  right,
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
  right?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="flex min-w-0 items-center gap-2">
          {back && (
            <Link
              to="/"
              aria-label="Voltar ao início"
              className="shrink-0 rounded-md border border-border p-1 text-muted-foreground transition-colors hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
          )}
          <div className="min-w-0">
            <h1 className="truncate text-base font-bold tracking-wide text-primary text-glow">
              {title}
            </h1>
            {subtitle && (
              <p className="truncate text-[11px] text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
        {right}
      </div>
    </header>
  );
}
