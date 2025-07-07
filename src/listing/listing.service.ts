import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditListingDto } from './dto/update-listing.dto';
import { CreateListingDto } from './dto/create-listing.dto';

@Injectable()
export class ListingService {
  constructor(private prisma: PrismaService) {}

  async createListing(userId: number, dto: CreateListingDto) {
    return this.prisma.listing.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async getAllListings() {
    return this.prisma.listing.findMany({
      include: {
        user: true,
        category: true,
      },
    });
  }

  async getListingById(id: number) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: { user: true, category: true },
    });
    if (!listing) throw new NotFoundException('Listing not found');
    return listing;
  }

  async editListing(userId: number, listingId: number, dto: EditListingDto) {
    const listing = await this.prisma.listing.findUnique({ where: { id: listingId } });
    if (!listing || listing.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.listing.update({
      where: { id: listingId },
      data: { ...dto },
    });
  }

  async deleteListing(userId: number, listingId: number) {
    const listing = await this.prisma.listing.findUnique({ where: { id: listingId } });
    if (!listing || listing.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.listing.delete({
      where: { id: listingId },
    });
  }
}
