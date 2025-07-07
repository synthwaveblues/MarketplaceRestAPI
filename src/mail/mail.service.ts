import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendNotificationEmail(to: string, message: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'New notification',
      text: message,
    });
  }
}
