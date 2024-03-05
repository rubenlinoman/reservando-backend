import { IsInt, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReservaDto {
  @IsNotEmpty()
  @IsInt()
  idUsuario: number;

  @IsNotEmpty()
  @IsInt()
  idAlojamiento: number;

  @IsNotEmpty()
  @IsInt()
  idHabitacion: number;

  @IsNotEmpty()
  @IsString()
  fechaInicio: string;

  @IsNotEmpty()
  @IsString()
  fechaFin: string;

  @IsNotEmpty()
  @IsInt()
  idEstadoReserva: number;
}
