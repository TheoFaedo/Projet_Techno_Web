import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IgdbService } from './igdb/igdb.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    
  })],
  controllers: [AppController],
  providers: [AppService, IgdbService],
})
export class AppModule {}
