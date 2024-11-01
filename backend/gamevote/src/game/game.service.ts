import { Injectable, NotFoundException } from '@nestjs/common';
import { GameDao } from './dao/game.dao';
import { IgdbService, RequestFilter } from 'src/igdb/igdb.service';
import { GameEntity } from './game.entities';
import { SearchGameDto } from './dto/searchGame.dto';
import { SortOrder } from 'mongoose';

type SortTuple = {
    name: string;
    order: SortOrder;
    isIgdbSort: boolean;
}

const sortStringAssociation: { [key: string]: SortTuple } = {
    'rating_asc': { name: 'rating', order: 'asc', isIgdbSort: false },
    'rating_desc': { name: 'rating', order: 'desc', isIgdbSort: false },
    'release_asc': { name: 'first_release_date', order: 'asc', isIgdbSort: true },
    'release_desc': { name: 'first_release_date', order: 'desc', isIgdbSort: true },
    'name_asc': { name: 'name', order: 'asc', isIgdbSort: true },
    'name_desc': { name: 'name', order: 'desc', isIgdbSort: true },
    'price_asc': { name: 'price', order: 'asc', isIgdbSort: false },
    'price_desc': { name: 'price', order: 'desc', isIgdbSort: false }
};

@Injectable()
export class GameService {
    constructor(private readonly gameDao: GameDao, private readonly igdbService: IgdbService) {
        
    }

    
    /**
     * Get all games from the IGDB API that match the given params
     * @param params.q the string to search for in the game name
     * @param params.game_modes the game mode to filter by
     * @param params.genre the genre to filter by
     * @returns a list of GameEntity with the found games
     */
    async getAllGames(params: SearchGameDto = {}): Promise<GameEntity[]> {
        const gameQuery = this.igdbService.createRequest()
            .games()
            .basicGamesFields()
            .filter(RequestFilter.create('parent_game', '=', 'null'))
            .filter(RequestFilter.create('version_parent', '=', 'null'))

        if(params.q) gameQuery.filter(RequestFilter.create('name', '~', `*"${params.q}"*`));
        if(params.game_modes) gameQuery.filter(RequestFilter.create('game_modes', '=', params.game_modes.toString()));
        if(params.genres) gameQuery.filter(RequestFilter.create('genres', '=', params.genres.toString()));

        // Sorts
        const sortTuple: SortTuple =  params.sort ? sortStringAssociation[params.sort] : null;
        if(sortTuple && sortTuple.isIgdbSort){
            if(sortTuple.isIgdbSort) gameQuery.sort(sortTuple.name, sortTuple.order.toString());
        }else{
            gameQuery.sort('rating', 'desc');
        }

        gameQuery.limit(10);

        // Get IGDB games
        const igdb_games = await gameQuery.execute();
        const igdb_games_ids = igdb_games.map((game: { id: any; }) => game.id);

        // Get saved games
        const saved_games = (await this.gameDao.getGames(igdb_games_ids, sortTuple && sortTuple.isIgdbSort ? {name: sortTuple.name, order: sortTuple.order} : null))
        .reduce((acc, game) => {
            acc[game.igdbId] = game;
            return acc;
        }, {});

        // Add saved features to games
        igdb_games.forEach((game: { [x: string]: any; id: string | number; }) => {
            if(saved_games[game.id]){
                if(saved_games[game.id]['price']) game['steam_price'] = saved_games[game.id]['price'];
            }
        });

        return igdb_games.map((game: Partial<GameEntity>) => new GameEntity(game));
    }

    /**
     * Return a game by its igdb id
     * @param igdbId : igdb game id
     * @returns the game with the igdb id
     * @throws NotFoundException if the game is not found
     */
    async getOneGameByIgbdId(igdbId: number) {
        const game_req = await this.igdbService.createRequest()
            .games()
            .basicGamesFields()
            .limit(1)
            .filter(RequestFilter.create('id', '=', igdbId.toString()))
            .execute();

        // Throw error if game not found
        if(!game_req && game_req.length === 0) throw new NotFoundException();
        const game = game_req[0];

        let saved_game = await this.gameDao.getGame(igdbId);
        if(!saved_game){
            const steamAppId = this.findSteamId(game);
            const price = steamAppId ? await this.igdbService.searchPrice(steamAppId) : null;
            await this.gameDao.create(igdbId, steamAppId, price);
        }else{
            // Test if a price is outdated of a week and refresh it if needed
            if(saved_game['price'] &&saved_game['last_time_price_refresh'] < new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)){
                const steamAppId = this.findSteamId(game);
                const price = steamAppId ? await this.igdbService.searchPrice(steamAppId) : null;
                await this.gameDao.modify(igdbId, steamAppId, price);
            }
            
        }
        
        saved_game = await this.gameDao.getGame(igdbId);
        if(saved_game['price']) game['steam_price'] = saved_game['price'];
        
        return new GameEntity(game);
    }

    /**
     * Find the steam if exists of a game fromm igdb game api
     * @param igdbGame the game from igdb api
     * @returns the steam id or null if not found
     */
    findSteamId(igdbGame: Partial<GameEntity>): number | null {
        const steamUrl = igdbGame.websites.find(website => website.category == 13);
        if(steamUrl) {
            return Number(steamUrl.url.split('/').pop());
        }
        return null
    }
}
 