import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interfaces/login-response';
import { Usuario } from 'src/shared/entities';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('/login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('/register')
    registro(@Body() registerDto: RegisterDto) {
      return this.authService.register(registerDto);
    }

    @UseGuards( AuthGuard )
    @Get('/check-token')
    checkToken( @Request() req: Request ): LoginResponse {
      const user = req['user'] as Usuario;
  
      return {
        user: user,
        token: this.authService.getJwtToken({ email: user.email, usuario: user.usuario }),
      }
    }

    @Post('password-recovery')
    passwordRecovery(@Body() forgotPasswordDto: ForgotPasswordDto) {
      return this.authService.forgotPassword(forgotPasswordDto);
    }
    

}
