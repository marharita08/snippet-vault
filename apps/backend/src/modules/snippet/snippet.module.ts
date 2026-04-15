import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Snippet, SnippetSchema } from 'src/schemas/snippet.schema';

import { SnippetController } from './snippet.controller';
import { SnippetService } from './snippet.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Snippet.name,
        schema: SnippetSchema,
      },
    ]),
  ],
  controllers: [SnippetController],
  providers: [SnippetService],
  exports: [SnippetService],
})
export class SnippetModule {}
