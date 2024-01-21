import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as entity from './shared/entities';  // Importa todas las entidades desde el índice

@Module({
  imports: [
    // Habilita las variables de entorno
    ConfigModule.forRoot(),
    // Conexión a la base de datos
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      // Entidades de la base de datos
      entities: [
        entity.Alojamiento,
        entity.Empresa,
        entity.EstadoAlojamiento,
        entity.Reserva,
        entity.TipoUsuario,
        entity.Usuario
      ],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
