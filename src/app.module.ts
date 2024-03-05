import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as entity from './shared/entities'; // Importa todas las entidades desde el índice

import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { MailModule } from './mail/mail.module';
import { AlojamientoModule } from './alojamiento/alojamiento.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HabitacionModule } from './habitacion/habitacion.module';
import { ReservaModule } from './reserva/reserva.module';

@Module({
  imports: [
    // Habilita las variables de entorno
    ConfigModule.forRoot(),
    // Conexión a la base de datos
    TypeOrmModule.forRoot({ // Conexión a la base de datos mysql
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // Entidades de la base de datos
      entities: [
        entity.Alojamiento,
        entity.EstadoReserva,
        entity.Habitacion,
        entity.TipoHabitacion,
        entity.Reserva,
        entity.TipoAlojamiento,
        entity.TipoUsuario,
        entity.Usuario
      ],
      synchronize: false,
    }),

    // Archivos estáticos
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public'),
      serveStaticOptions: {
        index: false
      }
    }),

    // Módulos de la aplicación
    AlojamientoModule,
    AuthModule,
    HabitacionModule,
    MailModule,
    UsuarioModule,
    ReservaModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
