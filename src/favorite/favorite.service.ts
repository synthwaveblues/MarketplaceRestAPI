import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async addFavorite(userId: number, listingId: number) {
    return this.prisma.favorite.create({
      data: {
        userId,
        listingId,
      },
    });
  }

  async getUserFavorites(userId: number) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: { listing: true }, // jeśli chcesz zwrócić info o listingach
    });
  }

  async removeFavorite(userId: number, favoriteId: number) {
    return this.prisma.favorite.deleteMany({
      where: {
        id: favoriteId,
        userId,
      },
    });
  }

  // opcjonalnie update — jeśli masz pola do aktualizacji
  async updateFavorite(userId: number, favoriteId: number, dto: any) {
    return this.prisma.favorite.updateMany({
      where: { id: favoriteId, userId },
      data: { ...dto },
    });
  }
}
