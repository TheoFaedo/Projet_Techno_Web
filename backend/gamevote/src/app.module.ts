import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IgdbService } from './igdb/igdb.service';
import { ConfigModule } from '@nestjs/config';
import { GameController } from './game/game.controller';
import { GameModule } from './game/game.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GameService } from './game/game.service';
import { GameDao } from './game/dao/game.dao';
import { IgdbModule } from './igdb/igdb.module';

@Module({
  imports: [ConfigModule.forRoot(), GameModule, MongooseModule.forRoot('mongodb://localhost:27277', {dbName: 'db',}), IgdbModule],
  controllers: [AppController],
  providers: [IgdbService],
})
export class AppModule {}
