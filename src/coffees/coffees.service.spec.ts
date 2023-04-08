import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Coffee } from './entities/coffee.entity';
import { Event } from '../events/entities/event.entity';
import { connection } from 'mongoose';

describe('CoffeesService', () => {
  let service: CoffeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: getModelToken(Coffee.name), useValue: {} },
        { provide: getConnectionToken('Database'), useValue: connection },
        { provide: getModelToken(Event.name), useValue: {} },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
