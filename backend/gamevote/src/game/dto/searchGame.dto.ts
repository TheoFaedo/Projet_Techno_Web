import {
  IsArray,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
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
  @Matches(/^[a-zA-Z0-9éà ]*$/, { message: 'q can only contain letters, numbers, and spaces' })
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
