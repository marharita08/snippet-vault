"use client";

import { useRouter } from "next/navigation";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components";
import { useDeleteSnippet } from "@/hooks/use-delete-snippet";

interface DeleteSnippetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  snippetId: string;
  snippetTitle: string;
}

export const DeleteSnippetDialog = ({
  open,
  onOpenChange,
  snippetId,
  snippetTitle,
}: DeleteSnippetDialogProps) => {
  const router = useRouter();

  const mutation = useDeleteSnippet(snippetId, {
    onSuccess: () => {
      onOpenChange(false);
      router.push("/");
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Snippet</DialogTitle>
        </DialogHeader>
        <DialogDescription className="p-4">
          Are you sure you want to delete{" "}
          <strong>&quot;{snippetTitle}&quot;</strong>? This action cannot be
          undone.
        </DialogDescription>
        <DialogFooter className="p-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Deleting..." : "Delete Snippet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
