import type { Command, Row, SystemId, Alternative, Example, Param } from "./types";
import { linuxRows } from "./linux";
import { termuxRows, termuxOnlyNames } from "./termux";
import { powershellRows } from "./powershell";
import { cmdRows } from "./cmd";

function parsePairs(raw: string, sep: string): { a: string; b: string }[] {
  if (!raw) return [];
  return raw
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((chunk) => {
      const i = chunk.indexOf(sep);
      if (i === -1) return { a: chunk, b: "" };
      return { a: chunk.slice(0, i).trim(), b: chunk.slice(i + sep.length).trim() };
    });
}

function toParams(raw: string): Param[] {
  return parsePairs(raw, "|").map(({ a, b }) => ({ flag: a, desc: b }));
}
function toExamples(raw: string): Example[] {
  return parsePairs(raw, "|").map(({ a, b }) => ({ code: a, desc: b }));
}
function toAlternatives(raw: string): Alternative[] {
  return parsePairs(raw, ":")
    .map(({ a, b }) => ({ system: a as SystemId, code: b }))
    .filter((x) => x.code && x.code !== "-");
}

function slug(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function rowsToCommands(rows: Row[], system: SystemId): Command[] {
  return rows.map((r) => {
    const [name, category, level, description, syntax, params, examples, alts, tags, cyber] = r;
    const cmd: Command = {
      id: `${system}-${slug(name)}`,
      name,
      system,
      category,
      level,
      description,
      syntax,
      params: toParams(params),
      examples: toExamples(examples),
      alternatives: toAlternatives(alts),
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    if (cyber) cmd.cyber = cyber;
    if (system === "termux" && termuxOnlyNames.has(name)) cmd.termuxOnly = true;
    return cmd;
  });
}

export const commands: Command[] = [
  ...rowsToCommands(linuxRows, "linux"),
  ...rowsToCommands(termuxRows, "termux"),
  ...rowsToCommands(powershellRows, "powershell"),
  ...rowsToCommands(cmdRows, "cmd"),
];

export const SYSTEMS: {
  id: SystemId;
  name: string;
  icon: string;
  short: string;
  accent: string;
}[] = [
  { id: "linux", name: "Linux", icon: "🐧", short: "GNU/Linux", accent: "linux" },
  { id: "termux", name: "Termux", icon: "📱", short: "Android / Termux", accent: "termux" },
  { id: "powershell", name: "PowerShell", icon: "🔵", short: "Windows PowerShell", accent: "ps" },
  { id: "cmd", name: "CMD", icon: "⚫", short: "Windows CMD", accent: "cmd" },
];

export const CROSS_CATEGORIES = [
  { id: "Networking", label: "Networking", icon: "🌐" },
  { id: "Diagnóstico", label: "Diagnóstico", icon: "🔎" },
  { id: "Segurança", label: "Segurança", icon: "🔐" },
  { id: "Logs", label: "Logs", icon: "📜" },
  { id: "CTF/Laboratório", label: "CTF / Lab", icon: "🧪" },
  { id: "OSINT", label: "OSINT", icon: "🕵️" },
  { id: "Web Security", label: "Web Security", icon: "🌐" },
  { id: "Criptografia", label: "Criptografia", icon: "🔑" },
  { id: "Defesa/SOC", label: "Defesa / SOC", icon: "🛡️" },
  { id: "Automação", label: "Automação", icon: "🐚" },
] as const;

export function getBySystem(system: SystemId): Command[] {
  return commands.filter((c) => c.system === system);
}

export function getCategoriesFor(system: SystemId): string[] {
  const set = new Set<string>();
  for (const c of commands) if (c.system === system) set.add(c.category);
  return Array.from(set);
}

export function getByCyberArea(area: string): Command[] {
  return commands.filter((c) => c.cyber === area);
}

export function findByName(name: string): Command[] {
  const n = name.toLowerCase();
  return commands.filter(
    (c) => c.name.toLowerCase() === n || c.name.toLowerCase().replace(/\s+/g, "") === n.replace(/\s+/g, ""),
  );
}

export function searchCommands(q: string): Command[] {
  const query = q.trim().toLowerCase();
  if (!query) return [];
  const terms = query.split(/\s+/);
  const scored: { c: Command; score: number }[] = [];
  for (const c of commands) {
    const hay = [
      c.name,
      c.description,
      c.category,
      c.syntax,
      c.tags.join(" "),
      c.cyber ?? "",
    ]
      .join(" ")
      .toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (!hay.includes(t)) {
        score = -1;
        break;
      }
      if (c.name.toLowerCase() === t) score += 10;
      else if (c.name.toLowerCase().startsWith(t)) score += 5;
      else if (c.name.toLowerCase().includes(t)) score += 3;
      else score += 1;
    }
    if (score > 0) scored.push({ c, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.c);
}

export function commandOfTheDay(): Command {
  const now = new Date();
  const start = Date.UTC(now.getUTCFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start) / 86400000);
  return commands[dayOfYear % commands.length]!;
}

export function commandById(id: string): Command | undefined {
  return commands.find((c) => c.id === id);
}

export const LEVELS = [
  { n: 1, name: "Fundamentos", desc: "Arquivos, navegação e leitura de texto." },
  { n: 2, name: "Sistema", desc: "Processos, serviços, hardware e discos." },
  { n: 3, name: "Redes", desc: "IP, portas, DNS e diagnóstico." },
  { n: 4, name: "Segurança", desc: "Permissões, firewall e hardening." },
  { n: 5, name: "Automação", desc: "Scripts, pipes e agendamento." },
  { n: 6, name: "Cibersegurança", desc: "Defesa, monitoramento e SOC." },
  { n: 7, name: "CTF / Laboratório", desc: "Práticas em laboratório próprio." },
] as const;
