import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { SearchBar } from "@/components/deck/SearchBar";
import { CommandCard } from "@/components/deck/CommandCard";
import { PageHeader } from "@/components/deck/PageHeader";
import { TerminalBlock } from "@/components/deck/Terminal";
import { SYSTEM_META } from "@/components/deck/SystemBadge";
import { searchCommands, findByName, SYSTEMS, commands } from "@/data/commands";
import type { SystemId } from "@/data/types";
import { useStore } from "@/lib/store";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/buscar")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Pesquisa global de comandos — CYBER DECK NKZ" },
      {
        name: "description",
        content:
          "Pesquise qualquer comando e compare a implementação em Linux, Termux, PowerShell e CMD lado a lado.",
      },
      { property: "og:title", content: "Pesquisa global de comandos — CYBER DECK NKZ" },
      {
        property: "og:description",
        content: "Compare o mesmo comando nos quatro sistemas com exemplos e explicações.",
      },
    ],
  }),
  component: Buscar,
});

function Buscar() {
  const { q: initial } = Route.useSearch();
  const navigate = useNavigate();
  const [q, setQ] = useState(initial ?? "");
  const { store, toggleFavorite } = useStore();

  const results = useMemo(() => searchCommands(q), [q]);

  const comparison = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return null;
    const direct = findByName(term);
    const byTag = results.filter((c) => c.tags.includes(term) || c.name.toLowerCase() === term);
    const related = commands.filter((c) =>
      c.alternatives.some((a) => a.code.toLowerCase().split(/[\s(]/)[0] === term),
    );
    const pool = [...new Set([...direct, ...(direct.length ? [] : byTag), ...related])];
    if (pool.length < 2) return null;
    const map = new Map<SystemId, (typeof pool)[number]>();
    for (const c of pool) if (!map.has(c.system)) map.set(c.system, c);
    return map.size >= 2 ? map : null;
  }, [q, results]);

  const onChange = (v: string) => {
    setQ(v);
    navigate({ to: "/buscar", search: v ? { q: v } : {}, replace: true });
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="🔎 Pesquisa global" subtitle="Comando, ferramenta ou conceito" back />
      <div className="flex flex-col gap-4 px-4">
        <SearchBar value={q} onChange={onChange} autoFocus />

        {comparison && (
          <section className="rise">
            <h2 className="mb-2 text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
              Comparação entre sistemas
            </h2>
            <div className="flex flex-col gap-3">
              {SYSTEMS.map((s) => {
                const c = comparison.get(s.id);
                if (!c) return null;
                return (
                  <div key={s.id} className="card-deck p-3">
                    <p className="mb-2 text-xs font-bold" style={{ color: `var(--${s.accent})` }}>
                      {SYSTEM_META[s.id].icon} {SYSTEM_META[s.id].name}
                    </p>
                    <TerminalBlock code={c.examples[0]?.code ?? c.syntax} />
                    <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                      {c.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section className="pb-6">
          <h2 className="mb-2 text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
            {q ? `${results.length} resultado(s)` : "Digite para pesquisar"}
          </h2>
          <div className="flex flex-col gap-2">
            {results.map((c) => (
              <CommandCard
                key={c.id}
                command={c}
                favorite={store.favorites.includes(c.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
          {q && results.length === 0 && (
            <p className="text-xs text-muted-foreground">
              Nada encontrado. Tente "ping", "firewall", "logs" ou "hash".
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
