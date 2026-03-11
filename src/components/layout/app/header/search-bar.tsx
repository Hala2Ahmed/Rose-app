"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  onFocus: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

export default function SearchBar({
  value,
  onChange,
  onFocus,
  onKeyDown,
}: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 pointer-events-none" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        type="text"
        placeholder="What awesome gift are you looking for?"
        className="h-[3.25rem] w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-[#F8F8F8] dark:bg-zinc-800 pl-12 pr-10 text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
      />
      {value.length > 0 && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
