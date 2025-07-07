import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(senderId: number, dto: CreateMessageDto) {
    return this.prisma.message.create({
      data: {
        content: dto.content,
        senderId,
        receiverId: dto.receiverId,
      },
    });
  }

  async getMessagesForUser(userId: number) {
    return this.prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateMessage(userId: number, messageId: number, dto: UpdateMessageDto) {
    const message = await this.prisma.message.findUnique({ where: { id: messageId } });
    if (!message) throw new NotFoundException('Message not found');
    if (message.senderId !== userId) throw new ForbiddenException('Cannot edit others messages');

    return this.prisma.message.update({
      where: { id: messageId },
      data: { ...dto },
    });
  }

  async deleteMessage(userId: number, messageId: number) {
    const message = await this.prisma.message.findUnique({ where: { id: messageId } });
    if (!message) throw new NotFoundException('Message not found');
    if (message.senderId !== userId) throw new ForbiddenException('Cannot delete others messages');

    return this.prisma.message.delete({ where: { id: messageId } });
  }
}
