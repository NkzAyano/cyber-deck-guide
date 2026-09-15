import type { SystemId } from "@/data/types";

export const SYSTEM_META: Record<SystemId, { name: string; icon: string; cls: string }> = {
  linux: { name: "Linux", icon: "🐧", cls: "text-linux border-linux/40 bg-linux/10" },
  termux: { name: "Termux", icon: "📱", cls: "text-termux border-termux/40 bg-termux/10" },
  powershell: { name: "PowerShell", icon: "🔵", cls: "text-ps border-ps/40 bg-ps/10" },
  cmd: { name: "CMD", icon: "⚫", cls: "text-cmd border-cmd/40 bg-cmd/10" },
};

export function SystemBadge({ system, className = "" }: { system: SystemId; className?: string }) {
  const m = SYSTEM_META[system];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${m.cls} ${className}`}
    >
      <span aria-hidden>{m.icon}</span>
      {m.name}
    </span>
  );
}

export function LevelBadge({ level }: { level: string }) {
  const cls =
    level === "Básico"
      ? "text-primary border-primary/40 bg-primary/10"
      : level === "Intermediário"
        ? "text-accent border-accent/40 bg-accent/10"
        : "text-warn border-warn/40 bg-warn/10";
  return (
    <span className={`inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[10px] ${cls}`}>
      {level}
    </span>
  );
}
