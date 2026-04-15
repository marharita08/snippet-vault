import { useQueryClient } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import { CreateSnippetSchema } from "@/schemas/create-snippet.schema";
import { snippetService } from "@/services/snippet.service";

import { useAppMutation } from "./use-app-mutation";

export const useCreateSnippet = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useAppMutation(["create-snippet"], {
    mutationFn: (data: CreateSnippetSchema) => snippetService.create(data),
    onSuccess: () => {
      toast({
        title: "Snippet created successfully",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["snippets"] });
      options?.onSuccess?.();
    },
  });
};
