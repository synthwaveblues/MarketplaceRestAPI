import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ListingModule } from './listing/listing.module';
import { CommentModule } from './comment/comment.module';
import { MessageModule } from './message/message.module';
import { FavoriteModule } from './favorite/favorite.module';
import { CategoryModule } from './category/category.module';
import { ReportModule } from './report/report.module';
import { MailModule } from './mail/mail.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    ListingModule,
    CommentModule,
    MessageModule,
    FavoriteModule,
    NotificationModule,
    CategoryModule,
    ReportModule,
    MailModule,
  ],
})
export class AppModule {}