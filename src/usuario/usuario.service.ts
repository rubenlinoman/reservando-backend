import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/shared/entities';
import { Repository } from 'typeorm';
import { ResetPasswordDto } from './dto/reset-password.dto';

import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  /**
   * Funcion para obtener todos los usuarios
   * @returns Todos los usuarios
   */
  findAll() {
    return this.usuarioRepository.find();
  }

  findUserById(idUsuario: number): Promise<Usuario> {    
    return this.usuarioRepository.findOneBy({ idUsuario: idUsuario });
  }

  /**
   * Método para actualizar un usuario
   * @param actualizarDto - DTO para actualizar
   * @returns - Cantidad de filas afectadas
   */
  async update( actualizarDto: any ) {

    const { idUsuario, ...actualizar } = actualizarDto;
    
    try {
      
      const exito = await this.usuarioRepository.update(idUsuario, { ...actualizar })

      return exito.affected;

    } catch(error) {
      throw new BadRequestException(`Error al actualizar el usuario :( !`)
    }
  }

  /**
   * Método para cambiar la contraseña
   * @param resetPasswordDto - email y password
   */
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email, newPassword } = resetPasswordDto;
    
    try {
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
   * Método para cambiar la contraseña
   * @param actualizarDto - DTO para actualizar
   * @returns devuelve la cantidad de filas afectadas
   */
  async actualizarPass( actualizarDto: any ) {

    const { idUsuario, email, password } = actualizarDto;

    const passEncriptada = bcryptjs.hashSync( password, 10);

    try {
      
      const exito = await this.usuarioRepository.update(idUsuario, { password: passEncriptada })

      return exito.affected;

    } catch(error) {
      throw new BadRequestException(`Algo terrible ha sucedido :( !`)
    }
    
  }

  /**
   * Método para eliminar un usuario
   * @param idUsuario - id del usuario
   * @returns devuelve el usuario eliminado
   */
  removeUser(idUsuario: number) {
    return this.usuarioRepository.delete(idUsuario);
  }
}
