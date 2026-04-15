"use client";

import Link from "next/link";

import { cva } from "class-variance-authority";
import { Clock, Code, ExternalLink, StickyNote } from "lucide-react";

import { SnippetType } from "@/const/snippet-type";
import { Snippet } from "@/types/snippet";
import { cn } from "@/utils/cn";
import { formatDateShort } from "@/utils/format-date";

const typeBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      type: {
        [SnippetType.LINK]: "bg-primary/10 text-primary",
        [SnippetType.NOTE]: "bg-secondary/10 text-secondary",
        [SnippetType.COMMAND]: "bg-accent/10 text-accent",
      },
    },
  },
);

const typeIcons: Record<SnippetType, React.ReactNode> = {
  [SnippetType.LINK]: <ExternalLink className="h-3 w-3" />,
  [SnippetType.NOTE]: <StickyNote className="h-3 w-3" />,
  [SnippetType.COMMAND]: <Code className="h-3 w-3" />,
};

const typeLabels: Record<SnippetType, string> = {
  [SnippetType.LINK]: "Link",
  [SnippetType.NOTE]: "Note",
  [SnippetType.COMMAND]: "Command",
};

interface SnippetCardProps {
  snippet: Snippet;
  className?: string;
}

export const SnippetCard: React.FC<SnippetCardProps> = ({
  snippet,
  className,
}) => {
  return (
    <Link href={`/snippets/${snippet._id}`} className="block no-underline">
      <article
        id={`snippet-${snippet._id}`}
        className={cn(
          "group relative rounded-xl border border-muted/60 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 cursor-pointer",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-semibold text-foreground leading-snug line-clamp-1 group-hover:text-primary transition-colors duration-200">
            {snippet.title}
          </h3>
          <span className={typeBadgeVariants({ type: snippet.type })}>
            {typeIcons[snippet.type]}
            {typeLabels[snippet.type]}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          {snippet.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 min-w-0 flex-1">
              {snippet.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-primary-light px-2 py-0.5 text-xs font-medium text-primary/80"
                >
                  #{tag}
                </span>
              ))}
              {snippet.tags.length > 3 && (
                <span className="inline-flex items-center text-xs text-muted-foreground">
                  +{snippet.tags.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0 ml-auto">
            <Clock className="h-3 w-3" />
            <time dateTime={snippet.createdAt}>
              {formatDateShort(snippet.createdAt)}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
};
