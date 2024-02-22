import { IsOptional, IsString } from 'class-validator';

export class UpdateAccommodationDTO {
  @IsString()
  idAlojamiento: number;

  @IsOptional()
  @IsString()
  nombreAlojamiento: string;

  @IsOptional()
  @IsString()
  descripcion: string | null;

  @IsOptional()
  @IsString()
  capacidad: number;

  @IsOptional()
  direccion: string | null;

  @IsOptional()
  ciudad: string | null;

  @IsOptional()
  imagen: string | null;

  @IsString()
  idTipoAlojamiento: number;

  @IsString()
  idPropietario: number;
}
