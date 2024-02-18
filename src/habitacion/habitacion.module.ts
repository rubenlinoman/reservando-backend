import { AuthService } from 'src/auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { HabitacionController } from './habitacion.controller';
import { HabitacionService } from './habitacion.service';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Habitacion, TipoHabitacion } from 'src/shared/entities';

@Module({
  controllers: [HabitacionController],
  providers: [HabitacionService],
  imports: [
    ConfigModule.forRoot(), // Lo llamamos para poder acceder a las variables de entorno en el jwtModule
    TypeOrmModule.forFeature([
      Habitacion,
      TipoHabitacion,
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6h' },
    }),
  ]
})
export class HabitacionModule {}
