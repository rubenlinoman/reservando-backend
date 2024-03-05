import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoReserva, Reserva } from 'src/shared/entities';
import { Repository } from 'typeorm';
import { CreateReservaDto } from './dto/create-reserva.dto';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,
    @InjectRepository(EstadoReserva)
    private estadoReservaRepository: Repository<EstadoReserva>,
  ) {}

  findAll(): Promise<Reserva[]> {
    return this.reservaRepository.find();
  }

  /**
   * Método para obtener todas las reservas de un propietario
   * @param idPropietario - id del propietario
   * @param idTipoUsuario - id del tipo de usuario
   * @returns devuelve todas las reservas de un propietario
   */
  findAllByOwner(idPropietario: number, idTipoUsuario: number): Promise<Reserva[]> {
    let query = `SELECT 
                    reserva.id_reserva AS idReserva, 
                    reserva.id_usuario AS idUsuario,
                    usuario.nombre AS nombreUsuario, 
                    usuario.apellidos AS apellidosUsuario,
                    usuario.id_tipo_usuario AS idTipoUsuario,
                    reserva.id_alojamiento AS idAlojamiento,
                    alojamiento.nombre_alojamiento AS nombreAlojamiento,
                    alojamiento.id_propietario AS idPropietario,
                    reserva.id_habitacion AS idHabitacion,
                    reserva.id_estado_reserva AS idEstadoReserva,
                    habitacion.nombre_habitacion AS nombreHabitacion,
                    estado_reserva.nombre_estado_reserva AS nombreEstadoReserva,
                    reserva.fecha_inicio AS fechaInicio,
                    reserva.fecha_fin AS fechaFin
                FROM 
                    reserva 
                LEFT JOIN 
                    usuario ON reserva.id_usuario = usuario.id_usuario
                LEFT JOIN 
                    alojamiento ON reserva.id_alojamiento = alojamiento.id_alojamiento
                LEFT JOIN
                  habitacion ON reserva.id_habitacion = habitacion.id_habitacion
                LEFT JOIN
                  estado_reserva ON reserva.id_estado_reserva = estado_reserva.id_estado_reserva
                WHERE alojamiento.id_propietario = ${idPropietario}`;

    // Si el usuario es administrador devuelve todas las reservas
    if (idTipoUsuario == 3) {
      query = `SELECT 
                  reserva.id_reserva AS idReserva, 
                  reserva.id_usuario AS idUsuario,
                  usuario.nombre AS nombreUsuario, 
                  usuario.apellidos AS apellidosUsuario,
                  usuario.id_tipo_usuario AS idTipoUsuario,
                  reserva.id_alojamiento AS idAlojamiento,
                  alojamiento.nombre_alojamiento AS nombreAlojamiento,
                  alojamiento.id_propietario AS idPropietario,
                  reserva.id_habitacion AS idHabitacion,
                  habitacion.nombre_habitacion AS nombreHabitacion,
                  estado_reserva.id_estado_reserva AS idEstadoReserva,
                  estado_reserva.nombre_estado_reserva AS nombreEstadoReserva,
                  reserva.fecha_inicio AS fechaInicio,
                  reserva.fecha_fin AS fechaFin
              FROM 
                  reserva 
              LEFT JOIN 
                  usuario ON reserva.id_usuario = usuario.id_usuario
              LEFT JOIN 
                  alojamiento ON reserva.id_alojamiento = alojamiento.id_alojamiento
              LEFT JOIN
                habitacion ON reserva.id_habitacion = habitacion.id_habitacion
              LEFT JOIN
                estado_reserva ON reserva.id_estado_reserva = estado_reserva.id_estado_reserva`;
    }

    return this.reservaRepository.query(query);
  }

  /**
   * Método para obtener todos los estados de las reservas
   * @returns - devuelve todos los estados de las reservas
   */
  findAllStatus(): Promise<EstadoReserva[]> {
    return this.estadoReservaRepository.find();
  }

  /**
   * Método para crear una reserva
   * @param createReservaDto - datos de la reserva
   * @returns devuelve la reserva
   */
  async create(createReservaDto: CreateReservaDto): Promise<Reserva> {
    try {
      // 1- Crea el alojamiento
      const newReservation = this.reservaRepository.create({
        ...createReservaDto,
      });
      
      // 2- Guardar el alojamiento
      await this.reservaRepository.insert(newReservation);

      return newReservation;
    } catch (error) {
      throw new BadRequestException(`Error al crear la habitacion: ${error}`);
    }
  }
}
