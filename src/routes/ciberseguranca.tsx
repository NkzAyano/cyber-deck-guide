import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { PageHeader } from "@/components/deck/PageHeader";
import { CommandCard } from "@/components/deck/CommandCard";
import { CROSS_CATEGORIES, getByCyberArea, commands } from "@/data/commands";
import { useStore } from "@/lib/store";

const searchSchema = z.object({ area: z.string().optional() });

export const Route = createFileRoute("/ciberseguranca")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Cibersegurança ética — CYBER DECK NKZ" },
      {
        name: "description",
        content:
          "Comandos de networking, diagnóstico, logs, criptografia, OSINT e defesa nos quatro sistemas, com foco em laboratório próprio e uso autorizado.",
      },
      { property: "og:title", content: "Cibersegurança ética — CYBER DECK NKZ" },
      {
        property: "og:description",
        content: "Trilha transversal de segurança para Linux, Termux, PowerShell e CMD.",
      },
    ],
  }),
  component: CyberPage,
});

function CyberPage() {
  const { area } = Route.useSearch();
  const navigate = useNavigate();
  const { store, toggleFavorite } = useStore();
  const list = area ? getByCyberArea(area) : commands.filter((c) => c.cyber);

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="🛡️ Cibersegurança" subtitle="Transversal aos 4 sistemas" back />
      <div className="flex flex-col gap-4 px-4 pb-6">
        <p className="card-deck border-warn/40 p-3 text-[11px] leading-relaxed text-muted-foreground">
          ⚠️ Todo o conteúdo é voltado a <span className="text-warn">segurança ética</span>: laboratório
          próprio, CTF ou sistemas com autorização formal. Nunca teste em alvos de terceiros.
        </p>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => navigate({ to: "/ciberseguranca", search: {} })}
            className={`rounded-full border px-3 py-1 text-[11px] ${!area ? "border-primary/60 bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}
          >
            Tudo
          </button>
          {CROSS_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() =>
                navigate({ to: "/ciberseguranca", search: area === c.id ? {} : { area: c.id } })
              }
              className={`rounded-full border px-3 py-1 text-[11px] ${area === c.id ? "border-primary/60 bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {list.map((c) => (
            <CommandCard
              key={c.id}
              command={c}
              favorite={store.favorites.includes(c.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
          {list.length === 0 && (
            <p className="text-xs text-muted-foreground">Nenhum comando nesta área ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}
