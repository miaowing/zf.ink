import { Body, Controller, Post } from '@nestjs/common';
import { IMessage } from '../interfaces/IMessage';
import { MessageService } from '../services';

@Controller('/api/messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
  ) {
  }

  @Post()
  async send(@Body('message') message: IMessage) {
    await this.messageService.sendMessage(message);
  }
}
