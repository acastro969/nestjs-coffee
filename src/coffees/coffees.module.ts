import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
  // CoffeesController and CoffeesService are closely related, so it makes sense to move them into this feature module. Which organizes code relevant for a specific feature, keeping code organized and establishing clear boundaries
  imports: [TypeOrmModule.forFeature([Coffee, Flavor]), ConfigModule], // Configure a module of set entities in a specific feature module
  controllers: [CoffeesController], // Registers the module controllers, which have to be present for Nest to instantiate them
  providers: [CoffeesService], // Registers the providers to be instantiated that may be shared across this module
  exports: [CoffeesService], // List of providers that need to be available to other modules
})
export class CoffeesModule {}
