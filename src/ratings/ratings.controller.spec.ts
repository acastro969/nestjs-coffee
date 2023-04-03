import { Test } from '@nestjs/testing';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/request/create-rating.dto';
import { RatingResponseDto } from './dto/response/rating-response.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Coffee } from '../coffees/entities/coffee.entity';
import { Rating } from './entities/rating.entity';

describe('RatingsController', () => {
  let controller: RatingsController;
  let service: RatingsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [RatingsController],
      providers: [
        RatingsService,
        { provide: getRepositoryToken(Coffee), useValue: {} },
        { provide: getRepositoryToken(Rating), useValue: {} },
      ],
    }).compile();

    controller = module.get<RatingsController>(RatingsController);
    service = module.get<RatingsService>(RatingsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const coffeeId = 1;

    const createRatingDto: CreateRatingDto = {
      rating: 5,
      comments: 'Fantastic Coffee!',
    };

    const savedRating: RatingResponseDto = {
      id: 1,
      ...createRatingDto,
    };

    it('should create a rating and return it', async () => {
      jest.spyOn(service, 'create').mockImplementation(async () => savedRating);

      expect(await controller.create(coffeeId, createRatingDto)).toEqual(savedRating);
    });
  });
});
