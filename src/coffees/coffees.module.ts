import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor]), ConfigModule], // Defines the repositories in the scope for dependency injection and registers them as providers
  controllers: [CoffeesController], // Registers the module controllers, which have to be present for Nest to instantiate them
  providers: [CoffeesService], // Registers the provider in the Nest Inversion of Control Container
  exports: [CoffeesService],
})
export class CoffeesModule {}
