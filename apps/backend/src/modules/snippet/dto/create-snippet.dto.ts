import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { SnippetType } from 'src/schemas/snippet.schema';

export class CreateSnippetDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(SnippetType)
  @IsNotEmpty()
  type: SnippetType;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
