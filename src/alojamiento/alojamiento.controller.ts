import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AlojamientoService } from './alojamiento.service';
import { Alojamiento, TipoAlojamiento } from 'src/shared/entities';
import { CreateAlojamientoDTO } from './dto';

@Controller('alojamiento')
export class AlojamientoController {
  constructor(private readonly alojamientoService: AlojamientoService) {}

  /**
   * Método para obtener todos los alojamientos
   * @returns Todos los alojamientos
   */
  @Get()
  findAll(): Promise<Alojamiento[]> {
    return this.alojamientoService.findAll();
  }

  /**
   * Método para obtener todos los alojamientos de un usuario
   * @param idUsuario - id del usuario al que pertenece el alojamiento
   * @param idTipoUsuario - id del tipo de usuario
   * @returns devuelve un arreglo de alojamientos
   */
  @Get(':idUsuario/:idTipoUsuario')
  findAllByUserId(
    @Param('idUsuario') idUsuario: number,
    @Param('idTipoUsuario') idTipoUsuario: number,
  ): Promise<Alojamiento[]> {
    return this.alojamientoService.findAllByUserId(idUsuario, idTipoUsuario);
  }

  /**
   * Método para crear un alojamiento
   * @param createAlojamientoDto - datos para crear el alojamiento
   * @returns 
   */
  @Post()
  create(@Body() createAlojamientoDto: CreateAlojamientoDTO) {
    return this.alojamientoService.create(createAlojamientoDto);
  }

  /**
   * Método para obtener todos los tipos de alojamientos
   * @returns Todos los tipos de alojamientos
   */
  @Get('tipos')
  getAccommodationTypes(): Promise<TipoAlojamiento[]> {
    return this.alojamientoService.getAccommodationTypes();
  }
}
