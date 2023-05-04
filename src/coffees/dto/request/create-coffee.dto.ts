import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of a coffee.' }) // Para fines de documentación
  @IsString() // Decorador de class-validator, arroja una excepción BadRequestException si la validación falla
  readonly name: string;

  @ApiProperty({ description: 'The brand of a coffee.' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ description: 'Flavor notes.' })
  @IsString({ each: true })
  readonly flavors: string[];
}
