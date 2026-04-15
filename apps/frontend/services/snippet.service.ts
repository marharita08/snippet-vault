import { CreateSnippetSchema } from "@/schemas/create-snippet.schema";
import { UpdateSnippetSchema } from "@/schemas/update-snippet.schema";
import { GetSnippetsQuery } from "@/types/get-snippets-query";
import { PaginatedItem } from "@/types/paginated-item";
import { Snippet } from "@/types/snippet";

import { httpService } from "./http.service";

class SnippetService {
  private readonly baseUrl = "/snippets";

  getAll(params?: GetSnippetsQuery): Promise<PaginatedItem<Snippet>> {
    return httpService.get(this.baseUrl, params);
  }

  getById(id: string): Promise<Snippet> {
    return httpService.get(`${this.baseUrl}/${id}`);
  }

  async create(data: CreateSnippetSchema): Promise<Snippet> {
    return httpService.post(this.baseUrl, data);
  }

  async update(id: string, data: UpdateSnippetSchema): Promise<Snippet> {
    return httpService.patch(`${this.baseUrl}/${id}`, data);
  }

  remove(id: string): Promise<void> {
    return httpService.delete(`${this.baseUrl}/${id}`);
  }
}

export const snippetService = new SnippetService();
