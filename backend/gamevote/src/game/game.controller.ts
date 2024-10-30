import { Controller, Get } from '@nestjs/common';
import { GameDao } from './dao/game.dao';
import { GameService } from './game.service';
import { IgdbService, RequestFilter } from 'src/igdb/igdb.service';

@Controller('games')
export class GameController {

    constructor(private readonly gameService: GameService, private readonly igdbService: IgdbService) {}

    @Get()
    async getGames() {
        
        let games = await this.igdbService.createRequest().games()
        .addfields('name', 'cover.url', 'first_release_date', 'rating', 'summary', 'slug', 'websites.url', 'websites.category', 'game_modes', 'rating')
        .filter(RequestFilter.create('parent_game', '=', 'null')).filter(RequestFilter.create('version_parent', '=', 'null'))
        .filter(RequestFilter.create('rating', '!=', 'null'))
        .filter(RequestFilter.create('game_modes', '=', '3'))
        .limit(1).sort('rating', 'desc').execute();

        return games;
    }
}
