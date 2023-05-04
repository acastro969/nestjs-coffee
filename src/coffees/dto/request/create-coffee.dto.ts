import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of a coffee.' }) // For documentation proposes
  @IsString() // Class-validator decorator, throws BadRequestException if the validation fails
  readonly name: string;

  @ApiProperty({ description: 'The brand of a coffee.' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ description: 'Flavor notes.' })
  @IsString({ each: true })
  readonly flavors: string[];
}
