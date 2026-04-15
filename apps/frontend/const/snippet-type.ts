export const SnippetType = {
  LINK: "link",
  NOTE: "note",
  COMMAND: "command",
} as const;

export type SnippetType = (typeof SnippetType)[keyof typeof SnippetType];
