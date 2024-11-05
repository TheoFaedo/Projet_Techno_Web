import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { GameService } from './game.service';
import { SearchGameDto } from './dto/searchGame.dto';
import { GameEntity } from './game.entities';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getGames(@Query() qParams: SearchGameDto): Promise<GameEntity[]> {
    return this.gameService.getAllGames(qParams);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getGame(@Param() params: any): Promise<GameEntity> {
    return this.gameService.getOneGameByIgbdId(params.id);
  }
}
