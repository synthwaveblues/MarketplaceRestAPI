import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async createComment(userId: number, dto: CreateCommentDto) {
    // Możesz dodać tu dodatkową logikę, np. czy listing istnieje

    return this.prisma.comment.create({
      data: {
        content: dto.content,
        userId,
        listingId: dto.listingId,
      },
    });
  }

  async getCommentsForListing(listingId: number) {
    return this.prisma.comment.findMany({
      where: { listingId },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateComment(userId: number, commentId: number, dto: UpdateCommentDto) {
    const comment = await this.prisma.comment.findUnique({ where: { id: commentId } });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.userId !== userId) throw new ForbiddenException('Not allowed to edit this comment');

    return this.prisma.comment.update({
      where: { id: commentId },
      data: { ...dto },
    });
  }

  async deleteComment(userId: number, commentId: number) {
    const comment = await this.prisma.comment.findUnique({ where: { id: commentId } });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.userId !== userId) throw new ForbiddenException('Not allowed to delete this comment');

    return this.prisma.comment.delete({ where: { id: commentId } });
  }
}
