import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Command } from "@/data/types";
import { SystemBadge, LevelBadge } from "./SystemBadge";

export function CommandCard({
  command,
  favorite = false,
  onToggleFavorite,
}: {
  command: Command;
  favorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}) {
  return (
    <div className="card-deck card-deck-hover rise relative p-3">
      <Link to="/comando/$id" params={{ id: command.id }} className="block">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-primary text-glow">{command.name}</p>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {command.description}
            </p>
          </div>
          <SystemBadge system={command.system} />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[10px] text-muted-foreground">
            {command.category}
          </span>
          <LevelBadge level={command.level} />
          {command.termuxOnly && (
            <span className="rounded-full border border-termux/40 bg-termux/10 px-2 py-0.5 text-[10px] text-termux">
              exclusivo Termux
            </span>
          )}
        </div>
      </Link>
      {onToggleFavorite && (
        <button
          type="button"
          aria-label={favorite ? "Remover dos favoritos" : "Favoritar"}
          onClick={() => onToggleFavorite(command.id)}
          className="absolute right-2 bottom-2 rounded-md p-1.5 text-muted-foreground transition-colors hover:text-warn"
        >
          <Star className="h-4 w-4" fill={favorite ? "currentColor" : "none"} />
        </button>
      )}
    </div>
  );
}
