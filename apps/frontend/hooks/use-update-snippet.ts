import { useQueryClient } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import { UpdateSnippetSchema } from "@/schemas/update-snippet.schema";
import { snippetService } from "@/services/snippet.service";

import { useAppMutation } from "./use-app-mutation";

export const useUpdateSnippet = (
  id: string,
  options?: { onSuccess?: () => void },
) => {
  const queryClient = useQueryClient();

  return useAppMutation(["update-snippet", id], {
    mutationFn: (data: UpdateSnippetSchema) => snippetService.update(id, data),
    onSuccess: () => {
      toast({
        title: "Snippet updated successfully",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["snippets"] });
      queryClient.invalidateQueries({ queryKey: ["snippet", id] });
      options?.onSuccess?.();
    },
  });
};
