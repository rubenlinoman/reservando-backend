// password-change.dto.ts
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PasswordChangeDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassword: string;
}
