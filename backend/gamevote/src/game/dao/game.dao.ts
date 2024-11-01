import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Game } from "../schemas/game.schema";
import { Model, SortOrder } from "mongoose";

@Injectable()
export class GameDao{
    constructor(
        @InjectModel(Game.name) private readonly _personModel: Model<Game>,
    ){}

    getGames(ids: number[], sort?: {name: string, order: SortOrder} | null) {
        const query = this._personModel.find({ igdbId: { $in: ids } });

        if(sort){
            query.sort([[sort.name, sort.order]]);
        }

        return query.exec();
    }

    getGame(id: number) {
        return this._personModel.findOne({ igdbId: id }).exec();
    }

    async create(igbdId: number, steamAppId: number, price: number) {
        await this._personModel.create({
            igdbId: igbdId,
            steamAppId: steamAppId,
            price: price,
            last_time_price_refresh: new Date()
        });
    }

    async modify(igbdId: number, steamAppId: number, price: number) {
        await this._personModel.updateOne({ igdbId: igbdId }, {
            steamAppId: steamAppId,
            price: price,
            last_time_price_refresh: new Date()
        });
    }
}