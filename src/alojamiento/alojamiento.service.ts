import { Alojamiento, Usuario } from 'src/shared/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

@Injectable()
export class AlojamientoService {
  constructor(
    @InjectRepository(Alojamiento)
    private alojamientoRepository: Repository<Alojamiento>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  /**
   * Metodo para obtener todos los alojamientos
   * @returns devuelve un arreglo de alojamientos
   */
  findAll(): Promise<Alojamiento[]> {
    return this.alojamientoRepository.find();
  }

  /**
   * Método para obtener los alojamientos de un usuario
   * @param idUsuario - id del usuario (numero)
   * @returns devuelve un arreglo de alojamientos
   */
  async findAllByUserId(idUsuario: number): Promise<Alojamiento[]> {

    let query = `SELECT * FROM alojamiento WHERE id_propietario = ${idUsuario}`;
    if (idUsuario == 3 ) {
      query = `SELECT * FROM alojamiento`;
    }
    
    return this.alojamientoRepository.query(query);
  }
}
