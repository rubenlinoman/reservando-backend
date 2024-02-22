import { Alojamiento, TipoAlojamiento } from 'src/shared/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateAlojamientoDTO, UpdateAccommodationDTO } from './dto';

@Injectable()
export class AlojamientoService {
  constructor(
    @InjectRepository(Alojamiento)
    private alojamientoRepository: Repository<Alojamiento>,
    @InjectRepository(TipoAlojamiento)
    private tipoAlojamientoRepository: Repository<TipoAlojamiento>,
  ) {}

  /**
   * Metodo para obtener todos los alojamientos
   * @returns devuelve un arreglo de alojamientos
   */
  findAll(): Promise<Alojamiento[]> {
    return this.alojamientoRepository.find();
  }

  /**
   * Método para obtener todos los alojamientos para la home
   * @returns devuelve un arreglo de alojamientos con campos precio y enOferta
   */
  findAllHomePage(): Promise<Alojamiento[]> {
    const query = `SELECT a.id_alojamiento AS idAlojamiento, a.nombre_alojamiento AS nombreAlojamiento, 
    a.descripcion, a.capacidad, a.ciudad, a.imagen, a.id_tipo_alojamiento AS idTipoAlojamiento, a.id_propietario AS idPropietario, 
    h.precio, h.en_oferta AS enOferta FROM alojamiento a LEFT JOIN ( SELECT id_alojamiento, MIN(precio) AS precio, 
    en_oferta FROM habitacion GROUP BY id_alojamiento ) h ON a.id_alojamiento = h.id_alojamiento; `;

    return this.alojamientoRepository.query(query);
  }

  /**
   * Método para obtener todos los tipos de alojamientos
   * @returns devuelve un arreglo de tipos de alojamientos
   */
  findAllTypes(): Promise<TipoAlojamiento[]> {
    return this.tipoAlojamientoRepository.find();
  }

  /**
   * Método para obtener un alojamientoS
   * @param idAlojamiento - identificador del alojamiento
   * @returns devuelve el alojamiento
   */
  findAccommodationById(idAlojamiento: number) {
    return this.alojamientoRepository.findOneBy({
      idAlojamiento: idAlojamiento,
    });
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
    descripcion, capacidad, direccion, ciudad, imagen, id_tipo_alojamiento as idTipoAlojamiento, 
    id_propietario as idPropietario FROM alojamiento WHERE id_propietario = ${idUsuario}`;

    // Si el usuario es administrador devuelve todos los alojamientos
    if (idTipoUsuario == 3) {
      query = `SELECT id_alojamiento as idAlojamiento, nombre_alojamiento as nombreAlojamiento, 
      descripcion, capacidad, direccion, ciudad, imagen, id_tipo_alojamiento as idTipoAlojamiento, 
      id_propietario as idPropietario FROM alojamiento`;
    }

    return this.alojamientoRepository.query(query);
  }

  /**
   * Método para crear un alojamiento
   * @param createAlojamientoDto - parametros para crear el alojamiento
   * @returns devuelve el alojamiento
   */
  async create(
    createAlojamientoDto: CreateAlojamientoDTO,
    image: Express.Multer.File,
  ) {
    try {
      // 1- Crea el alojamiento
      const newAccomodation = this.alojamientoRepository.create({
        ...createAlojamientoDto,
        imagen: image.filename,
      });

      // 2- Guardar el alojamiento
      await this.alojamientoRepository.insert(newAccomodation);

      return newAccomodation;
    } catch (error) {
      throw new BadRequestException(`Error al crear el alojamiento: ${error}`);
    }
  }

  async updateAccommodation(
    updateAccommodationDto: UpdateAccommodationDTO,
    image: Express.Multer.File,
  ) {
    const { idAlojamiento, ...update } = updateAccommodationDto;

    try {
      let newUpdate: any = { ...update };

      // Verificar si se proporciona una nueva imagen
      if (image) {

        // Si hay una nueva imagen, inclúyela en la actualización
        newUpdate = {
          ...newUpdate,
          imagen: image.filename,
        };
      }

      // Actualizar el alojamiento en la base de datos
      const exito = await this.alojamientoRepository.update(
        idAlojamiento,
        newUpdate,
      );

      return exito.affected;
    } catch (error) {
      throw new BadRequestException(
        `Error al actualizar el alojamiento: ${error}`,
      );
    }
  }

  /**
   * Método para borrar un alojamiento
   * @param idAlojamiento - identificador del alojamiento
   * @returns devuelve el alojamiento
   */
  removeAccommodation(idAlojamiento: number) {
    return this.alojamientoRepository.delete(idAlojamiento);
  }
}
