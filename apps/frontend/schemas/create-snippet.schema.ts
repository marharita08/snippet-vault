import { z } from "zod";

import { SnippetType } from "@/const/snippet-type";

const snippetTypeValues = Object.values(SnippetType) as [
  SnippetType,
  ...SnippetType[],
];

export const createSnippetSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  content: z.string().min(1, {
    message: "Content is required",
  }),
  type: z.enum(snippetTypeValues, {
    message: "Type is required",
  }),
  tags: z.array(z.string()).optional(),
});

export type CreateSnippetSchema = z.infer<typeof createSnippetSchema>;
