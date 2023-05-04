import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesModule } from './coffees/coffees.module';
import { RatingsModule } from './ratings/ratings.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import dbConfiguration from './config/db.config';

@Module({
  // Los modulos proveen metadatos para organizar la estructura de la aplicación. Este es el módulo raíz que sirve como punto de partida para construir el application graph (una estructura de datos interna utilizada por NestJS para resolver las relaciones de módulos, providers y las dependencias). Si bien las aplicaciones pequeñas pueden llevar solo un módulo raíz, se recomienda crear diferentes módulos como una forma efectiva de organizar los componentes, cada uno encapsulando conjuntos de capacidades estrechamente relacionados. El uso de módulos ayuda a manejar la complejidad y desarrollar con principios SOLID, especialmente a medida que el tamaño de la aplicación y/o del equipo crece
  imports: [
    // Lista de módulos requeridos por el módulo actual
    ConfigModule.forRoot({
      // Carga variables de entorno y registra configuraciones personalizadas de forma global
      isGlobal: true,
      load: [dbConfiguration],
    }),
    TypeOrmModule.forRootAsync({
      // forRootAsync es una función asincrónica que se utiliza para configurar las opciones de provider para un módulo durante la importación, es útil para casos como la obtención de datos desde un servidor remoto o la lectura de un archivo de configuración. Por lo general, devuelve una promise que se resuelve a un módulo que se utilizará en el resto de la aplicación
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      imports: [],
    }),
    CoffeesModule,
    RatingsModule,
    CommonModule,
  ],
})
export class AppModule {}
