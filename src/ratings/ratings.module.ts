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
    CoffeesModule, // Si el módulo CoffeesModule exporta CoffeesService, significa que al importar CoffeesModule tendremos acceso a CoffeesService.
    ConfigModule,
  ],
  providers: [RatingsService],
  controllers: [RatingsController],
})
export class RatingsModule {}
