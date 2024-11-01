import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { IgdbService } from './igdb/igdb.service';
import { ConfigModule } from '@nestjs/config';
import { GameModule } from './game/game.module';
import { MongooseModule } from '@nestjs/mongoose';
import { IgdbModule } from './igdb/igdb.module';

@Module({
  imports: [ConfigModule.forRoot(), GameModule, MongooseModule.forRoot(process.env.MONGODB_URI, {dbName: 'db',}), IgdbModule],
  controllers: [AppController],
  providers: [IgdbService],
})
export class AppModule {}
