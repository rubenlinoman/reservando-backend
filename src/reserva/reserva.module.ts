import { AlojamientoModule } from 'src/alojamiento/alojamiento.module';
import { AlojamientoService } from 'src/alojamiento/alojamiento.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { Module } from '@nestjs/common';
import { ReservaController } from './reserva.controller';
import { ReservaService } from './reserva.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Alojamiento, EstadoReserva, Habitacion, Reserva, TipoAlojamiento, TipoHabitacion, Usuario } from 'src/shared/entities';
import { HabitacionService } from 'src/habitacion/habitacion.service';
import { HabitacionModule } from 'src/habitacion/habitacion.module';

@Module({
  controllers: [ReservaController],
  providers: [ReservaService, AlojamientoService, AuthService, HabitacionService],
  imports: [
    MailModule,
    AlojamientoModule,
    AuthModule,
    HabitacionModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      Alojamiento,
      EstadoReserva,
      Reserva,
      TipoAlojamiento,
      Usuario,
      Habitacion,
      TipoHabitacion,
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6h' },
    }),
  ],
})
export class ReservaModule {}
