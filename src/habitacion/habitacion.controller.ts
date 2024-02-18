import { Controller, Delete, Get, Param } from '@nestjs/common';
import { Habitacion } from 'src/shared/entities';
import { HabitacionService } from './habitacion.service';

@Controller('habitacion')
export class HabitacionController {
  constructor(private readonly habitacionService: HabitacionService) {}

  /**
   * Controlador para obtener todas las habitaciones
   * @returns devuelve un arreglo de habitaciones
   */
  @Get()
  findAll(): Promise<Habitacion[]> {
    return this.habitacionService.findAll();
  }

  /**
   * Controlador para obtener todos los tipos de habitaciones
   * @returns devuelve un arreglo de tipos de habitaciones
   */
  @Get('tipo')
  findAllRoomTypes() {
    return this.habitacionService.findAllRoomTypes();
  }

  /**
   * Controlador para obtener todas las habitaciones de un alojamiento
   * @param idAlojamiento - id del alojamiento (number)
   * @returns devuelve un arreglo de habitaciones
   */
  @Get(':idAlojamiento')
  findAllByAccommodationId(
    @Param('idAlojamiento') idAlojamiento: number,
  ): Promise<Habitacion[]> {
    return this.habitacionService.findAllByAccommodationId(idAlojamiento);
  }

  /**
   * Controlador para eliminar una habitacion
   * @param idHabitacion - Id de la habitacion
   * @returns devuelve la habitacion eliminada
   */
  @Delete(':id')
  removeRoom(@Param('id') idHabitacion: number) {
    return this.habitacionService.removeRoom(idHabitacion);
  }
}
