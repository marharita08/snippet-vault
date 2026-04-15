import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

import { SnippetType } from 'src/schemas/snippet.schema';

export class UpdateSnippetDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsEnum(SnippetType)
  @IsOptional()
  type: SnippetType;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
