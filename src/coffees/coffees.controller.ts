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
  constructor(private readonly coffeesService: CoffeesService) {} // Injects the CoffeesService into the CoffeesController. This dependency injection is managed by the Nest runtime. When an instance of the CoffeesController is created, Nest automatically finds the required dependency of CoffeesService. It checks if an instance of the service already exists, and if not, it creates a new instance and returns it. If CoffeesService has other dependencies, Nest resolves them in the correct order as well

  @Public()
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    // Function name doesn't do anything by itself
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    // The @Param() decorator is used for dynamic URL parameters. For query parameters, the correct decorator is @Query()
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
