"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  onFocus: () => void;
}

export default function SearchBar({
  value,
  onChange,
  onFocus,
}: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        type="text"
        placeholder="What awesome gift are you looking for?"
        className="h-[3.25rem] w-full rounded-xl border pl-12 pr-4 text-sm focus:outline-none"
      />
    </div>
  );
}
