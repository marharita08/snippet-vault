"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { Search } from "lucide-react";

import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { Loading } from "@/components/Loading";
import { SnippetCard } from "@/components/SnippetCard";
import { useSnippets } from "@/hooks/use-snippets";

export default function Home() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSnippets({
    search: debouncedSearch || undefined,
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
  const isSearchActive = debouncedSearch.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Input
            id="snippet-search"
            placeholder="Search snippets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
            startIcon={<Search className="h-4 w-4" />}
            label="Search"
          />
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loading size="xl" />
          </div>
        )}

        {isError && !isLoading && <ErrorState />}

        {!isLoading && !isError && snippets.length === 0 && (
          <EmptyState isSearchOrFilter={isSearchActive} />
        )}

        {!isLoading && !isError && snippets.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {snippets.map((snippet) => (
              <SnippetCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
        )}

        {isFetchingNextPage && (
          <div className="flex justify-center py-6">
            <Loading size="md" />
          </div>
        )}

        <div ref={sentinelRef} className="h-10" />
      </main>
    </div>
  );
}
