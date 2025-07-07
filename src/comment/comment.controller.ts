import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@UseGuards(JwtGuard)
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  createComment(
    @GetUser('id') userId: number,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentService.createComment(userId, dto);
  }

  @Get('listing/:listingId')
  getCommentsForListing(
    @Param('listingId', ParseIntPipe) listingId: number,
  ) {
    return this.commentService.getCommentsForListing(listingId);
  }

  @Patch(':id')
  updateComment(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(userId, commentId, dto);
  }

  @Delete(':id')
  deleteComment(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    return this.commentService.deleteComment(userId, commentId);
  }
}
