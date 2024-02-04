
import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './services/mail.service';



@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService
  ) {}
}