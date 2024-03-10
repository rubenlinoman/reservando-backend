import { BadRequestException, Injectable, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { Usuario } from 'src/shared/entities';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Repository } from 'typeorm';

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
}
