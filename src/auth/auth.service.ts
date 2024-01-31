import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/shared/entities';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interfaces/login-response';
import { JwtPayload } from './interfaces/jwt-payload';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';


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

    if ( !bcryptjs.compareSync( password, user.password )) {
      throw new UnauthorizedException('Credentials invalid - password');
    }

    const { password: _, ...rest } = user;

    const token = this.getJwtToken({
      email: user.email,
      usuario: user.usuario,
    });

    return {
      user: rest,
      token: token,
    };
  }

  async register(registerDto: RegisterDto): Promise<LoginResponse> {

    console.log('registerDto', registerDto);
    

    const user = await this.crear(registerDto);
    console.log('user', user);
    
    const token = this.getJwtToken({ email: user.email, usuario: user.usuario, });

    console.log('Registro exitoso:', user);

    return {
      user: user,
      token: token,
    };
  }

  async crear(registerDto: RegisterDto) {
    console.log('registerDto', registerDto);
    
    try {
      const { password, ...userData } = registerDto;
      console.log('userData', userData);
      
      const passEncriptada = bcryptjs.hashSync(password, 10);

      console.log('passEncriptada', passEncriptada);
      // 1- Crea el usuario
      const newUser = this.usuarioRepository.create({
        password: passEncriptada,
        ...userData,
      });

      console.log('newUser', newUser);
      
      // 2- Guardar el usuario
      await this.usuarioRepository.insert(newUser);

      // 3- Elimina el Pass para devolverlo en el array
      const { password:_, ...user } = newUser;

      console.log('user', user);
      
      return user;

    } catch (error) {

      if (error.errno === 1062) {
        throw new BadRequestException(`${registerDto.email} ya existe!`);
      }
      throw new BadRequestException('Algo terrible ocurrió :( !');
    }
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
