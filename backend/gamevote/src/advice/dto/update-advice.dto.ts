import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAdviceDto {
  @ApiPropertyOptional({
    description: 'Unique identifier of the advice',
    example: '60d5f484b8e4f623a12f45a7',
  })
  id?: string;

  @ApiPropertyOptional({
    description: 'Unique identifier of the related game',
    example: '1234',
  })
  gameId?: number;

  @ApiPropertyOptional({
    description: 'Name of the author of the advice',
    example: 'John Doe',
  })
  author?: string;

  @ApiPropertyOptional({
    description: 'Content of the advice',
    example: 'This game is great for its storyline and graphics.',
  })
  content?: string;
}
