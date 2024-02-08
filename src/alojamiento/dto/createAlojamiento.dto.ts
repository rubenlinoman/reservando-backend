import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAlojamientoDTO {
  @IsNotEmpty()
  @IsString()
  nombreAlojamiento: string;

  @IsOptional()
  @IsString()
  descripcion: string | null;

  @IsInt()
  capacidad: number;

  @IsNotEmpty()
  @IsString()
  ciudad: string | null;

  @IsOptional()
  @IsString()
  imagen: string | null;

  @IsInt()
  tipoAlojamiento: number;

  @IsInt()
  idPropietario: number;
}
