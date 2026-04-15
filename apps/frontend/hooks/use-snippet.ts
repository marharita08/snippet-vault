import { snippetService } from "@/services/snippet.service";
import { Snippet } from "@/types/snippet";

import { useAppQuery } from "./use-app-query";

export const useSnippet = (id: string) => {
  return useAppQuery<Snippet>({
    queryKey: ["snippet", id],
    queryFn: () => snippetService.getById(id),
    enabled: !!id,
  });
};
