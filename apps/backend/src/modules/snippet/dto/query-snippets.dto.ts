import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class QuerySnippetsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsArray()
  @Transform(({ value }: { value: unknown }) => {
    if (Array.isArray(value)) {
      return value as string[];
    }

    if (typeof value === 'string') {
      return value.split(',');
    }

    return [];
  })
  tags?: string[];
}
