import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function TerminalBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Comando copiado");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Não foi possível copiar");
    }
  };

  return (
    <div className="term-block scanlines">
      <div className="flex items-center justify-between border-b border-primary/15 px-3 py-1.5">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-destructive/70" />
          <span className="h-2 w-2 rounded-full bg-warn/70" />
          <span className="h-2 w-2 rounded-full bg-primary/70" />
          {label && (
            <span className="ml-2 text-[10px] tracking-wider text-muted-foreground uppercase">
              {label}
            </span>
          )}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label="Copiar comando"
          className="rounded p-1 text-muted-foreground transition-colors hover:text-primary"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <pre className="px-3 py-2.5 text-xs leading-relaxed whitespace-pre-wrap">
        <span className="text-accent">$ </span>
        {code}
        <span className="caret">▊</span>
      </pre>
    </div>
  );
}
