export type SystemId = "linux" | "termux" | "powershell" | "cmd";

export type Level = "Básico" | "Intermediário" | "Avançado";

export interface Param {
  flag: string;
  desc: string;
}

export interface Example {
  code: string;
  desc: string;
}

export interface Alternative {
  system: SystemId;
  code: string;
}

export interface Command {
  id: string;
  name: string;
  system: SystemId;
  category: string;
  level: Level;
  description: string;
  syntax: string;
  params: Param[];
  examples: Example[];
  alternatives: Alternative[];
  tags: string[];
  cyber?: string;
  termuxOnly?: boolean;
  docs?: string;
}

/**
 * Compact row format used by the raw data files.
 * [name, category, level, description, syntax, params, examples, alternatives, tags, cyberArea?]
 *
 * params:       "-l|formato longo;-a|inclui ocultos"
 * examples:     "ls -la|lista tudo;ls /etc|lista /etc"
 * alternatives: "linux:ls;cmd:dir"
 * tags:         "arquivos,listar"
 */
export type Row = [
  string,
  string,
  Level,
  string,
  string,
  string,
  string,
  string,
  string,
  string?,
];
