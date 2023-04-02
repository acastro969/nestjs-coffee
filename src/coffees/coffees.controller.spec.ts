import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

describe('CoffeesController', () => {
  let service: CoffeesService;
  let controller: CoffeesController;

  beforeEach(async () => {
    service = new CoffeesService(null, null);
    controller = new CoffeesController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
