import { SnippetType } from "./snippet-type";

export const snippetTypeLabels: Record<SnippetType, string> = {
  [SnippetType.LINK]: "Link",
  [SnippetType.NOTE]: "Note",
  [SnippetType.COMMAND]: "Command",
};
