
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './services/mail.service';
import { Module } from '@nestjs/common';
import { MailerConfig } from './mail.config';


@Module({
  controllers: [MailController],
  imports: [
    MailerModule.forRootAsync({
      useClass: MailerConfig,
    }),
  ],
  providers: [MailService],
  exports: [MailService], 
})
export class MailModule {}
