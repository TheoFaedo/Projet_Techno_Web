import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from '../schemas/game.schema';
import { Model, SortOrder } from 'mongoose';
import { RequestFilter } from 'src/igdb/igdb.service';
import { Advice } from '../../advice/schemas/advice.schema';

@Injectable()
export class GameDao {
  constructor(
    @InjectModel(Game.name) private readonly _gameModel: Model<Game>,
    @InjectModel(Advice.name) private readonly _adviceModel: Model<Advice>,
  ) {}

  async getGames(
    sort?: { name: string; order: SortOrder } | null,
    filters?: RequestFilter[] | null,
  ) {
    // Début de la pipeline d'agrégation
    const pipeline: any[] = [
      {
        $lookup: {
          from: 'advice', // Nom de la collection des avis dans MongoDB
          localField: 'igdbId', // Champ dans la collection `games`
          foreignField: 'gameId', // Champ correspondant dans la collection `advice`
          as: 'advice', // Alias pour la collection d'avis jointe
        },
      },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: '$advice' }, 0] },
              then: { $avg: '$advice.note' },
              else: 0,
            },
          },
        },
      },
      {
        $project: {
          advice: 0, // On ne retourne pas la liste des avis pour réduire les données
        },
      },
    ];

    // Ajouter les filtres à la pipeline d'agrégation
    if (filters) {
      filters.forEach((filter) => {
        if (filter.operator === '=') {
          if (
            filter.variable === 'genres' ||
            filter.variable === 'platforms' ||
            filter.variable === 'game_mode'
          ) {
            pipeline.push({
              $match: {
                [filter.variable]: {
                  $all: filter.value.split(',').map((id) => Number(id)),
                },
              },
            });
          } else {
            pipeline.push({
              $match: {
                [filter.variable]: filter.value,
              },
            });
          }
        } else if (filter.operator === '~') {
          pipeline.push({
            $match: {
              [filter.variable]: {
                $regex: new RegExp(filter.value.slice(2, -2), 'i'),
              },
            },
          });
        }
      });
    }

    // Ajouter le tri à la pipeline d'agrégation
    if (sort) {
      pipeline.push({
        $sort: {
          [sort.name]: sort.order === 'asc' ? 1 : -1,
        },
      });
    }

    pipeline.push({ $limit: 10 });

    // Exécuter la pipeline d'agrégation
    return this._gameModel.aggregate(pipeline).exec();
  }

  getGame(id: number) {
    return this._gameModel.findOne({ igdbId: id }).exec();
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
    await this._gameModel.create({
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
    await this._gameModel.updateOne(
      { igdbId: igbdId },
      {
        steamAppId: steamAppId,
        price: price,
        last_time_price_refresh: new Date(),
      },
    );
  }
}
