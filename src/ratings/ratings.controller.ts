import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateRatingDto } from './dto/request/create-rating.dto';
import { RatingsService } from './ratings.service';
import { ApiTags } from '@nestjs/swagger/dist/decorators';

@ApiTags('ratings')
@Controller()
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post('/coffees/:coffeeId/ratings')
  create(
    @Param('coffeeId') coffeeId: number,
    @Body() createRatingDto: CreateRatingDto,
  ) {
    return this.ratingsService.create(coffeeId, createRatingDto);
  }
}
