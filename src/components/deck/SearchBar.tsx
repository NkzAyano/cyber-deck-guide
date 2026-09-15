import { Search } from "lucide-react";

export function SearchBar({
  value,
  onChange,
  autoFocus = false,
  placeholder = "Pesquisar comando, ferramenta ou conceito...",
}: {
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="card-deck flex items-center gap-2 px-3 py-2.5 focus-within:border-primary/60">
      <Search className="h-4 w-4 shrink-0 text-primary" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        aria-label="Pesquisar comando"
      />
    </label>
  );
}
