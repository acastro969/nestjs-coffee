import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { PaginationQueryDto } from '../common/dto/request/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/request/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/request/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { CoffeeResponseDto } from './dto/response/coffee-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable() // Marca la clase como un proveedor. Los proveedores pueden ser inyectados en otras clases a través del constructor
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<CoffeeResponseDto[]> {
    const { limit, offset } = paginationQuery;
    const coffees: Coffee[] = await this.coffeeRepository.find({
      relations: {
        flavors: true,
        ratings: true,
      },
      skip: offset,
      take: limit,
    });

    return plainToInstance(CoffeeResponseDto, coffees);
  }

  async findOne(id: number): Promise<CoffeeResponseDto> {
    const coffee: Coffee = await this.coffeeRepository.findOne({
      where: { id: +id },
      relations: {
        // Une entidades
        flavors: true,
        ratings: true,
      },
    });

    if (!coffee) throw new NotFoundException(`Coffee #${id} not found`);

    return plainToInstance(CoffeeResponseDto, coffee);
  }

  async create(createCoffeeDto: CreateCoffeeDto): Promise<CoffeeResponseDto> {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });

    const savedCoffee = await this.coffeeRepository.save(coffee);

    return plainToInstance(CoffeeResponseDto, savedCoffee);
  }

  async update(
    id: number,
    updateCoffeeDto: UpdateCoffeeDto,
  ): Promise<CoffeeResponseDto> {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const coffee = await this.coffeeRepository.preload({
      // Crea una nueva entidad. Si la entidad ya existe en la base de datos, se carga y se reemplazan sus valores con los nuevos
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });

    if (!coffee) throw new NotFoundException(`Coffee #${id} not found`);

    const savedCoffee = await this.coffeeRepository.save(coffee);

    return plainToInstance(CoffeeResponseDto, savedCoffee);
  }

  async remove(id: number): Promise<CoffeeResponseDto> {
    const coffee: Coffee = await this.coffeeRepository.findOne({
      where: { id: +id },
      relations: {
        flavors: true,
        ratings: true,
      },
    });

    if (!coffee) throw new NotFoundException(`Coffee #${id} not found`);

    const removedCoffee = await this.coffeeRepository.remove(coffee);

    return plainToInstance(CoffeeResponseDto, removedCoffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    // Busca un flavor por su nombre. Si no existe, lo crea (pero no lo guarda)
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });

    if (existingFlavor) return existingFlavor;

    return this.flavorRepository.create({ name });
  }
}
