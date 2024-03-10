import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoReserva, Reserva } from 'src/shared/entities';
import { Repository } from 'typeorm';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservationDTO } from './dto';
import { MailService } from 'src/mail/services/mail.service';
import { AuthService } from 'src/auth/auth.service';
import { AlojamientoService } from 'src/alojamiento/alojamiento.service';
import { HabitacionService } from 'src/habitacion/habitacion.service';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,
    @InjectRepository(EstadoReserva)
    private estadoReservaRepository: Repository<EstadoReserva>,
    private mailService: MailService,
    private authService: AuthService,
    private alojamientoService: AlojamientoService,
    private habitacionService: HabitacionService,
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
  findAllByOwner(
    idPropietario: number,
    idTipoUsuario: number,
  ): Promise<Reserva[]> {
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
   * Método para obtener una reserva a partir de su id
   * @param idReserva - id de la reserva
   * @returns devuelve la reserva
   */
  findReservationById(idReserva: number): Promise<Reserva> {
    return this.reservaRepository.findOneBy({ idReserva: idReserva });
  }

  /**
   * Método que obtiene todas las reservas de un usuario (cliente)
   * @param idUsuario - id del usuario
   * @returns devuelve todas las reservas de un usuario
   */
  findAllByUserId(idUsuario: number): Promise<Reserva[]> {
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
                  WHERE reserva.id_usuario = ${idUsuario}`;

    return this.reservaRepository.query(query);
  }

  /**
   * Método para crear una reserva
   * @param createReservaDto - datos de la reserva
   * @returns devuelve la reserva
   */
  async create(createReservaDto: CreateReservaDto): Promise<Reserva> {
    try {
      const user = this.authService.findUserById(createReservaDto.idUsuario);
      const reservation = this.findReservationById(createReservaDto.idUsuario);
      const accommodation = this.alojamientoService.findAccommodationById(
        createReservaDto.idAlojamiento,
      );

      // Verificar si ya existe una reserva para la habitación en las fechas especificadas
      const reservaExistente = await this.existeReservaEnFecha(
        createReservaDto.idHabitacion,
        createReservaDto.fechaInicio,
        createReservaDto.fechaFin,
      );

      if (reservaExistente) {
        throw new Error(
          'Ya existe una reserva para esta habitación en las fechas especificadas.',
        );
      }
      // 1- Crea el alojamiento
      const newReservation = this.reservaRepository.create({
        ...createReservaDto,
      });

      // 2- Guardar el alojamiento
      await this.reservaRepository.insert(newReservation);

      // Enviar el correo electrónico de confirmación de reserva
      await this.mailService.sendBookingConfirmationMail(
        (await user).email,
        (await user).nombre,
        (await user).apellidos,
        (await accommodation).nombreAlojamiento,
        (await accommodation).ciudad,
        newReservation.fechaInicio, // Utilizamos la fecha de inicio de la nueva reserva
        (await accommodation).direccion,
      );

      return newReservation;
    } catch (error) {
      throw new BadRequestException(`Error al crear la habitacion: ${error}`);
    }
  }

  /**
   * Método para editar una reserva
   * @param updateReservaDto - datos de la reserva
   * @returns devuelve affected
   */
  async editReservation(updateReservaDto: UpdateReservationDTO) {
    const { idReserva, ...update } = updateReservaDto;
    try {
      let newUpdate: any = { ...update };

      // Actualizar el alojamiento en la base de datos
      const exito = await this.reservaRepository.update(idReserva, newUpdate);

      return exito.affected;
    } catch (error) {
      throw new BadRequestException(`Error al actualizar la reserva: ${error}`);
    }
  }

  async existeReservaEnFecha(
    idHabitacion: number,
    fechaInicio: string,
    fechaFin: string,
  ): Promise<boolean> {
    const reserva = await this.reservaRepository.findOne({
      where: {
        idHabitacion: idHabitacion,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
      },
    });
    return !!reserva; // Devuelve true si la reserva existe, false en caso contrario
  }
}
