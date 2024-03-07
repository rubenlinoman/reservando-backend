import { IsOptional, IsNumber, IsDateString, IsInt, IsString } from 'class-validator';

export class UpdateReservationDTO {
  @IsInt()
  idReserva: number;

  @IsOptional()
  @IsString()
  fechaInicio: string;

  @IsOptional()
  @IsString()
  fechaFin: string;

  @IsInt()
  idEstadoReserva: number;
}
