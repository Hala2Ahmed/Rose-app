"use client";

import { breadcrumbResolvers } from "@/lib/utils/bread-crumb-resolvers";
import { useEffect, useState } from "react";

const isId = (segment: string) =>
  /^[0-9a-f]{24}$/.test(segment) || // MongoDB ObjectId
  /^[0-9a-f-]{36}$/.test(segment) || // UUID
  /^\d+$/.test(segment); // numeric id

export function useResolveBreadcrumbLabels(pathSegments: string[]) {
  const [labels, setLabels] = useState<Record<string, string>>({});

  useEffect(() => {
    const pending: Array<{
      id: string;
      resolver: (id: string) => Promise<string | null>;
    }> = [];

    pathSegments.forEach((segment, i) => {
      if (isId(segment)) {
        const entityKey = pathSegments[i - 1]; // e.g. "occasions"
        const resolver = entityKey ? breadcrumbResolvers[entityKey] : undefined;
        if (resolver) pending.push({ id: segment, resolver });
      }
    });

    if (!pending.length) return;

    Promise.all(
      pending.map(async ({ id, resolver }) => {
        const name = await resolver(id);
        return { id, name };
      }),
    ).then((results) => {
      const next: Record<string, string> = {};
      results.forEach(({ id, name }) => {
        if (name) next[id] = name;
      });
      setLabels((prev) => ({ ...prev, ...next }));
    });
  }, [pathSegments.join("/")]);

  return labels;
}
