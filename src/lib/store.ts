import { useEffect, useState, useCallback } from "react";
import type { SystemId } from "@/data/types";

type Store = {
  favorites: string[];
  studies: string[];
  history: string[];
};

const KEY = "cyberdeck-nkz-v1";

function read(): Store {
  if (typeof window === "undefined") return { favorites: [], studies: [], history: [] };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { favorites: [], studies: [], history: [] };
    const parsed = JSON.parse(raw) as Partial<Store>;
    return {
      favorites: parsed.favorites ?? [],
      studies: parsed.studies ?? [],
      history: parsed.history ?? [],
    };
  } catch {
    return { favorites: [], studies: [], history: [] };
  }
}

function write(s: Store) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new CustomEvent("cyberdeck:update"));
}

export function useStore() {
  const [store, setStore] = useState<Store>({ favorites: [], studies: [], history: [] });

  useEffect(() => {
    setStore(read());
    const on = () => setStore(read());
    window.addEventListener("cyberdeck:update", on);
    window.addEventListener("storage", on);
    return () => {
      window.removeEventListener("cyberdeck:update", on);
      window.removeEventListener("storage", on);
    };
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    const s = read();
    s.favorites = s.favorites.includes(id) ? s.favorites.filter((x) => x !== id) : [...s.favorites, id];
    write(s);
  }, []);

  const toggleStudy = useCallback((id: string) => {
    const s = read();
    s.studies = s.studies.includes(id) ? s.studies.filter((x) => x !== id) : [...s.studies, id];
    write(s);
  }, []);

  const pushHistory = useCallback((id: string) => {
    const s = read();
    s.history = [id, ...s.history.filter((x) => x !== id)].slice(0, 30);
    write(s);
  }, []);

  const clearHistory = useCallback(() => {
    const s = read();
    s.history = [];
    write(s);
  }, []);

  return { store, toggleFavorite, toggleStudy, pushHistory, clearHistory };
}

export function progressForSystem(system: SystemId, total: number, studies: string[]): number {
  if (!total) return 0;
  const prefix = `${system}-`;
  const done = studies.filter((id) => id.startsWith(prefix)).length;
  return Math.min(100, Math.round((done / total) * 100));
}
