"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CATEGORY_OPTIONS,
  CreatureCategory,
  getCreatureOfDay,
} from "../lib/creatures";

const STORAGE_KEY = "whatday_creature_category";

type Props = {
  isoDate: string; // "YYYY-MM-DD"
};

export default function CreatureWidget({ isoDate }: Props) {
  const [category, setCategory] = useState<CreatureCategory>("creature");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as CreatureCategory | null;
    if (saved && CATEGORY_OPTIONS.some((o) => o.value === saved)) {
      setCategory(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, category);
  }, [category]);

  const creature = useMemo(() => {
    return getCreatureOfDay(isoDate, category);
  }, [isoDate, category]);

  return (
    <div className="mt-12 border-t border-neutral-200 pt-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <p className="text-xs uppercase tracking-wide text-neutral-500">
          Creature of the day
        </p>

        <label className="text-xs text-neutral-500">
          <span className="sr-only">Creature category</span>
          <select
            className="border border-neutral-200 rounded-md px-2 py-1 bg-white text-neutral-800"
            value={category}
            onChange={(e) => setCategory(e.target.value as CreatureCategory)}
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-4xl">{creature.emoji}</span>
        <div>
          <p className="text-sm font-medium">{creature.name}</p>
          <p className="text-sm text-neutral-600">{creature.vibe}</p>
        </div>
      </div>
    </div>
  );
}