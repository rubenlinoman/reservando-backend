import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/shared/entities';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interfaces/login-response';
import { JwtPayload } from './interfaces/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Método para obtener el usuario a través de su email
   * @param email - email del usuario (string)
   * @returns devuelve el usuario
   */
  async findUserByMail(email: string): Promise<Usuario> {
    const user = await this.usuarioRepository.findOneBy({ email: email });
    const { password, ...rest } = user;
    return rest;
  }

  /**
   * Método para iniciar sesión
   * @param loginDto - email y password
   * @returns devuelve el token
   */
  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email: email, password: password } = loginDto;

    const user = await this.usuarioRepository.findOneBy({ email: email });

    if (!user) {
      throw new UnauthorizedException('Credentials invalid - email');
    }

    // if ( !bcryptjs.compareSync( password, user.pass )) {
    //   throw new UnauthorizedException('Credentials invalid - password');
    // }

    if (user.password !== password) {
      throw new UnauthorizedException('Credentials invalid - password');
    }

    const { password:_, ...rest } = user;

    const token = this.getJwtToken({
      email: user.email,
      usuario: user.usuario,
    });

    return {
      user: rest,
      token: token,
    };
  }

  /**
   * Método para generar el token
   * @param payload - Credenciales
   * @returns devuelve el token
   */
  getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
