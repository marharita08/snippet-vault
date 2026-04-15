"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { Plus, Search } from "lucide-react";

import {
  Button,
  EmptyState,
  ErrorState,
  Header,
  Input,
  Loading,
  SnippetCard,
  SnippetDialog,
  TagsInput,
} from "@/components";
import { useSnippets } from "@/hooks/use-snippets";

export default function Home() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSnippets({
    search: debouncedSearch || undefined,
    tags: selectedTags.length > 0 ? selectedTags : undefined,
  });

  const { ref: sentinelRef, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const snippets = data?.pages.flatMap((page) => page.data) ?? [];
  const isSearchOrFilterActive =
    debouncedSearch.length > 0 || selectedTags.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex-1 flex gap-2 flex-col md:flex-row">
            <Input
              id="snippet-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch("")}
              startIcon={<Search className="h-4 w-4" />}
              placeholder="Search"
            />
            <TagsInput
              values={selectedTags}
              setValues={setSelectedTags}
              placeholder="Filter by tags..."
            />
          </div>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="shrink-0 rounded-full sm:rounded-md"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create Snippet</span>
          </Button>
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loading size="xl" />
          </div>
        )}

        {isError && !isLoading && <ErrorState />}

        {!isLoading && !isError && snippets.length === 0 && (
          <EmptyState isSearchOrFilter={isSearchOrFilterActive} />
        )}

        {!isLoading && !isError && snippets.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {snippets.map((snippet) => (
              <SnippetCard key={snippet._id} snippet={snippet} />
            ))}
          </div>
        )}

        {isFetchingNextPage && (
          <div className="flex justify-center py-6">
            <Loading size="md" />
          </div>
        )}

        <div ref={sentinelRef} className="h-10" />

        <SnippetDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </main>
    </div>
  );
}
