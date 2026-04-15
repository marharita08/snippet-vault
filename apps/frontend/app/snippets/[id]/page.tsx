"use client";

import { use, useState } from "react";
import Link from "next/link";

import { cva } from "class-variance-authority";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Code,
  ExternalLink,
  Pencil,
  StickyNote,
  Trash2,
} from "lucide-react";

import {
  Button,
  DeleteSnippetDialog,
  ErrorState,
  Header,
  Loading,
  SnippetDialog,
} from "@/components";
import { SnippetType } from "@/const/snippet-type";
import { useSnippet } from "@/hooks/use-snippet";
import { Snippet } from "@/types/snippet";
import { formatDateFull } from "@/utils/format-date";

const typeBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium",
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
  [SnippetType.LINK]: <ExternalLink className="h-4 w-4" />,
  [SnippetType.NOTE]: <StickyNote className="h-4 w-4" />,
  [SnippetType.COMMAND]: <Code className="h-4 w-4" />,
};

const typeLabels: Record<SnippetType, string> = {
  [SnippetType.LINK]: "Link",
  [SnippetType.NOTE]: "Note",
  [SnippetType.COMMAND]: "Command",
};

function SnippetContent({ snippet }: { snippet: Snippet }) {
  if (snippet.type === SnippetType.COMMAND) {
    return (
      <pre className="rounded-lg bg-foreground/5 border border-muted/60 p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre-wrap wrap-break-word">
        <code>{snippet.content}</code>
      </pre>
    );
  }

  if (snippet.type === SnippetType.LINK) {
    return (
      <div className="space-y-3">
        <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
          {snippet.content}
        </p>
        <a
          href={snippet.content}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
        >
          <ExternalLink className="h-4 w-4" />
          Open link
        </a>
      </div>
    );
  }

  return (
    <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
      {snippet.content}
    </p>
  );
}

export default function SnippetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data: snippet, isLoading, isError } = useSnippet(id);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to snippets
            </Link>
          </Button>

          {snippet && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDialogOpen(true)}
              >
                <Pencil className="h-4 w-4" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Delete</span>
              </Button>
            </div>
          )}
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loading size="xl" />
          </div>
        )}

        {isError && !isLoading && <ErrorState />}

        {!isLoading && !isError && snippet && (
          <article className="rounded-xl border border-muted/60 bg-white shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <h1 className="text-2xl font-bold text-foreground leading-snug">
                  {snippet.title}
                </h1>
                <span className={typeBadgeVariants({ type: snippet.type })}>
                  {typeIcons[snippet.type]}
                  {typeLabels[snippet.type]}
                </span>
              </div>

              <div className="mb-6">
                <SnippetContent snippet={snippet} />
              </div>

              {snippet.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {snippet.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md bg-primary-light px-2.5 py-1 text-xs font-medium text-primary/80"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-6 text-sm text-muted-foreground border-t border-muted/40 pt-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>Created {formatDateFull(snippet.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>Updated {formatDateFull(snippet.updatedAt)}</span>
                </div>
              </div>
            </div>
          </article>
        )}

        {snippet && (
          <SnippetDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            snippet={snippet}
          />
        )}

        {snippet && (
          <DeleteSnippetDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            snippetId={snippet._id}
            snippetTitle={snippet.title}
          />
        )}
      </main>
    </div>
  );
}
