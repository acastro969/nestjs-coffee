import { Test } from '@nestjs/testing';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { PaginationQueryDto } from '../common/dto/request/pagination-query.dto';
import { CoffeeResponseDto } from './dto/response/coffee-response.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';
import { Coffee } from './entities/coffee.entity';
import { FlavorResponseDto } from './dto/response/flavor-response.dto';
import { RatingResponseDto } from '../ratings/dto/response/rating-response.dto';
import { NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/request/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/request/update-coffee.dto';

describe('CoffeesController', () => {
  let controller: CoffeesController;
  let service: CoffeesService;
  const coffee: CoffeeResponseDto = {
    id: 1,
    brand: 'NestJS',
    name: 'Coffee',
    flavors: [],
    ratings: [],
  };
  const coffees: CoffeeResponseDto[] = [coffee];
  const coffeeId = 1;
  const invalidCoffeeId = 10;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CoffeesController],
      providers: [
        CoffeesService,
        { provide: getRepositoryToken(Coffee), useValue: {} },
        { provide: getRepositoryToken(Flavor), useValue: {} },
      ],
    }).compile();

    controller = module.get<CoffeesController>(CoffeesController);
    service = module.get<CoffeesService>(CoffeesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of coffees', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(async () => coffees);

      expect(await controller.findAll(new PaginationQueryDto())).toBe(coffees);
    });

    it('should return an array of coffees with flavors and ratings', async () => {
      const flavors: FlavorResponseDto[] = [{ id: 1, name: 'Vanilla' }];
      const ratings: RatingResponseDto[] = [
        { id: 1, comments: 'Fantastic coffee!', rating: 5 },
      ];
      const coffeesWithFlavorsAndRatings: CoffeeResponseDto[] = [
        {
          id: 1,
          brand: 'NestJS',
          name: 'Coffee',
          flavors: flavors,
          ratings: ratings,
        },
      ];

      jest
        .spyOn(service, 'findAll')
        .mockImplementation(async () => coffeesWithFlavorsAndRatings);

      expect(await controller.findAll(new PaginationQueryDto())).toBe(
        coffeesWithFlavorsAndRatings,
      );
    });

    it('should return an array of coffees based on pagination query', async () => {
      const paginationQueryDto: PaginationQueryDto = { limit: 10, offset: 0 };

      jest.spyOn(service, 'findAll').mockImplementation(async () => coffees);

      expect(await controller.findAll(paginationQueryDto)).toEqual(coffees);
      expect(service.findAll).toHaveBeenCalledWith(paginationQueryDto);
    });
  });

  describe('findOne', () => {
    it('should return a single coffee by its id', async () => {
      jest.spyOn(service, 'findOne').mockImplementation(async () => coffee);

      expect(await controller.findOne(coffeeId)).toBe(coffee);
    });

    it('should throw a NotFoundException if there is no coffee for the specified id', async () => {
      jest.spyOn(service, 'findOne').mockReturnValue(null);

      try {
        await controller.findOne(invalidCoffeeId);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual(`Coffee #${invalidCoffeeId} not found`);
      }
    });
  });

  describe('create', () => {
    const createCoffeeDto: CreateCoffeeDto = {
      name: 'Coffee',
      brand: 'NestJS',
      flavors: [],
    };

    const savedCoffee: CoffeeResponseDto = {
      id: 1,
      ...createCoffeeDto,
      flavors: [],
      ratings: [],
    };

    it('should create a coffee and return it', async () => {
      jest.spyOn(service, 'create').mockImplementation(async () => savedCoffee);

      expect(await controller.create(createCoffeeDto)).toEqual(savedCoffee);
    });
  });

  describe('update', () => {
    const updateCoffeeDto: UpdateCoffeeDto = {
      brand: 'JavaScript',
    };

    const updatedCoffee: CoffeeResponseDto = {
      id: 1,
      name: 'Coffee',
      brand: 'JavaScript',
      flavors: [],
      ratings: [],
    };

    it('should update the coffee and return it', async () => {
      jest
        .spyOn(service, 'update')
        .mockImplementation(async () => updatedCoffee);

      expect(await controller.update(coffeeId, updateCoffeeDto)).toEqual(
        updatedCoffee,
      );
    });

    it('should throw a NotFoundException if there is no coffee for the specified id', async () => {
      jest.spyOn(service, 'update').mockReturnValue(null);

      try {
        await controller.update(invalidCoffeeId, updateCoffeeDto);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual(`Coffee #${invalidCoffeeId} not found`);
      }
    });
  });

  describe('remove', () => {
    const removedCoffee: CoffeeResponseDto = {
      id: 1,
      name: 'Coffee',
      brand: 'JavaScript',
      flavors: [],
      ratings: [],
    };

    it('should remove the coffee and return the removed coffee', async () => {
      jest
        .spyOn(service, 'remove')
        .mockImplementation(async () => removedCoffee);

      expect(await controller.remove(1)).toBe(removedCoffee);
    });

    it('should throw a NotFoundException if there is no coffee for the specified id', async () => {
      jest.spyOn(service, 'remove').mockReturnValue(null);

      try {
        await controller.remove(invalidCoffeeId);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual(`Coffee #${invalidCoffeeId} not found`);
      }
    });
  });
});
