import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdviceDto } from '../dto/create-advice.dto';
import { UpdateAdviceDto } from '../dto/update-advice.dto';
import { Advice } from '../schemas/advice.schema'; // Adjust the import according to your structure

@Injectable()
export class AdviceDao {
  constructor(
    @InjectModel(Advice.name)
    private readonly _adviceModel: Model<Advice>,
  ) {}

  /**
   * Find all advices
   *
   * @return {Promise<Advice[]>}
   */
  findAll(): Promise<Advice[]> {
    return this._adviceModel.find().exec();
  }

  /**
   * Find advice by ID
   *
   * @param {string} id - ID of the advice
   * @return {Promise<Advice | null>}
   */
  findById(id: string): Promise<Advice | null> {
    return this._adviceModel.findById(id).exec();
  }

  /**
   * Create a new advice
   *
   * @param {CreateAdviceDto} advice - DTO containing advice data
   * @return {Promise<Advice>}
   */
  create(advice: CreateAdviceDto): Promise<Advice> {
    const newAdvice = new this._adviceModel(advice);
    return newAdvice.save();
  }

  /**
   * Update advice by ID
   *
   * @param {string} id - ID of the advice
   * @param {UpdateAdviceDto} advice - DTO containing updated advice data
   * @return {Promise<Advice | null>}
   */
  findByIdAndUpdate(
    id: string,
    advice: UpdateAdviceDto,
  ): Promise<Advice | null> {
    return this._adviceModel
      .findByIdAndUpdate(id, advice, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  /**
   * Delete advice by ID
   *
   * @param {string} id - ID of the advice
   * @return {Promise<Advice | null>}
   */
  findByIdAndDelete(id: string): Promise<Advice | null> {
    return this._adviceModel.findByIdAndDelete(id).exec();
  }

  /**
   * Find advices by gameId
   *
   * @param {string} gameId - ID of the game
   * @return {Promise<Advice[]>}
   */
  findByGameId(gameId: string): Promise<Advice[]> {
    return this._adviceModel.find({ gameId }).exec();
  }
}
