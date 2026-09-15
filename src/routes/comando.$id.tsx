import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { Star, BookOpen, FlaskConical, Copy } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/deck/PageHeader";
import { TerminalBlock } from "@/components/deck/Terminal";
import { SystemBadge, LevelBadge, SYSTEM_META } from "@/components/deck/SystemBadge";
import { commandById, findByName } from "@/data/commands";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/comando/$id")({
  beforeLoad: ({ params }) => {
    if (!commandById(params.id)) throw notFound();
  },
  head: ({ params }) => {
    const c = commandById(params.id);
    const title = c ? `${c.name} — ${SYSTEM_META[c.system].name} | CYBER DECK NKZ` : "Comando";
    const description = c
      ? `${c.description} Sintaxe, parâmetros, exemplo seguro e alternativas em Linux, Termux, PowerShell e CMD.`
      : "Detalhes do comando.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CommandPage,
});

function CommandPage() {
  const { id } = Route.useParams();
  const command = commandById(id)!;
  const { store, toggleFavorite, toggleStudy, pushHistory } = useStore();

  useEffect(() => {
    pushHistory(id);
  }, [id, pushHistory]);

  const isFav = store.favorites.includes(id);
  const isStudy = store.studies.includes(id);

  const copyAll = async () => {
    await navigator.clipboard.writeText(command.syntax);
    toast.success("Sintaxe copiada");
  };

  const docsUrl = `https://duckduckgo.com/?q=${encodeURIComponent(
    `${command.name} ${SYSTEM_META[command.system].name} documentação`,
  )}`;

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title={command.name} subtitle={command.category} back />
      <div className="flex flex-col gap-5 px-4 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <SystemBadge system={command.system} />
          <LevelBadge level={command.level} />
          {command.cyber && (
            <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] text-accent">
              🛡️ {command.cyber}
            </span>
          )}
          {command.termuxOnly && (
            <span className="rounded-full border border-termux/40 bg-termux/10 px-2 py-0.5 text-[10px] text-termux">
              exclusivo Termux
            </span>
          )}
        </div>

        <section>
          <h2 className="section-title mb-1 text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
            Descrição
          </h2>
          <p className="text-sm leading-relaxed">{command.description}</p>
        </section>

        <section>
          <h2 className="mb-2 text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
            Sintaxe
          </h2>
          <TerminalBlock code={command.syntax} label={SYSTEM_META[command.system].name} />
        </section>

        {command.params.length > 0 && (
          <section>
            <h2 className="mb-2 text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
              Parâmetros principais
            </h2>
            <ul className="flex flex-col gap-1.5">
              {command.params.map((p) => (
                <li key={p.flag} className="card-deck grid grid-cols-[auto_minmax(0,1fr)] gap-3 p-2.5">
                  <code className="shrink-0 text-xs text-primary">{p.flag}</code>
                  <span className="min-w-0 text-xs text-muted-foreground">{p.desc}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {command.examples.length > 0 && (
          <section>
            <h2 className="mb-2 text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
              Exemplos seguros
            </h2>
            <div className="flex flex-col gap-3">
              {command.examples.map((ex) => (
                <div key={ex.code}>
                  <TerminalBlock code={ex.code} />
                  <p className="mt-1 text-[11px] text-muted-foreground">{ex.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[10px] leading-relaxed text-warn">
              ⚠️ Use apenas em máquinas próprias, laboratórios ou sistemas com autorização por escrito.
            </p>
          </section>
        )}

        {command.alternatives.length > 0 && (
          <section>
            <h2 className="mb-2 text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
              Alternativas nos outros sistemas
            </h2>
            <div className="flex flex-col gap-2">
              {command.alternatives.map((alt) => {
                const target = findByName(alt.code.split(" ")[0]).find((c) => c.system === alt.system);
                const body = (
                  <div className="card-deck card-deck-hover grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 p-2.5">
                    <SystemBadge system={alt.system} />
                    <code className="min-w-0 truncate text-xs text-primary">{alt.code}</code>
                  </div>
                );
                return target ? (
                  <Link key={alt.system} to="/comando/$id" params={{ id: target.id }}>
                    {body}
                  </Link>
                ) : (
                  <div key={alt.system}>{body}</div>
                );
              })}
            </div>
          </section>
        )}

        <section className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={copyAll}
            className="card-deck card-deck-hover flex items-center justify-center gap-2 py-2.5 text-xs"
          >
            <Copy className="h-4 w-4" /> Copiar
          </button>
          <button
            type="button"
            onClick={() => toggleFavorite(id)}
            className={`card-deck card-deck-hover flex items-center justify-center gap-2 py-2.5 text-xs ${isFav ? "text-warn" : ""}`}
          >
            <Star className="h-4 w-4" fill={isFav ? "currentColor" : "none"} />
            {isFav ? "Favoritado" : "Favoritar"}
          </button>
          <a
            href={docsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="card-deck card-deck-hover flex items-center justify-center gap-2 py-2.5 text-xs"
          >
            <BookOpen className="h-4 w-4" /> Documentação
          </a>
          <button
            type="button"
            onClick={() => {
              toggleStudy(id);
              toast.success(isStudy ? "Removido dos estudos" : "Adicionado aos estudos");
            }}
            className={`card-deck card-deck-hover flex items-center justify-center gap-2 py-2.5 text-xs ${isStudy ? "text-primary" : ""}`}
          >
            <FlaskConical className="h-4 w-4" /> {isStudy ? "Estudando" : "Estudar"}
          </button>
        </section>
      </div>
    </div>
  );
}
