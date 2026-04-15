import { useQueryClient } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import { snippetService } from "@/services/snippet.service";

import { useAppMutation } from "./use-app-mutation";

export const useDeleteSnippet = (
  id: string,
  options?: { onSuccess?: () => void },
) => {
  const queryClient = useQueryClient();

  return useAppMutation(["delete-snippet", id], {
    mutationFn: () => snippetService.remove(id),
    onSuccess: () => {
      toast({
        title: "Snippet deleted successfully",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["snippets"] });
      options?.onSuccess?.();
    },
  });
};
