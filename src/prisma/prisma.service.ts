import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDb() {
    return this.$transaction([
      this.user.deleteMany(),
      this.comment.deleteMany(),
      this.category.deleteMany(),
      this.message.deleteMany(),
      this.listing.deleteMany(),
      this.report.deleteMany(),
      this.notification.deleteMany(),
      this.favorite.deleteMany(),
    ]);
  }
}