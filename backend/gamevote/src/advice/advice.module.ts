import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Advice, AdviceSchema } from './schemas/advice.schema';
import { AdviceController } from './advice.controller';
import { AdviceService } from './advice.service';
import { AdviceDao } from './dao/advice.dao';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Advice.name, schema: AdviceSchema }]),
  ],
  controllers: [AdviceController],
  providers: [AdviceService, AdviceDao],
})
export class AdviceModule {}
