import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard'
import { User } from 'generated/prisma/client';
import { GetUser } from '../auth/decorator';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(
    @GetUser('id') userId: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.editUser(userId, dto);
  }
}