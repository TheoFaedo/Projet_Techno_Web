import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from '../schemas/game.schema';
import { Model, SortOrder } from 'mongoose';
import { RequestFilter } from 'src/igdb/igdb.service';

@Injectable()
export class GameDao {
  constructor(
    @InjectModel(Game.name) private readonly _personModel: Model<Game>,
  ) {}

  getGames(
    sort?: { name: string; order: SortOrder } | null,
    filters?: RequestFilter[] | null,
  ) {
    const query = this._personModel.find();

    if (sort) {
      query.sort([[sort.name, sort.order]]);
    }

    if (filters) {
      filters.forEach((filter) => {
        if (filter.operator == '=') {
          if (
            filter.variable == 'genres' ||
            filter.variable == 'platforms' ||
            filter.variable == 'game_modes'
          ) {
            query
              .where(filter.variable)
              .all(filter.value.split(',').map((id) => Number(id)));
          } else {
            query.where(filter.variable).equals(filter.value);
          }
        } else if (filter.operator == '~') {
          query
            .where(filter.variable)
            .regex(new RegExp(filter.value.slice(2, -2), 'i'));
        }
      });
    }

    return query.exec();
  }

  getGame(id: number) {
    return this._personModel.findOne({ igdbId: id }).exec();
  }

  async create(
    igbdId: number,
    steamAppId: number,
    price: number,
    name: string,
    first_release_date: number,
    game_modes: number[],
    platforms: number[],
    genres: number[],
  ) {
    await this._personModel.create({
      igdbId: igbdId,
      name: name,
      steamAppId: steamAppId,
      price: price,
      last_time_price_refresh: new Date(),
      first_release_date: first_release_date,
      genres: genres,
      platforms: platforms,
      game_modes: game_modes,
    });
  }

  async modify(igbdId: number, steamAppId: number, price: number) {
    await this._personModel.updateOne(
      { igdbId: igbdId },
      {
        steamAppId: steamAppId,
        price: price,
        last_time_price_refresh: new Date(),
      },
    );
  }
}
