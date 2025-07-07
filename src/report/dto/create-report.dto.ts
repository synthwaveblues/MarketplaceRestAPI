import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  reason: string;

  @Type(() => Number)
  @IsInt()
  listingId: number;

  @Type(() => Number)
  @IsInt()
  userId: number;
}
