import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AdviceEntity {
  @Expose()
  _id: number;

  @Expose()
  gameId: number;

  @Expose()
  author: string;
  @Expose()
  content: string;
  @Expose()
  note: number;

  constructor(partial: Partial<AdviceEntity>) {
    Object.assign(this, partial);
  }
}
