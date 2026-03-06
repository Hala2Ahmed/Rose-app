// components/breadcrumbs.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useResolveBreadcrumbLabels } from "@/hooks/use-resolve-breadcrumb-label";

const formatLabel = (text: string) =>
  text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0];
  const pathSegments = segments.slice(1);

  // 👇 resolves any id segments to their entity names
  const resolvedLabels = useResolveBreadcrumbLabels(pathSegments);

  return (
    <Breadcrumb className="py-6 -ms-10 ps-14 border-b border-black/8 dark:border-zinc-50/8 bg-white dark:bg-zinc-900">
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const href =
            "/" + [locale, ...pathSegments.slice(0, index + 1)].join("/");
          const isLast = index === pathSegments.length - 1;

          const label = resolvedLabels[segment]
            ? `Update ${formatLabel(pathSegments[index - 1] ?? "")} : ${resolvedLabels[segment]}`
            : formatLabel(segment);

          return (
            <>
              {index !== 0 && <BreadcrumbSeparator key={`sep-${href}`} />}
              <BreadcrumbItem key={href}>
                {isLast ? (
                  <BreadcrumbPage className="capitalize">
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href} className="capitalize">
                      {label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
