import { Alojamiento, TipoAlojamiento, Usuario } from 'src/shared/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateAlojamientoDTO } from './dto';

@Injectable()
export class AlojamientoService {
  constructor(
    @InjectRepository(Alojamiento)
    private alojamientoRepository: Repository<Alojamiento>,
    @InjectRepository(TipoAlojamiento)
    private tipoAlojamientoRepository: Repository<TipoAlojamiento>,
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
   * Método para obtener todos los alojamientos de un usuario
   * @param idUsuario identificador del usuario
   * @param idTipoUsuario identificador del tipo de usuario
   * @returns devuelve un arreglo de alojamientos
   */
  async findAllByUserId(
    idUsuario: number,
    idTipoUsuario: number,
  ): Promise<Alojamiento[]> {
    let query = `SELECT id_alojamiento as idAlojamiento, nombre_alojamiento as nombreAlojamiento, 
    descripcion, capacidad, ciudad, imagen, id_tipo_alojamiento as idTipoAlojamiento, 
    id_propietario as idPropietario FROM alojamiento WHERE id_propietario = ${idUsuario}`;

    // Si el usuario es administrador devuelve todos los alojamientos
    if (idTipoUsuario == 3) {
      query = `SELECT id_alojamiento as idAlojamiento, nombre_alojamiento as nombreAlojamiento, 
      descripcion, capacidad, ciudad, imagen, id_tipo_alojamiento as idTipoAlojamiento, 
      id_propietario as idPropietario FROM alojamiento`;
    }

    return this.alojamientoRepository.query(query);
  }

  /**
   * Método para crear un alojamiento
   * @param createAlojamientoDto - parametros para crear el alojamiento
   * @returns devuelve el alojamiento
   */
  async create(createAlojamientoDto: CreateAlojamientoDTO) {
    try {
      // 1- Crea el icono
      const newAccomodation = this.alojamientoRepository.create({
        ...createAlojamientoDto,
      });
      
      // 2- Guardar el icono
      await this.alojamientoRepository.insert(newAccomodation);

      return newAccomodation;

    } catch (error) {
      throw new BadRequestException(`Error al crear el alojamiento: ${error}`);
    }
  }

  /**
   * Método para obtener todos los tipos de alojamientos
   * @returns Todos los tipos de alojamientos
   */
  getAccommodationTypes(): Promise<TipoAlojamiento[]> {
    return this.tipoAlojamientoRepository.find();
  }
}
