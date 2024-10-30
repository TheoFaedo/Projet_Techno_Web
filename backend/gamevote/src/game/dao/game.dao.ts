import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Game } from "../schemas/game.schema";
import { Model } from "mongoose";

@Injectable()
export class GameDao{
    constructor(
        @InjectModel(Game.name) private readonly _personModel: Model<Game>,
    ){}

    create(){
        this._personModel.create({
            igdbId: 1,
            steamAppId: 1,
            price: 0,
            last_time_price_refresh: new Date()
        });
    }
}