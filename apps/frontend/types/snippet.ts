import { SnippetType } from "@/const/snippet-type";

export type Snippet = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
  createdAt: string;
  updatedAt: string;
};
