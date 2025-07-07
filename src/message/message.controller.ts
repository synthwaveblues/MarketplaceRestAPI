import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@UseGuards(JwtGuard)
@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  sendMessage(
    @GetUser('id') senderId: number,
    @Body() dto: CreateMessageDto,
  ) {
    return this.messageService.sendMessage(senderId, dto);
  }

  @Get()
  getMessagesForUser(@GetUser('id') userId: number) {
    return this.messageService.getMessagesForUser(userId);
  }

  @Patch(':id')
  updateMessage(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) messageId: number,
    @Body() dto: UpdateMessageDto,
  ) {
    return this.messageService.updateMessage(userId, messageId, dto);
  }

  @Delete(':id')
  deleteMessage(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) messageId: number,
  ) {
    return this.messageService.deleteMessage(userId, messageId);
  }
}
