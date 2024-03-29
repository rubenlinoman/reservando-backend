import { AlojamientoController } from './alojamiento.controller';
import { AlojamientoService } from './alojamiento.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Alojamiento, TipoAlojamiento } from 'src/shared/entities';

@Module({
  controllers: [AlojamientoController],
  providers: [AlojamientoService],
  imports: [
    MailModule,
    ConfigModule.forRoot(), // Lo llamamos para poder acceder a las variables de entorno en el jwtModule
    TypeOrmModule.forFeature([
      Alojamiento,
      TipoAlojamiento,
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6h' },
    }),
  ]
})
export class AlojamientoModule {}
