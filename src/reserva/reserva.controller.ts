import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { EstadoReserva, Reserva } from 'src/shared/entities';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservationDTO } from './dto';

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
   * Controlador para obtener todos los estados de las reservas
   * @returns devuelve todos los estados de las reservas
   */
  @Get('estados')
  findAllStatus(): Promise<EstadoReserva[]> {
    return this.reservaService.findAllStatus();
  }

  /**
   * Controlador para obtener una reserva a partir de su id
   * @param idReserva - id de la reserva
   * @returns devuelve la reserva
   */
  @Get(':idReserva')
  findReservationById(@Param('idReserva') idReserva: number): Promise<Reserva> {
    return this.reservaService.findReservationById(idReserva);
  }

  /**
   * Controlador para obtener todas las reservas de un propietario
   * @param idPropietario - id del propietario
   * @param idTipoUsuario - id del tipo de usuario
   * @returns devuelve todas las reservas de un propietario
   */
  @Get('propietario/:idPropietario/:idTipoUsuario')
  findAllByOwner(
    @Param('idPropietario') idPropietario: number,
    @Param('idTipoUsuario') idTipoUsuario: number,
  ): Promise<Reserva[]> {
    return this.reservaService.findAllByOwner(idPropietario, idTipoUsuario);
  }

  /**
   * Controlador para obtener todas las reservas de un usuario (cliente)
   * @param idUsuario - id del usuario
   * @returns devuelve todas las reservas de un usuario
   */
  @Get('usuario/:idUsuario')
  findAllByUserId(@Param('idUsuario') idUsuario: number): Promise<Reserva[]> {
    return this.reservaService.findAllByUserId(idUsuario);
  }

  @Post()
  create(@Body() createReservaDto: CreateReservaDto): Promise<Reserva> {
    return this.reservaService.create(createReservaDto);
  }

  @Patch()
  async editReservation(@Body() updateReservaDto: UpdateReservationDTO): Promise<Number> {
    console.log('updateReservaDto', updateReservaDto);
    
    return this.reservaService.editReservation(updateReservaDto);
  }
}
