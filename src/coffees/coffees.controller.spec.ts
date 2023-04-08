import { Test } from '@nestjs/testing';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Coffee } from './entities/coffee.entity';
import { connection } from 'mongoose';

describe('CoffeesController', () => {
  let controller: CoffeesController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CoffeesController],
      providers: [
        CoffeesService,
        { provide: getModelToken(Coffee.name), useValue: {} },
        { provide: getConnectionToken('Database'), useValue: connection },
        { provide: getModelToken(Event.name), useValue: {} },
      ],
    }).compile();

    controller = module.get<CoffeesController>(CoffeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
