import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsAlpha, IsAscii, IsNumber, Max, Min } from 'class-validator';

export class CreateAdviceDto {
  @ApiProperty({
    description: 'The ID of the game associated with the advice',
    example: 123,
  })
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

  @ApiProperty({
    description: 'The rating for the game, ranging from 0 to 10',
    example: 8,
  })
  @IsNumber()
  @Min(0)
  @Max(10)
  note: number;
}
