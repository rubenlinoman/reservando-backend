import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as entity from './shared/entities';  // Importa todas las entidades desde el índice

// M
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';

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
        entity.Empresa,
        entity.EstadoAlojamiento,
        entity.Reserva,
        entity.TipoUsuario,
        entity.Usuario
      ],
      synchronize: false,
    }),

    // Módulos de la aplicación
    AuthModule,
    UsuarioModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
