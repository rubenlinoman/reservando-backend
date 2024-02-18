import { Body, Controller, Get, Post, UseGuards, Request, Patch, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interfaces/login-response';
import { Usuario } from 'src/shared/entities';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto';
import { PasswordChangeDto } from './dto/passwordChange.dt';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    /**
     * Controlador para iniciar sesión
     * @param loginDto - email y password
     * @returns datos del usuario
     */
    @Post('/login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    /**
     * Controlador para registrar un usuario
     * @param registerDto - email, password, nombre, apellidos
     * @returns devuelve el usuario y el token
     */
    @Post('/register')
    registro(@Body() registerDto: RegisterDto) {
      return this.authService.register(registerDto);
    }

    /**
     * Controlador para obtener el token
     * @param user - email y password
     * @returns devuelve el token
     */
    @UseGuards( AuthGuard )
    @Get('/check-token')
    checkToken( @Request() req: Request ): LoginResponse {
      const user = req['user'] as Usuario;
  
      return {
        user: user,
        token: this.authService.getJwtToken({ email: user.email, usuario: user.usuario }),
      }
    }

    /**
     * Controlador para enviar el mail de cambio de password
     * @param forgotPasswordDto - email y base url
     * @returns devuelve el nombre, apellidos, el email y la url
     */
    @Post('password-recovery')
    passwordRecovery(@Body() forgotPasswordDto: ForgotPasswordDto) {
      return this.authService.forgotPassword(forgotPasswordDto);
    }

    /**
     * Controlador para cambiar la contraseña
     * @param passwordChangeDto - email y password 
     * @returns devuelve el emsil, nombre, apellidos y la url
     */
    @Patch('password-change')
    passwordChange( 
      @Body() passwordChangeDto: PasswordChangeDto
    ) {
      return this.authService.passUpdate(passwordChangeDto);
    }
}
