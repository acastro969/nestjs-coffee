import { EmptyToUndefined } from '../../../common/decorators/empty-to-undefined.decorator';

export class RatingResponseDto {
  readonly id: number;

  readonly rating: number;

  @EmptyToUndefined()
  readonly comments: string;
}
