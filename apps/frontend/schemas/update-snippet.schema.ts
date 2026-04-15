import {
  CreateSnippetSchema,
  createSnippetSchema,
} from "./create-snippet.schema";

export const updateSnippetSchema = createSnippetSchema;
export type UpdateSnippetSchema = CreateSnippetSchema;
