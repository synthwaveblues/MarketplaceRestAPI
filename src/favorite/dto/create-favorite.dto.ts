import { IsInt, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateFavoriteDto {
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  listingId: number;
}
