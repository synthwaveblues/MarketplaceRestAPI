import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  receiverId: number;
}
