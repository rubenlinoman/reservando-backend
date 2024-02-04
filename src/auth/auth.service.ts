
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './interfaces/jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordDto, LoginDto } from './dto';
import { LoginResponse } from './interfaces/login-response';
import { RegisterDto } from './dto';
import { Repository } from 'typeorm';
import { Usuario } from 'src/shared/entities';
import { ForgotPasswordMail } from './interfaces';

import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { MailService } from '../mail/services/mail.service';
import { PasswordChangeDto } from './dto/passwordChange.dt';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
    private mailService: MailService
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
   * Método para enviar el mail de cambio de password
   * @param forgotPasswordDto - email y base url
   * @returns devuelve el mail
   */
  async forgotPassword( forgotPasswordDto: ForgotPasswordDto) {

    const { email, baseUrl } = forgotPasswordDto;

    // 1 - comprobar que el mail existe en la base de datos sino devolver error
    const user = await this.usuarioRepository.findOneBy({ email: email });
    console.log('user', user);
    

    if ( !user ) {
      throw new UnauthorizedException('El mail de usuario no existe');
    }

    // 2- Si existe, obtenemos el codigo de verificacion para devolverlo en el mail
    const { nombre, apellidos } = user;
    const name = nombre;
    const lastName = apellidos;
    const ForgotPasswordMail: ForgotPasswordMail = {
      email: email,
      nombre: name,
      apellidos: lastName,
      baseUrl: baseUrl
    }

    return this.mailService.sendForgotPasswordMail(ForgotPasswordMail);
  }

  /**
   * Método para cambiar la contraseña
   * @param passwordChangeDto - token, email y password
   */
  async passUpdate(passwordChangeDto: PasswordChangeDto) {
    const { token, email, newPassword } = passwordChangeDto;
  
    try {
      // Verificar si el token es válido y no ha expirado
      jwt.verify(token, 'secreto');
  
      // Obtener el usuario correspondiente al email
      const user = await this.usuarioRepository.findOneBy({ email: email });
      // Encriptar la nueva contraseña
      const passEncriptada = bcryptjs.hashSync(newPassword, 10);
  
      if (user) {
        user.password = passEncriptada;
        await this.usuarioRepository.save(user);
      } else {
        throw new NotFoundException('Usuario no encontrado');
      }
    } catch (error) {
      // Manejar el caso en el que el token no es válido o ha expirado
      throw new UnauthorizedException('Token no válido o ha expirado');
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
