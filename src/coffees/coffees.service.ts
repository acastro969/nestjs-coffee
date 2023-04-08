import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCoffeeDto } from './dto/request/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Connection, Model } from 'mongoose';
import { Event } from '../events/entities/event.entity';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CreateCoffeeDto } from './dto/request/create-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/request/pagination-query.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name)
    private readonly coffeeModel: Model<Coffee>,
    @InjectConnection('Database') private readonly connection: Connection,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = paginationQueryDto;
    return this.coffeeModel.find().skip(offset).limit(limit).exec();
  }

  async findOne(id: string) {
    const coffee = await this.coffeeModel.findOne({ _id: id }).exec();

    if (!coffee) throw new NotFoundException(`Coffee #${id} not found`);

    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = new this.coffeeModel(createCoffeeDto);
    return coffee.save();
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = await this.coffeeModel
      .findOneAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
      .exec();

    if (!existingCoffee) throw new NotFoundException(`Coffee #${id} not found`);

    return existingCoffee;
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return coffee.deleteOne();
  }

  async recommendCoffee(coffee: Coffee) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      coffee.recommendations++;

      const recommendEvent = new this.eventModel({
        name: 'recommend_coffee',
        type: 'coffee',
        payload: { coffeeId: coffee.id },
      });

      await recommendEvent.save({ session });
      await coffee.save({ session });

      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
  }
}
