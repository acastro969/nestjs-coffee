import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, Max } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({ description: 'Stars rating of a coffee, from 0 to 5.' })
  @IsPositive()
  @Max(5)
  readonly rating: number;

  @ApiProperty({
    description: 'Additional comments about the coffee.',
    required: false,
  })
  @IsOptional()
  readonly comments: string;
}
