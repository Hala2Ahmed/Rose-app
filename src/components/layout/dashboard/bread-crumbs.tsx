"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"

export function Breadcrumbs() {
    const pathname = usePathname()
    const segments = pathname.split("/").filter(Boolean)
    const locale = segments[0]
    const pathSegments = segments.slice(1)

    const formatLabel = (text: string) =>
        text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

    return (
        <Breadcrumb className="py-6 -ms-10 ps-14 border-b border-black/8 dark:border-zinc-50/8 bg-white dark:bg-zinc-900">
            <BreadcrumbList>
                {pathSegments.map((segment, index) => {
                    {/* Breadcrumbs variables */ }
                    const href = "/" + [locale, ...pathSegments.slice(0, index + 1)].join("/")
                    const isLast = index === pathSegments.length - 1

                    return (
                        <BreadcrumbItem key={href}>
                            {/* Breadcrumb separator */}
                            {index !== 0 && <BreadcrumbSeparator />}

                            {/* Breadcrumb page and links */}
                            {isLast ? (
                                <BreadcrumbPage className="capitalize">
                                    {formatLabel(segment)}
                                </BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink asChild>
                                    <Link href={href} className="capitalize">
                                        {formatLabel(segment)}
                                    </Link>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}