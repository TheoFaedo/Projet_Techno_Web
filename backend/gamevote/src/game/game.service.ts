import { Injectable } from '@nestjs/common';
import { GameDao } from './dao/game.dao';

@Injectable()
export class GameService {
    constructor(private readonly gameDao: GameDao) {
        
    }

    create(){
        this.gameDao.create();
    }
}
 