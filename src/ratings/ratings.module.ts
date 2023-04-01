import { Module } from '@nestjs/common';
import { CoffeesModule } from '../coffees/coffees.module';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config/dist';
import { Rating } from './entities/rating.entity';
import { Coffee } from '../coffees/entities/coffee.entity';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forFeature([Coffee, Rating]),
    ConfigModule,
  ],
  providers: [RatingsService],
  controllers: [RatingsController],
})
export class RatingsModule {}
