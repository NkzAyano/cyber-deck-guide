import { createFileRoute, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/deck/PageHeader";
import { CommandCard } from "@/components/deck/CommandCard";
import { SearchBar } from "@/components/deck/SearchBar";
import { SYSTEMS, getBySystem, getCategoriesFor } from "@/data/commands";
import type { SystemId } from "@/data/types";
import { useStore, progressForSystem } from "@/lib/store";

const CATEGORY_ICONS: Record<string, string> = {
  Arquivos: "📁",
  Permissões: "🔐",
  Sistema: "⚙️",
  Processos: "🔄",
  Redes: "🌐",
  Firewall: "🔥",
  Pacotes: "📦",
  "Texto e logs": "📝",
  Criptografia: "🔑",
  Bash: "🐚",
  Android: "📱",
  Programação: "🐍",
  Ferramentas: "🛠️",
  Usuários: "👤",
  Segurança: "🔐",
  Logs: "📜",
  Software: "📦",
  Avançado: "🧠",
  Discos: "💾",
  Diagnóstico: "📜",
  Scripts: "📝",
};

export const Route = createFileRoute("/sistema/$system")({
  beforeLoad: ({ params }) => {
    if (!SYSTEMS.some((s) => s.id === params.system)) throw notFound();
  },
  head: ({ params }) => {
    const s = SYSTEMS.find((x) => x.id === params.system);
    const title = `Comandos ${s?.name ?? "do sistema"} — CYBER DECK NKZ`;
    const description = `Catálogo de comandos ${s?.name ?? ""} por categoria: arquivos, sistema, redes, segurança e automação, com exemplos seguros.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: SystemPage,
});

function SystemPage() {
  const { system } = Route.useParams();
  const sys = SYSTEMS.find((s) => s.id === system)!;
  const all = useMemo(() => getBySystem(system as SystemId), [system]);
  const categories = useMemo(() => getCategoriesFor(system as SystemId), [system]);
  const [cat, setCat] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const { store, toggleFavorite } = useStore();

  const list = all.filter(
    (c) =>
      (!cat || c.category === cat) &&
      (!q || (c.name + c.description + c.tags.join(" ")).toLowerCase().includes(q.toLowerCase())),
  );
  const pct = progressForSystem(system as SystemId, all.length, store.studies);

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title={`${sys.icon} ${sys.name}`} subtitle={`${sys.short} · ${all.length} comandos`} back />
      <div className="flex flex-col gap-4 px-4 pb-6">
        <div className="card-deck p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progresso de estudo</span>
            <span className="text-primary">{pct}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {system === "termux" && (
          <p className="card-deck border-termux/40 p-3 text-[11px] leading-relaxed text-muted-foreground">
            Comandos marcados como <span className="text-termux">exclusivo Termux</span> só existem no
            Android. Os demais são comandos Linux que funcionam normalmente dentro do Termux.
          </p>
        )}

        <SearchBar value={q} onChange={setQ} placeholder={`Filtrar comandos de ${sys.name}...`} />

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCat(null)}
            className={`rounded-full border px-3 py-1 text-[11px] transition-colors ${!cat ? "border-primary/60 bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}
          >
            Todas
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c === cat ? null : c)}
              className={`rounded-full border px-3 py-1 text-[11px] transition-colors ${c === cat ? "border-primary/60 bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}
            >
              {CATEGORY_ICONS[c] ?? "•"} {c}
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
        </div>
      </div>
    </div>
  );
}
