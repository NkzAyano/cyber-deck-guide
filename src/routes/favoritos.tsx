import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/deck/PageHeader";
import { CommandCard } from "@/components/deck/CommandCard";
import { commandById } from "@/data/commands";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Favoritos e histórico — CYBER DECK NKZ" },
      {
        name: "description",
        content: "Seus comandos favoritos e o histórico de consultas no CYBER DECK NKZ.",
      },
      { property: "og:title", content: "Favoritos e histórico — CYBER DECK NKZ" },
      {
        property: "og:description",
        content: "Acesse rapidamente os comandos que você marcou e os que consultou por último.",
      },
    ],
  }),
  component: Favoritos,
});

function Favoritos() {
  const { store, toggleFavorite, clearHistory } = useStore();
  const favs = store.favorites.map(commandById).filter(Boolean);
  const hist = store.history.map(commandById).filter(Boolean);

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="⭐ Favoritos" subtitle={`${favs.length} comandos salvos`} back />
      <div className="flex flex-col gap-6 px-4 pb-6">
        <section>
          <div className="flex flex-col gap-2">
            {favs.map(
              (c) =>
                c && (
                  <CommandCard key={c.id} command={c} favorite onToggleFavorite={toggleFavorite} />
                ),
            )}
            {favs.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Nenhum favorito ainda. Toque na estrela de um comando para salvá-lo aqui.
              </p>
            )}
          </div>
        </section>

        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
              Histórico
            </h2>
            {hist.length > 0 && (
              <button
                type="button"
                onClick={clearHistory}
                className="text-[11px] text-muted-foreground underline underline-offset-4"
              >
                limpar
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {hist.map((c) => c && <CommandCard key={c.id} command={c} />)}
            {hist.length === 0 && (
              <p className="text-xs text-muted-foreground">Nenhuma consulta recente.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
