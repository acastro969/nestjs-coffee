import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { CreateRatingDto } from './dto/request/create-rating.dto';
import { Coffee } from '../coffees/entities/coffee.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Rating)
    private readonly ratingsRepository: Repository<Rating>,
  ) {}

  async create(coffeeId: number, createRatingDto: CreateRatingDto) {
    const coffee = await this.preloadCoffeeById(coffeeId);

    const rating = this.ratingsRepository.create({
      coffee: coffee,
      ...createRatingDto,
    });

    return this.ratingsRepository.save(rating);
  }

  private async preloadCoffeeById(id: number) {
    const existingCoffee = await this.coffeeRepository.findOne({
      where: { id: +id },
    });

    if (!existingCoffee) throw new NotFoundException(`Coffee #${id} not found`);

    return existingCoffee;
  }
}
