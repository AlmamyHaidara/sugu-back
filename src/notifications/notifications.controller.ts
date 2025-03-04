import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @Put('/:id/:status/:date')
  updateStatus(
    @Param('id') id: string,
    @Param('status') status: string,
    @Param('date') date: string,
  ) {
    return this.notificationsService.updateStatus(
      +id,
      status.toUpperCase() as 'ARCHIVED' | 'READ' | 'UNREAD',
      new Date(date),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }

  @Get('unread/:userId')
  findUnreadByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.notificationsService.findUnreadByUser(userId);
  }

  @Get('all/:userId')
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.notificationsService.findByUser(userId);
  }
}
