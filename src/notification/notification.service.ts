import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService
  ) {}

  async create(dto: CreateNotificationDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });

    if (!user) throw new Error('User not found');

    const notification = await this.prisma.notification.create({
      data: {
        userId: dto.userId,
        message: dto.message,
        read: dto.read,
      },
    });

    // Wyślij email
    await this.mailService.sendNotificationEmail(user.email, dto.message);

    return notification;
  }

  findAll() {
    return this.prisma.notification.findMany();
  }

  findOne(id: number) {
    return this.prisma.notification.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateNotificationDto) {
    return this.prisma.notification.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.notification.delete({ where: { id } });
  }
}
