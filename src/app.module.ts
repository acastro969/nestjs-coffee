import { Module } from '@nestjs/common';
import { CoffeesModule } from './coffees/coffees.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CoffeesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-course'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
