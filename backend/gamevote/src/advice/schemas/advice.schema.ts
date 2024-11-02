import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AdviceDocument = Advice & Document;

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
export class Advice {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: any;

  @Prop()
  gameId: number;

  @Prop({
    type: String,
    required: true,
  })
  author: string;

  @Prop({
    type: String,
    required: true,
  })
  content: string;
}

export const AdviceSchema = SchemaFactory.createForClass(Advice);
