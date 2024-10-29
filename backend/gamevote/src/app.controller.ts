import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IgdbService, RequestFilter } from './igdb/igdb.service';

@Controller()
export class AppController {
  constructor(private readonly igdbService: IgdbService) {}

  @Get()
  async getHello(): Promise<string> {
    const games = await this.igdbService.createRequest().games()
    .allfields()
    .search('Lethal Company')
    .limit(20)
    .filter(RequestFilter.create('parent_game', '=', 'null')).filter(RequestFilter.create('version_parent', '=', 'null'))
    .execute();

    return this.igdbService.searchPrice(games[0].name).then(price => `Hello World! ${price}`);
  }
}
