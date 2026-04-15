import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateSnippetDto, QuerySnippetsDto, UpdateSnippetDto } from './dto';
import { SnippetService } from './snippet.service';

@Controller('snippets')
export class SnippetController {
  constructor(private readonly snippetService: SnippetService) {}

  @Post()
  create(@Body() dto: CreateSnippetDto) {
    return this.snippetService.create(dto);
  }

  @Get()
  findAll(@Query() query: QuerySnippetsDto) {
    return this.snippetService.findAll(query);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.snippetService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSnippetDto) {
    return this.snippetService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.snippetService.remove(id);
  }
}
