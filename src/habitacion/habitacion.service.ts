import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Habitacion, TipoHabitacion } from 'src/shared/entities';
import { Repository } from 'typeorm';
import { CreateHabitacionDTO, UpdateRoomDTO } from './dto';

@Injectable()
export class HabitacionService {
  constructor(
    @InjectRepository(Habitacion)
    private habitacionRepository: Repository<Habitacion>,
    @InjectRepository(TipoHabitacion)
    private tipoHabitacionRepository: Repository<TipoHabitacion>,
  ) {}

  /**
   * Método para obtener todas las habitaciones
   * @returns devuelve un arreglo de habitaciones
   */
  findAll(): Promise<Habitacion[]> {
    return this.habitacionRepository.find();
  }

  /**
   * Método para obtener una habitación
   * @param idHabitacion - identificador de la habitación
   * @returns devuelve la habitación
   */
  findRoomById(idHabitacion: number): Promise<Habitacion> {
    return this.habitacionRepository.findOneBy({ idHabitacion: idHabitacion });
  }

  /**
   * Método para obtener todos los tipos de habitaciones
   * @returns devuelve un arreglo de tipos de habitaciones
   */
  findAllRoomTypes() {
    return this.tipoHabitacionRepository.find();
  }

  /**
   * Método para obtener las habitaciones disponibles
   * @param fechaInicio - fecha de inicio
   * @param fechaFin - fecha de fin
   * @param idAlojamiento - identificador del alojamiento
   * @returns devuelve un array de habitaciones
   */
  getAvailableRooms(
    fechaInicio: string,
    fechaFin: string,
    idAlojamiento: number,
  ) {
    const query = `SELECT th.nombre_tipo_habitacion AS nombreTipoHabitacion, 
      th.id_tipo_habitacion AS idTipoHabitacion,
      COUNT(*) AS cantidadDisponible, h.precio, h.capacidad
      FROM 
          habitacion h
      JOIN 
          tipo_habitacion th ON h.id_tipo_habitacion = th.id_tipo_habitacion
      LEFT JOIN 
          reserva r ON h.id_habitacion = r.id_habitacion
                  AND (
                      '${fechaInicio}' BETWEEN r.fecha_inicio AND r.fecha_fin
                      OR '${fechaFin}' BETWEEN r.fecha_inicio AND r.fecha_fin
                  )
      WHERE 
          h.id_alojamiento = ${idAlojamiento}
          AND r.id_reserva IS NULL
          OR r.id_estado_reserva = 3
      GROUP BY 
          nombreTipoHabitacion, 
          th.nombre_tipo_habitacion, 
          h.precio, 
          h.capacidad;`;

    return this.habitacionRepository.query(query);
  }

  /**
   * Método para obtener las habitaciones disponibles por tipo y alojamiento
   * @param fechaInicio - fecha de inicio
   * @param fechaFin - fecha de fin
   * @param idAlojamiento - identificador del alojamiento
   * @param idTipoHabitacion - identificador del tipo de habitacion
   * @returns devuelve un array de habitaciones
   */
  getAvailableRoomsByAccommodationAndRoomType(
    fechaInicio: string,
    fechaFin: string,
    idAlojamiento: number,
    idTipoHabitacion: number,
  ) {
    const query = `SELECT h.id_habitacion AS idHabitacion, h.nombre_habitacion AS nombreHabitacion,
    h.precio, h.capacidad FROM habitacion h JOIN tipo_habitacion th ON h.id_tipo_habitacion = th.id_tipo_habitacion LEFT JOIN reserva r 
    ON h.id_habitacion = r.id_habitacion AND ('${fechaInicio}' 
    BETWEEN r.fecha_inicio AND r.fecha_fin OR '${fechaFin}' 
    BETWEEN r.fecha_inicio AND r.fecha_fin) WHERE h.id_alojamiento = ${idAlojamiento} 
    AND h.id_tipo_habitacion = ${idTipoHabitacion} AND r.id_reserva IS NULL`;
    return this.habitacionRepository.query(query);
  }

  /**
   * Método para obtener todas las habitaciones de un alojamiento
   * @param idAlojamiento - id del alojamiento (number)
   * @returns devuelve un arreglo de habitaciones
   */
  findAllByAccommodationId(idAlojamiento: number): Promise<Habitacion[]> {
    return this.habitacionRepository.findBy({ idAlojamiento: idAlojamiento });
  }

  /**
   * Método para crear una habitacion
   * @param createHabitacionDto - datos para crear la habitacion
   * @param image - imagen
   * @returns  devuelve la habitacion creada
   */
  async create(
    createHabitacionDto: CreateHabitacionDTO,
    image: Express.Multer.File,
  ) {
    try {
      // 1- Crea el alojamiento
      const newRoom = this.habitacionRepository.create({
        ...createHabitacionDto,
        imagen: image.filename,
      });

      // 2- Guardar el alojamiento
      await this.habitacionRepository.insert(newRoom);

      return newRoom;
    } catch (error) {
      throw new BadRequestException(`Error al crear la habitacion: ${error}`);
    }
  }

  /**
   * Método para actualizar una habitacion
   * @param updateRoomnDto - parametros para actualizar la habitacion
   * @param image - imagen
   * @returns devuelve el numero de filas afectadas
   */
  async updateRoom(updateRoomnDto: UpdateRoomDTO, image: Express.Multer.File) {
    const { idHabitacion, ...update } = updateRoomnDto;

    try {
      let newUpdate: any = { ...update };

      // Verificar si se proporciona una nueva imagen
      if (image) {
        // Si hay una nueva imagen, inclúyela en la actualización
        newUpdate = {
          ...newUpdate,
          imagen: image.filename,
        };
      }

      // Actualizar el alojamiento en la base de datos
      const exito = await this.habitacionRepository.update(
        idHabitacion,
        newUpdate,
      );

      return exito.affected;
    } catch (error) {
      throw new BadRequestException(
        `Error al actualizar la habitación: ${error}`,
      );
    }
  }

  /**
   * Método para borrar una habitacion
   * @param idHabitacion - Id de la habitacion (number)
   * @returns devuelve la habitacion eliminada
   */
  removeRoom(idHabitacion: number) {
    return this.habitacionRepository.delete(idHabitacion);
  }
}
