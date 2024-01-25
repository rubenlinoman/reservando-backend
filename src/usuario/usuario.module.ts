import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { AuthService } from 'src/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/shared/entities';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, AuthService],
  imports: [
    // MailModule,
    ConfigModule.forRoot(), // Lo llamamos para poder acceder a las variables de entorno en el jwtModule
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6h' },
    }),
  ]
})
export class UsuarioModule {}
