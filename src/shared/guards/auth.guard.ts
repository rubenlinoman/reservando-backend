import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../auth/interfaces/jwt-payload';
import { AuthService } from '../../auth/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor (
    private jwtService: JwtService,
    private authService: AuthService
  ) {}
  


  async canActivate( context: ExecutionContext ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('There in no bearer token');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token,
        { secret: process.env.JWT_SECRET }
      );

      const user = await this.authService.findUserByMail( payload.email );

      if ( !user ) {
        throw new UnauthorizedException('User does not exist');
      }
    //   if ( !user.verificada ) {
    //     throw new UnauthorizedException('User is not active');
    //   }
  
      request['user'] = user;
    } catch( error ) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }


}

