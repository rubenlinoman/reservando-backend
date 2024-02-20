import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHabitacionDTO {
  @IsNotEmpty()
  @IsString()
  nombreHabitacion: string;

  @IsOptional()
  @IsString()
  descripcion: string | null;

  @IsString()
  capacidad: number;

  @IsNotEmpty()
  @IsString()
  precio: string | null;

  @IsOptional()
  @IsString()
  imagen: string | null;

  @IsString()
  idTipoHabitacion: number;

  @IsString()
  idAlojamiento: number;
}
