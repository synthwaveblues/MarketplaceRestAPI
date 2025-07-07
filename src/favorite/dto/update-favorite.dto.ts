import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateFavoriteDto {
  @IsOptional()
  @IsBoolean()
  someFlag?: boolean; // Przykład pola, jeśli chcesz coś aktualizować, np. status ulubionego
}
