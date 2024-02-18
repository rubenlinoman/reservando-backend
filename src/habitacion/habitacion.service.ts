import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Habitacion, TipoHabitacion } from 'src/shared/entities';
import { Repository } from 'typeorm';

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
   * Método para obtener todos los tipos de habitaciones
   * @returns devuelve un arreglo de tipos de habitaciones
   */
  findAllRoomTypes() {
    return this.tipoHabitacionRepository.find();
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
   * Método para borrar una habitacion
   * @param idHabitacion - Id de la habitacion (number)
   * @returns devuelve la habitacion eliminada
   */
  removeRoom(idHabitacion: number) {
    return this.habitacionRepository.delete(idHabitacion);
  }
}
