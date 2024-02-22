import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAlojamientoDTO {
  @IsNotEmpty()
  @IsString()
  nombreAlojamiento: string;

  @IsOptional()
  @IsString()
  descripcion: string | null;

  @IsString()
  capacidad: number;

  @IsNotEmpty()
  @IsString()
  direccion: string | null;

  @IsNotEmpty()
  @IsString()
  ciudad: string | null;

  @IsOptional()
  @IsString()
  imagen: string | null;

  @IsString()
  idTipoAlojamiento: number;

  @IsString()
  idPropietario: number;
}
