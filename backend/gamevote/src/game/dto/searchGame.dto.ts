import {
  IsAlpha,
  IsAlphanumeric,
  IsArray,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

enum SortEnum {
  'rating_asc',
  'rating_desc',
  'release_asc',
  'release_desc',
  'name_asc',
  'name_desc',
  'price_asc',
  'price_desc',
}

export class SearchGameDto {
  @IsOptional()
  @IsAlphanumeric()
  q?: string;

  @IsOptional()
  @IsArray()
  @IsNumberString({}, { each: true })
  genres?: number[];

  @IsOptional()
  @IsArray()
  @IsNumberString({}, { each: true })
  game_modes?: number[];

  @IsOptional()
  @IsArray()
  @IsNumberString({}, { each: true })
  platforms?: string;

  @IsOptional()
  @IsString()
  @IsEnum(SortEnum)
  sort?: string;
}
