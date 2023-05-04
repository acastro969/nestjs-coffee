import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { Public } from '../common/decorators/public.decorator';
import { PaginationQueryDto } from '../common/dto/request/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/request/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/request/update-coffee.dto';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {} // Inyecta el servicio CoffeesService en el controlador CoffeesController. Esta inyección de dependencia es gestionada en tiempo de ejecución por Nest. Cuando se crea una instancia de CoffeesController, Nest encuentra automáticamente la dependencia requerida de CoffeesService. Verifica si ya existe una instancia del servicio y, de no ser así, crea una nueva instancia y la devuelve. Si CoffeesService tiene otras dependencias, Nest tambien las resuelve en el orden correcto

  @Public()
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    // El nombre de la función no hace nada por sí solo
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    // El decorador @Param() se utiliza para los parámetros de URL dinámicos. Para los query params, el decorador correcto es @Query()
    return this.coffeesService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coffeesService.remove(id);
  }
}
