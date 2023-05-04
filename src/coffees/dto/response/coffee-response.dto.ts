import { Type } from 'class-transformer';
import { RatingResponseDto } from '../../../ratings/dto/response/rating-response.dto';
import { FlavorResponseDto } from './flavor-response.dto';

export class CoffeeResponseDto {
  readonly id: number;

  readonly name: string;

  readonly brand: string;

  @Type(() => FlavorResponseDto) // Especifica manualmente el tipo de la propiedad
  readonly flavors: FlavorResponseDto[];

  @Type(() => RatingResponseDto)
  readonly ratings: RatingResponseDto[];
}
