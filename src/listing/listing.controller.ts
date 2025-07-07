import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ListingService } from './listing.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { CreateListingDto } from './dto/create-listing.dto';
import { EditListingDto } from './dto/update-listing.dto';

@UseGuards(JwtGuard)
@Controller('listings')
export class ListingController {
  constructor(private listingService: ListingService) {}

  @Post()
  createListing(@GetUser('id') userId: number, @Body() dto: CreateListingDto) {
    return this.listingService.createListing(userId, dto);
  }

  @Get()
  getAllListings() {
    return this.listingService.getAllListings();
  }

  @Get(':id')
  getListingById(@Param('id', ParseIntPipe) id: number) {
    return this.listingService.getListingById(id);
  }

  @Patch(':id')
  editListing(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditListingDto,
  ) {
    return this.listingService.editListing(userId, id, dto);
  }

  @Delete(':id')
  deleteListing(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.listingService.deleteListing(userId, id);
  }
}
