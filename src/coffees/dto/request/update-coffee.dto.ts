import { PartialType } from '@nestjs/swagger';
import { CreateCoffeeDto } from './create-coffee.dto';

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {} // PartialType proporciona la capacidad de extender otra clase DTO, mientras se heredan sus validaciones. Todos los campos en el DTO extendido se marcan como opcionales
