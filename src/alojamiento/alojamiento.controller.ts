import { Controller, Get, Param } from '@nestjs/common';
import { AlojamientoService } from './alojamiento.service';
import { Alojamiento } from 'src/shared/entities';


@Controller('alojamiento')
export class AlojamientoController {
  constructor(
    private readonly alojamientoService: AlojamientoService
  ) {}

  @Get()
  findAll(): Promise<Alojamiento[]> {
    return this.alojamientoService.findAll();
  }

  @Get(':idUsuario')
  findAllByUserId(@Param('idUsuario') idUsuario: number): Promise<Alojamiento[]> {
    return this.alojamientoService.findAllByUserId(idUsuario);
  }
}
