import { Injectable, OnModuleInit } from '@nestjs/common';
import * as email from 'emailjs';
import { BootValue } from '@nestcloud/boot';
import { IMessage } from '../interfaces/IMessage';

@Injectable()
export class MessageService implements OnModuleInit {
  @BootValue('email.user')
  private readonly emailUser: string;
  @BootValue('email.host')
  private readonly emailHost: string;
  @BootValue('email.password')
  private readonly emailPass: string;
  @BootValue('email.ssl', false)
  private readonly emailSSL: boolean;
  @BootValue('email.to')
  private readonly emailTo: string;
  @BootValue('email.from')
  private readonly emailFrom: string;
  private server;

  public async sendMessage(message: IMessage) {
    await new Promise((resolve, reject) => {
      this.server.send({
        text: `姓名：${message.name} \n 电话：${message.phone}\n 公司：${message.company}\n 邮箱：${message.email}\n message： ${message.message}`,
        from: this.emailFrom,
        to: this.emailTo,
        subject: 'ZF.INK Contact',
      }, (err, msg) => {
        if (err) {
          return reject(err);
        }
        resolve(msg);
      });
    });
  }

  onModuleInit(): any {
    this.server = email.server.connect({
      user: this.emailUser,
      password: this.emailPass,
      host: this.emailHost,
      ssl: this.emailSSL,
    });
  }
}
