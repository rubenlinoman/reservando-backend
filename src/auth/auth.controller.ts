import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interfaces/login-response';
import { Usuario } from 'src/shared/entities';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('/login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
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
}
