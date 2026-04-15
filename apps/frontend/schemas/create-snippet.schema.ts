import { z } from "zod";

import { SnippetType } from "@/const/snippet-type";

const snippetTypeValues = Object.values(SnippetType) as [
  SnippetType,
  ...SnippetType[],
];

export const createSnippetSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  type: z.enum(snippetTypeValues),
  tags: z.array(z.string()).optional(),
});

export type CreateSnippetSchema = z.infer<typeof createSnippetSchema>;
