import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
  author: string;

  @ApiProperty({
    description: 'The content of the advice',
    example: 'This game is highly recommended for strategy lovers.',
  })
  content: string;

  @ApiPropertyOptional({
    description: 'Any additional comments or notes about the advice',
    example: 'Can also check the reviews on Steam.',
  })
  additionalComments?: string;
}
