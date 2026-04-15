import { useInfiniteQuery } from "@tanstack/react-query";

import { snippetService } from "@/services/snippet.service";
import { GetSnippetsQuery } from "@/types/get-snippets-query";

const SNIPPETS_QUERY_KEY = "snippets";
const SNIPPETS_LIMIT = 12;

export const useSnippets = (
  params?: Omit<GetSnippetsQuery, "page" | "limit">,
) =>
  useInfiniteQuery({
    queryKey: [SNIPPETS_QUERY_KEY, params],
    queryFn: ({ pageParam }) =>
      snippetService.getAll({
        ...params,
        page: pageParam,
        limit: SNIPPETS_LIMIT,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
  });
