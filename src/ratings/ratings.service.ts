import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { CreateRatingDto } from './dto/request/create-rating.dto';
import { Coffee } from '../coffees/entities/coffee.entity';
import { RatingResponseDto } from './dto/response/rating-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Rating)
    private readonly ratingsRepository: Repository<Rating>,
  ) {}

  async create(
    coffeeId: number,
    createRatingDto: CreateRatingDto,
  ): Promise<RatingResponseDto> {
    const coffee = await this.preloadCoffeeById(coffeeId);

    const rating = this.ratingsRepository.create({
      coffee: coffee,
      ...createRatingDto,
    });

    const savedRating = this.ratingsRepository.save(rating);

    return plainToInstance(RatingResponseDto, savedRating);
  }

  private async preloadCoffeeById(id: number) {
    const existingCoffee = await this.coffeeRepository.findOne({
      where: { id: +id },
    });

    if (!existingCoffee) throw new NotFoundException(`Coffee #${id} not found`);

    return existingCoffee;
  }
}
