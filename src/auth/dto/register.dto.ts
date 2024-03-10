// register.dto.ts

import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsInt, IsIn } from 'class-validator';

export class RegisterDto {

  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  apellidos: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsInt()
  @IsIn([1, 2, 3, 4], { message: 'Tipo de usuario inválido' })
  idTipoUsuario: number;
}
