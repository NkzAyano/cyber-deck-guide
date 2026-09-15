import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/deck/PageHeader";
import { SYSTEMS, LEVELS, getBySystem, commands, commandById } from "@/data/commands";
import type { Command, SystemId } from "@/data/types";
import { useStore, progressForSystem } from "@/lib/store";
import { CommandCard } from "@/components/deck/CommandCard";

export const Route = createFileRoute("/estudos")({
  head: () => ({
    meta: [
      { title: "Trilha de estudos e quiz — CYBER DECK NKZ" },
      {
        name: "description",
        content:
          "Sete níveis de aprendizado, do básico à cibersegurança, com progresso por sistema e quiz para fixar comandos de terminal.",
      },
      { property: "og:title", content: "Trilha de estudos e quiz — CYBER DECK NKZ" },
      {
        property: "og:description",
        content: "Fundamentos, sistema, redes, segurança, automação, cibersegurança e laboratório.",
      },
    ],
  }),
  component: Estudos,
});

const LEVEL_CATEGORIES: Record<number, string[]> = {
  1: ["Arquivos", "Texto e logs", "Ferramentas"],
  2: ["Sistema", "Processos", "Pacotes", "Software", "Discos"],
  3: ["Redes"],
  4: ["Permissões", "Firewall", "Segurança", "Usuários"],
  5: ["Bash", "Avançado", "Scripts", "Programação"],
  6: ["Logs", "Diagnóstico", "Criptografia"],
  7: ["Android"],
};

function levelCommands(level: number): Command[] {
  const cats = LEVEL_CATEGORIES[level] ?? [];
  const byCat = commands.filter((c) => cats.includes(c.category));
  if (level === 7) return commands.filter((c) => c.cyber === "CTF/Laboratório" || byCat.includes(c));
  if (level === 6) return commands.filter((c) => byCat.includes(c) || c.cyber === "Defesa/SOC");
  return byCat;
}

type Question = { prompt: string; answer: string; options: string[]; id: string };

function buildQuiz(system: SystemId): Question[] {
  const pool = getBySystem(system);
  const picked = [...pool].sort(() => Math.random() - 0.5).slice(0, 5);
  return picked.map((c) => {
    const wrong = pool
      .filter((o) => o.id !== c.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((o) => o.name);
    return {
      id: c.id,
      prompt: c.description,
      answer: c.name,
      options: [...wrong, c.name].sort(() => Math.random() - 0.5),
    };
  });
}

function Estudos() {
  const { store, toggleFavorite, toggleStudy } = useStore();
  const [openLevel, setOpenLevel] = useState<number | null>(null);
  const [quizSystem, setQuizSystem] = useState<SystemId | null>(null);
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);

  const studying = useMemo(
    () => store.studies.map(commandById).filter(Boolean) as Command[],
    [store.studies],
  );

  const startQuiz = (system: SystemId) => {
    setQuizSystem(system);
    setQuiz(buildQuiz(system));
    setStep(0);
    setScore(0);
    setChosen(null);
  };

  const answer = (opt: string) => {
    if (chosen) return;
    setChosen(opt);
    if (opt === quiz[step].answer) setScore((s) => s + 1);
  };

  const next = () => {
    setChosen(null);
    setStep((s) => s + 1);
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="📊 Estudos" subtitle="Progresso, níveis e quiz" back />
      <div className="flex flex-col gap-6 px-4 pb-6">
        <section>
          <h2 className="mb-2 text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
            Progresso por sistema
          </h2>
          <div className="flex flex-col gap-2">
            {SYSTEMS.map((s) => {
              const total = getBySystem(s.id).length;
              const pct = progressForSystem(s.id, total, store.studies);
              return (
                <div key={s.id} className="card-deck p-3">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 text-xs">
                    <span className="min-w-0 truncate">
                      {s.icon} {s.name}
                    </span>
                    <span className="text-primary">{pct}%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <button
                    type="button"
                    onClick={() => startQuiz(s.id)}
                    className="mt-2 text-[11px] text-accent underline underline-offset-4"
                  >
                    fazer quiz de {s.name} →
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {quizSystem && (
          <section className="card-deck rise p-3">
            <h2 className="mb-2 text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
              Quiz · {SYSTEMS.find((s) => s.id === quizSystem)?.name}
            </h2>
            {step < quiz.length ? (
              <>
                <p className="text-xs text-muted-foreground">
                  Pergunta {step + 1} de {quiz.length}
                </p>
                <p className="mt-2 text-sm leading-relaxed">
                  Qual comando faz isso: “{quiz[step].prompt}”
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  {quiz[step].options.map((opt) => {
                    const correct = opt === quiz[step].answer;
                    const state = !chosen
                      ? "border-border"
                      : correct
                        ? "border-primary/70 bg-primary/10 text-primary"
                        : opt === chosen
                          ? "border-destructive/60 bg-destructive/10 text-destructive"
                          : "border-border opacity-60";
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => answer(opt)}
                        className={`rounded-md border px-3 py-2 text-left text-xs transition-colors ${state}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {chosen && (
                  <button
                    type="button"
                    onClick={next}
                    className="mt-3 w-full rounded-md border border-primary/50 bg-primary/10 py-2 text-xs text-primary"
                  >
                    Continuar
                  </button>
                )}
              </>
            ) : (
              <div className="text-sm">
                <p>
                  Resultado: <span className="text-primary">{score}</span> / {quiz.length}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => startQuiz(quizSystem)}
                    className="rounded-md border border-primary/50 bg-primary/10 px-3 py-2 text-xs text-primary"
                  >
                    Jogar de novo
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuizSystem(null)}
                    className="rounded-md border border-border px-3 py-2 text-xs text-muted-foreground"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        <section>
          <h2 className="mb-2 text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
            Níveis
          </h2>
          <div className="flex flex-col gap-2">
            {LEVELS.map((l) => {
              const list = levelCommands(l.n);
              const done = list.filter((c) => store.studies.includes(c.id)).length;
              const open = openLevel === l.n;
              return (
                <div key={l.n} className="card-deck p-3">
                  <button
                    type="button"
                    onClick={() => setOpenLevel(open ? null : l.n)}
                    className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 text-left"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm">
                        <span className="text-accent">Nível {l.n}</span> — {l.name}
                      </p>
                      <p className="truncate text-[11px] text-muted-foreground">{l.desc}</p>
                    </div>
                    <span className="shrink-0 text-[11px] text-primary">
                      {done}/{list.length}
                    </span>
                  </button>
                  {open && (
                    <div className="mt-3 flex flex-col gap-2">
                      {list.slice(0, 40).map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => toggleStudy(c.id)}
                          className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-md border border-border px-2.5 py-2 text-left text-xs"
                        >
                          <span className={store.studies.includes(c.id) ? "text-primary" : "text-muted-foreground"}>
                            {store.studies.includes(c.id) ? "☑" : "☐"}
                          </span>
                          <span className="min-w-0 truncate">
                            {c.name}{" "}
                            <span className="text-muted-foreground">· {c.system}</span>
                          </span>
                        </button>
                      ))}
                      <Link
                        to="/buscar"
                        search={{ q: l.name }}
                        className="text-[11px] text-accent underline underline-offset-4"
                      >
                        pesquisar mais deste nível →
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {studying.length > 0 && (
          <section>
            <h2 className="mb-2 text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
              Meus estudos ({studying.length})
            </h2>
            <div className="flex flex-col gap-2">
              {studying.map((c) => (
                <CommandCard
                  key={c.id}
                  command={c}
                  favorite={store.favorites.includes(c.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
