import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsAlpha, IsAlphanumeric, IsAscii, IsNumber } from 'class-validator';

export class CreateAdviceDto {
  @ApiProperty({
    description: 'The ID of the game associated with the advice',
    example: 123,
  })

  @IsNumber()
  gameId: number;

  @ApiProperty({
    description: 'The name of the author of the advice',
    example: 'John Doe',
  })
  @IsAlpha()
  author: string;

  @ApiProperty({
    description: 'The content of the advice',
    example: 'This game is highly recommended for strategy lovers.',
  })
  @IsAscii()
  content: string;

  @ApiPropertyOptional({
    description: 'Any additional comments or notes about the advice',
    example: 'Can also check the reviews on Steam.',
  })
  additionalComments?: string;
}
