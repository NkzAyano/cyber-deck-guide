import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SearchBar } from "@/components/deck/SearchBar";
import { TerminalBlock } from "@/components/deck/Terminal";
import { CommandCard } from "@/components/deck/CommandCard";
import { SYSTEMS, CROSS_CATEGORIES, commandOfTheDay, getBySystem, commandById } from "@/data/commands";
import { useStore, progressForSystem } from "@/lib/store";
import { History } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CYBER DECK NKZ — Comandos de terminal para Linux, Termux, PowerShell e CMD" },
      {
        name: "description",
        content:
          "Consulte, compare e estude comandos de Linux, Termux, PowerShell e CMD com exemplos seguros para redes, sistemas e cibersegurança ética.",
      },
      { property: "og:title", content: "CYBER DECK NKZ — Central de comandos de terminal" },
      {
        property: "og:description",
        content: "Linux • Termux • PowerShell • CMD em um só deck, com busca global e trilha de estudos.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { store } = useStore();
  const cotd = commandOfTheDay();
  const history = store.history.map(commandById).filter(Boolean).slice(0, 5);

  return (
    <div className="flex flex-col gap-6 px-4 pt-6">
      <section className="rise">
        <p className="text-[10px] tracking-[0.35em] text-accent uppercase">terminal deck</p>
        <h1 className="text-2xl font-bold tracking-tight text-primary text-glow">
          CYBER DECK NKZ<span className="caret">_</span>
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Linux • Termux • PowerShell • CMD
        </p>
      </section>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/buscar", search: { q } });
        }}
      >
        <SearchBar value={q} onChange={setQ} />
      </form>

      <section>
        <h2 className="mb-2 text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
          Sistemas
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {SYSTEMS.map((s) => {
            const total = getBySystem(s.id).length;
            const pct = progressForSystem(s.id, total, store.studies);
            return (
              <Link
                key={s.id}
                to="/sistema/$system"
                params={{ system: s.id }}
                className="card-deck card-deck-hover rise p-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl" aria-hidden>
                    {s.icon}
                  </span>
                  <span className="min-w-0 truncate text-sm font-bold">{s.name}</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">{total} comandos</p>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground">{pct}% estudado</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
          Categorias
        </h2>
        <div className="flex flex-wrap gap-2">
          {CROSS_CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to="/ciberseguranca"
              search={{ area: c.id }}
              className="card-deck card-deck-hover px-3 py-1.5 text-xs"
            >
              <span aria-hidden>{c.icon}</span> {c.label}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
          Comando do dia
        </h2>
        <div className="card-deck rise p-3">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
            <p className="min-w-0 truncate text-sm font-bold text-primary">{cotd.name}</p>
            <span className="shrink-0 text-[10px] text-muted-foreground uppercase">
              {cotd.category}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{cotd.description}</p>
          <div className="mt-3">
            <TerminalBlock code={cotd.examples[0]?.code ?? cotd.syntax} label={cotd.system} />
          </div>
          <Link
            to="/comando/$id"
            params={{ id: cotd.id }}
            className="mt-3 inline-block text-xs text-accent underline underline-offset-4"
          >
            Ver detalhes →
          </Link>
        </div>
      </section>

      {history.length > 0 && (
        <section>
          <h2 className="mb-2 flex items-center gap-1.5 text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
            <History className="h-3.5 w-3.5" /> Histórico
          </h2>
          <div className="flex flex-col gap-2">
            {history.map((c) => c && <CommandCard key={c.id} command={c} />)}
          </div>
        </section>
      )}
    </div>
  );
}
