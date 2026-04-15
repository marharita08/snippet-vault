import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Snippet, SnippetDocument } from 'src/schemas/snippet.schema';

import { CreateSnippetDto, QuerySnippetsDto, UpdateSnippetDto } from './dto';

@Injectable()
export class SnippetService {
  constructor(
    @InjectModel(Snippet.name)
    private readonly snippetModel: Model<SnippetDocument>,
  ) {}

  async create(dto: CreateSnippetDto): Promise<Snippet> {
    const snippet = await this.snippetModel.create(dto);
    return snippet.toJSON();
  }

  async findAll(query: QuerySnippetsDto) {
    const { search, tags, page = 1 } = query;
    let { limit = 10 } = query;

    if (limit > 100) {
      limit = 100;
    }

    const filter: Record<string, unknown> = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    if (tags?.length) {
      filter.tags = { $in: tags };
    }

    const skip = (page - 1) * limit;

    const [snippets, total] = await Promise.all([
      this.snippetModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),

      this.snippetModel.countDocuments(filter),
    ]);

    return {
      data: snippets.map((s) => s.toJSON()),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string): Promise<Snippet> {
    const snippet = await this.snippetModel.findById(id).exec();

    return this.checkNotFound(snippet).toJSON();
  }

  async update(id: string, dto: UpdateSnippetDto): Promise<Snippet> {
    const snippet = await this.snippetModel.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    });

    return this.checkNotFound(snippet).toJSON();
  }

  async remove(id: string): Promise<void> {
    const result = await this.snippetModel.findByIdAndDelete(id);

    this.checkNotFound(result);
  }

  private checkNotFound(snippet: SnippetDocument | null): SnippetDocument {
    if (!snippet) {
      throw new NotFoundException('Snippet not found');
    }

    return snippet;
  }
}
