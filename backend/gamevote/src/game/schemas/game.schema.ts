import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type GameDocument = Game & Document;

@Schema({
    toJSON: {
        virtuals: true,
        transform: (doc: any, ret: any) => {
            // delete obsolete data
            delete ret._id;
        },
    },
    versionKey: false,
})
export class Game{
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    })
    _id: any;

    @Prop()
    name: string

    @Prop()
    igdbId: number;

    @Prop()
    steamAppId: number;

    @Prop()
    price: number;

    @Prop()
    last_time_price_refresh: Date;

    @Prop()
    first_release_date: number;

    @Prop()
    genres: number[];

    @Prop()
    platforms: number[];

    @Prop()
    game_modes: number[];
}

export const GameSchema = SchemaFactory.createForClass(Game);