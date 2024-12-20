import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './schemas/game.schema';
import { GameController } from './game.controller';
import { GameDao } from './dao/game.dao';
import { GameService } from './game.service';
import { IgdbModule } from 'src/igdb/igdb.module';
import { Advice, AdviceSchema } from 'src/advice/schemas/advice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    MongooseModule.forFeature([{name: Advice.name, schema: AdviceSchema}]),
    IgdbModule
  ],
  controllers: [GameController],
  providers: [GameDao, GameService],
})
export class GameModule {}
