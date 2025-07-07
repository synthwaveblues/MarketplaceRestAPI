import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@UseGuards(JwtGuard)
@Controller('favorites')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Post()
  addFavorite(
    @GetUser('id') userId: number,
    @Body() dto: CreateFavoriteDto,
  ) {
    return this.favoriteService.addFavorite(userId, dto.listingId);
  }

  @Get()
  getFavorites(@GetUser('id') userId: number) {
    return this.favoriteService.getUserFavorites(userId);
  }

  @Delete(':id')
  removeFavorite(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) favoriteId: number,
  ) {
    return this.favoriteService.removeFavorite(userId, favoriteId);
  }

  @Patch(':id')
  updateFavorite(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) favoriteId: number,
    @Body() dto: UpdateFavoriteDto,
  ) {
    return this.favoriteService.updateFavorite(userId, favoriteId, dto);
  }
}
