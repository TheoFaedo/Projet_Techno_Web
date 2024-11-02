import { Injectable, NotFoundException } from '@nestjs/common';
import { AdviceDao } from './dao/advice.dao';
import { CreateAdviceDto } from './dto/create-advice.dto';
import { UpdateAdviceDto } from './dto/update-advice.dto';
import { Advice } from './schemas/advice.schema';

@Injectable()
export class AdviceService {
  constructor(private readonly adviceDao: AdviceDao) {}

  /**
   * Get all advices
   *
   * @return {Promise<Advice[]>}
   */
  async getAllAdvices(): Promise<Advice[]> {
    return this.adviceDao.findAll();
  }

  /**
   * Get advice by ID
   *
   * @param {string} id - ID of the advice
   * @return {Promise<Advice>}
   */
  async getAdviceById(id: string): Promise<Advice> {
    const advice = await this.adviceDao.findById(id);
    if (!advice) {
      throw new NotFoundException(`Advice with ID ${id} not found`);
    }
    return advice;
  }

  /**
   * Create a new advice
   *
   * @param {CreateAdviceDto} createAdviceDto - DTO containing advice data
   * @return {Promise<Advice>}
   */
  async createAdvice(createAdviceDto: CreateAdviceDto): Promise<Advice> {
    return this.adviceDao.create(createAdviceDto);
  }

  /**
   * Update advice by ID
   *
   * @param {string} id - ID of the advice
   * @param {UpdateAdviceDto} updateAdviceDto - DTO containing updated advice data
   * @return {Promise<Advice>}
   */
  async updateAdvice(
    id: string,
    updateAdviceDto: UpdateAdviceDto,
  ): Promise<Advice> {
    const updatedAdvice = await this.adviceDao.findByIdAndUpdate(
      id,
      updateAdviceDto,
    );
    if (!updatedAdvice) {
      throw new NotFoundException(`Advice with ID ${id} not found`);
    }
    return updatedAdvice;
  }

  /**
   * Delete advice by ID
   *
   * @param {string} id - ID of the advice
   * @return {Promise<Advice>}
   */
  async deleteAdvice(id: string): Promise<Advice> {
    const deletedAdvice = await this.adviceDao.findByIdAndDelete(id);
    if (!deletedAdvice) {
      throw new NotFoundException(`Advice with ID ${id} not found`);
    }
    return deletedAdvice;
  }

  /**
   * Get advices by gameId
   *
   * @param {string} gameId - ID of the game
   * @return {Promise<Advice[]>}
   */
  async getAdvicesByGameId(gameId: string): Promise<Advice[]> {
    return this.adviceDao.findByGameId(gameId);
  }
}
