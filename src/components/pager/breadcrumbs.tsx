"use client";
import { cn, truncate } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface BreadcrumbsProps extends React.ComponentPropsWithoutRef<"nav"> {
  segments: {
    title: string;
    href: string;
  }[];
  separator?: React.ComponentType<{ className?: string }>;
  truncationLength?: number;
}

export function Breadcrumbs({
  segments,
  separator,
  truncationLength = 0,
  className,
  ...props
}: BreadcrumbsProps) {
  const SeparatorIcon =
    separator ??
    (() => <ChevronRight className="mx-2 h-4 w-4" aria-hidden="true" />);

  return (
    <nav
      aria-label="breadcrumbs"
      className={cn(
        "flex w-full items-center overflow-auto text-sm font-medium text-muted-foreground p-2",
        className
      )}
      {...props}
    >
      {segments.map((segment, index) => {
        const isLastSegment = index === segments.length - 1;

        return (
          <React.Fragment key={segment.href || index}>
            {segment.href ? (
              <Link
                aria-current={isLastSegment ? "page" : undefined}
                href={segment.href}
                className={cn(
                  "truncate transition-colors hover:text-foreground",
                  isLastSegment ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {truncationLength > 0 && segment.title
                  ? truncate(segment.title, truncationLength)
                  : segment.title}
              </Link>
            ) : (
              <span
                aria-current={isLastSegment ? "page" : undefined}
                className={cn(
                  "truncate transition-colors hover:text-foreground",
                  isLastSegment ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {truncationLength > 0 && segment.title
                  ? truncate(segment.title, truncationLength)
                  : segment.title}
              </span>
            )}
            {!isLastSegment && <SeparatorIcon />}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
