import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateNotificationDto {
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  userId: number;

  @IsString()
  message: string;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  read: boolean;
}