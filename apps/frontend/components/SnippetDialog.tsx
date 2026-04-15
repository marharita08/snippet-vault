"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  InputError,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TagsInput,
  Textarea,
} from "@/components";
import { SnippetType } from "@/const/snippet-type";
import { snippetTypeLabels } from "@/const/snippet-type-labels";
import { useAppMutation } from "@/hooks/use-app-mutation";
import { toast } from "@/hooks/use-toast";
import {
  CreateSnippetSchema,
  createSnippetSchema,
} from "@/schemas/create-snippet.schema";
import { snippetService } from "@/services/snippet.service";
import { Snippet } from "@/types/snippet";

interface SnippetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  snippet?: Snippet;
}

export const SnippetDialog = ({
  open,
  onOpenChange,
  snippet,
}: SnippetDialogProps) => {
  const queryClient = useQueryClient();
  const isEdit = !!snippet;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateSnippetSchema>({
    resolver: zodResolver(createSnippetSchema),
    defaultValues: {
      title: "",
      content: "",
      type: SnippetType.NOTE,
      tags: [],
    },
  });

  useEffect(() => {
    if (open) {
      if (snippet) {
        reset({
          title: snippet.title,
          content: snippet.content,
          type: snippet.type,
          tags: snippet.tags,
        });
      } else {
        reset({
          title: "",
          content: "",
          type: SnippetType.NOTE,
          tags: [],
        });
      }
    }
  }, [open, snippet, reset]);

  const mutation = useAppMutation(
    isEdit ? ["update-snippet", snippet?._id] : ["create-snippet"],
    {
      mutationFn: (data: CreateSnippetSchema) => {
        if (isEdit && snippet) {
          return snippetService.update(snippet._id, data);
        }
        return snippetService.create(data);
      },
      onSuccess: () => {
        toast({
          title: `Snippet ${isEdit ? "updated" : "created"} successfully`,
          variant: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["snippets"] });
        if (isEdit) {
          queryClient.invalidateQueries({
            queryKey: ["snippet", snippet?._id],
          });
        }
        onOpenChange(false);
      },
    },
  );

  const onSubmit = (data: CreateSnippetSchema) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Snippet" : "Create Snippet"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
          <div className="space-y-1.5">
            <Input
              label="Title"
              placeholder="Enter title"
              error={!!errors.title}
              {...register("title")}
            />
            <InputError error={errors.title?.message} />
          </div>

          <div className="space-y-1.5">
            <Textarea
              label="Content"
              placeholder="Enter content"
              error={!!errors.content}
              {...register("content")}
              rows={5}
              className="resize-none"
            />
            <InputError error={errors.content?.message} />
          </div>

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <div className="space-y-1.5">
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    label="Type"
                    value={field.value}
                    error={!!errors.type}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(snippetTypeLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <InputError error={errors.type?.message} />
              </div>
            )}
          />

          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <div className="space-y-1.5">
                <TagsInput
                  label="Tags"
                  values={field.value || []}
                  setValues={field.onChange}
                  error={!!errors.tags}
                />
                <InputError error={errors.tags?.message} />
              </div>
            )}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : isEdit ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
