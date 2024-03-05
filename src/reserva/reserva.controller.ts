import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { EstadoReserva, Reserva } from 'src/shared/entities';
import { CreateReservaDto } from './dto/create-reserva.dto';

@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  /**
   * Método para obtener todas las reservas
   * @returns Todas las reservas
   */
  @Get()
  findAll(): Promise<Reserva[]> {
    return this.reservaService.findAll();
  }

  /**
   * Controlador para obtener todas las reservas de un propietario
   * @param idPropietario - id del propietario
   * @param idTipoUsuario - id del tipo de usuario
   * @returns devuelve todas las reservas de un propietario
   */
  @Get(':idPropietario/:idTipoUsuario')
  findAllByOwner(
    @Param('idPropietario') idPropietario: number,
    @Param('idTipoUsuario') idTipoUsuario: number,
  ): Promise<Reserva[]> {
    return this.reservaService.findAllByOwner(idPropietario, idTipoUsuario);
  }

  /**
   * Controlador para obtener todos los estados de las reservas
   * @returns devuelve todos los estados de las reservas
   */
  @Get('estados')
  findAllStatus(): Promise<EstadoReserva[]> {
    return this.reservaService.findAllStatus();
  }

  @Post()
  create(@Body() createReservaDto: CreateReservaDto): Promise<Reserva> { 
    return this.reservaService.create(createReservaDto);
  }
}
