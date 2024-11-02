import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AdviceEntity {
  @Expose()
  id: number;

  @Expose()
  gameId: number;

  @Expose()
  author: string;
  @Expose()
  content: string;

  constructor(partial: Partial<AdviceEntity>) {
    Object.assign(this, partial);
  }
}
