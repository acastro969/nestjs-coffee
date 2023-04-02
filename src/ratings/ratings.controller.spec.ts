import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';

describe('RatingsController', () => {
  let service: RatingsService;
  let controller: RatingsController;
  
  beforeEach(async () => {
    service = new RatingsService(null, null);
    controller = new RatingsController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
