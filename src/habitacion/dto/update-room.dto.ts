import { IsOptional, IsString } from 'class-validator';

export class UpdateRoomDTO {
  @IsString()
  idHabitacion: number;

  @IsOptional()
  @IsString()
  nombreHabitacion: string;

  @IsOptional()
  @IsString()
  descripcion: string | null;

  @IsOptional()
  @IsString()
  capacidad: number;

  @IsOptional()
  precio: string | null;

  @IsString()
  @IsOptional()
  enOferta: boolean | null;

  @IsString()
  @IsOptional()
  descuento: number | null;

  @IsOptional()
  imagen: string | null;

  @IsString()
  idTipoHabitacion: number;
}
