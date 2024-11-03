import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AdviceService } from './advice.service'; // Adjust the import according to your structure
import { CreateAdviceDto } from './dto/create-advice.dto'; // Adjust the import according to your structure
import { UpdateAdviceDto } from './dto/update-advice.dto'; // Adjust the import according to your structure
import { Advice } from './schemas/advice.schema'; // Adjust the import according to your structure
import { AdviceEntity } from './advice.entities';

@Controller('advices')
export class AdviceController {
  constructor(private readonly adviceService: AdviceService) {}

  /**
   * Get all advices
   */
  @Get()
  async getAllAdvices(): Promise<Advice[]> {
    return this.adviceService.getAllAdvices();
  }

  /**
   * Get a single advice by ID
   * @param {string} id - ID of the advice
   */
  @Get(':id') // Route to get a specific advice by ID
  async getAdviceById(@Param('id') id: string): Promise<Advice> {
    return this.adviceService.getAdviceById(id);
  }

  /**
   * Get advices by game ID
   * @param {string} gameId - ID of the game
   */
  @Get('game/:gameId') // Route to get advices associated with a specific game ID
  async getAdvicesByGameId(@Param('gameId') gameId: string): Promise<Advice[]> {
    return this.adviceService.getAdvicesByGameId(gameId);
  }

  /**
   * Create a new advice
   * @param {CreateAdviceDto} createAdviceDto - Data for creating an advice
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Post() // Route to create a new advice
  async createAdvice(
    @Body() createAdviceDto: CreateAdviceDto,
  ): Promise<AdviceEntity> {
    return this.adviceService.createAdvice(createAdviceDto);
  }

  /**
   * Update an advice by ID
   * @param {string} id - ID of the advice
   * @param {UpdateAdviceDto} updateAdviceDto - Data for updating the advice
   */
  @Put(':id') // Route to update an existing advice by ID
  async updateAdvice(
    @Param('id') id: string,
    @Body() updateAdviceDto: UpdateAdviceDto,
  ): Promise<Advice> {
    return this.adviceService.updateAdvice(id, updateAdviceDto);
  }

  /**
   * Delete an advice by ID
   * @param {string} id - ID of the advice
   */
  @Delete(':id') // Route to delete an advice by ID
  async deleteAdvice(@Param('id') id: string): Promise<Advice> {
    return this.adviceService.deleteAdvice(id);
  }
}
