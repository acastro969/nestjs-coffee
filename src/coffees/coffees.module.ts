import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
  // CoffeesController y CoffeesService están estrechamente relacionados, por lo que tiene sentido moverlos a este feature module. Esto organiza el código relevante para una funcionalidad específica, mantiene el código organizado y establece límites claros
  imports: [TypeOrmModule.forFeature([Coffee, Flavor]), ConfigModule], // Configura un set especifico de entidades para un feature module
  controllers: [CoffeesController], // Registra los controladores del módulo, que deben estar presentes para que Nest los instancie
  providers: [CoffeesService], // Registra los proveedores que se deben instanciar y deben ser compartidos en todo este módulo
  exports: [CoffeesService], // Lista de proveedores que deben estar disponibles para otros módulos
})
export class CoffeesModule {}
