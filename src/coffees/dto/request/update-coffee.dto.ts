import { PartialType } from '@nestjs/swagger';
import { CreateCoffeeDto } from './create-coffee.dto';

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {} // PartialType provides the ability to extend another DTO class, while also inheriting its validations. All fields in the extended DTO are marked as optional
