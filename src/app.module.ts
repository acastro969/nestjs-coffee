import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesModule } from './coffees/coffees.module';
import { RatingsModule } from './ratings/ratings.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import dbConfiguration from './config/db.config';

@Module({
  // Modules provide metadata for organizing the application's structure. This is the root module which serves as the starting point for building the application graph (an internal data structure used by NestJS to resolve module and provider relationships and dependencies). While small applications may only need a root module, creating different modules is strongly recommended as an effective way of organizing components, each encapsulating closely related sets of capabilities. Using modules helps manage complexity and develop with SOLID principles, particularly as the size of the application and/or team grows
  imports: [
    // List of modules required by the current module
    ConfigModule.forRoot({
      // Loads environment variables and registers custom configurations globally
      isGlobal: true,
      load: [dbConfiguration],
    }),
    CoffeesModule,
    TypeOrmModule.forRootAsync({
      // forRootAsync is an asynchronous function that is used to configure provider options for a module during import, its useful for cases like fetching data from a remote server or reading a configuration file. It typically returns a promise that resolves to a module to be used by the rest of the application
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    RatingsModule,
    CommonModule,
  ],
})
export class AppModule {}
