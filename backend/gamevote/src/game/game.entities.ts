import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
class PlatFormEntity {
  @Expose()
  name: string;

  @Expose()
  category: number;

  constructor(partial: Partial<PlatFormEntity>) {
    Object.assign(this, partial);
  }
}

@Exclude()
class GenreEntity {
  @Expose()
  id: number;

  @Expose()
  name: string;

  constructor(partial: Partial<GenreEntity>) {
    Object.assign(this, partial);
  }
}

@Exclude()
class GamemodeEntity {
  @Expose()
  id: number;

  @Expose()
  name: string;

  constructor(partial: Partial<GamemodeEntity>) {
    Object.assign(this, partial);
  }
}

@Exclude()
class WebsiteEntity {
  id: number;

  @Expose()
  url: string;

  @Expose()
  category: number;

  constructor(partial: Partial<WebsiteEntity>) {
    Object.assign(this, partial);
  }
}

@Exclude()
class CoverEntity {
  id: number;

  @Expose()
  url: string;

  constructor(partial: Partial<CoverEntity>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class GameEntity {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  first_release_date: number;

  @Expose()
  @Type(() => PlatFormEntity)
  platforms: PlatFormEntity[];

  @Expose()
  @Type(() => GenreEntity)
  genres: GenreEntity[];

  @Expose()
  @Type(() => GamemodeEntity)
  game_modes: GamemodeEntity[];

  @Expose()
  @Type(() => WebsiteEntity)
  websites: WebsiteEntity[];

  @Expose()
  @Type(() => CoverEntity)
  cover: CoverEntity;

  @Expose()
  averageRating: number; // If not saved, the rating is the igdb rating else the saved rating

  @Expose()
  summary: string;

  @Expose()
  steam_price: number;

  constructor(partial: Partial<GameEntity>) {
    Object.assign(this, partial);
  }
}
