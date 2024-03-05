import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { Module } from '@nestjs/common';
import { ReservaController } from './reserva.controller';
import { ReservaService } from './reserva.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EstadoReserva, Reserva } from 'src/shared/entities';

@Module({
  controllers: [ReservaController],
  providers: [ReservaService],
  imports: [
    MailModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      Reserva,
      EstadoReserva
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6h' },
    }),
  ],
})
export class ReservaModule {}
