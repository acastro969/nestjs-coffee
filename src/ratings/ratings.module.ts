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
    TypeOrmModule.forFeature([Coffee, Rating]),
    CoffeesModule, // If CoffeesModule exported the CoffeesService, it means importing the CoffeesModule will give me access to the CoffeesService
    ConfigModule,
  ],
  providers: [RatingsService],
  controllers: [RatingsController],
})
export class RatingsModule {}
