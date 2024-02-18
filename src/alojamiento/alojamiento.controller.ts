import { Alojamiento, TipoAlojamiento } from 'src/shared/entities';
import { AlojamientoService } from './alojamiento.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateAlojamientoDTO, UpdateAccommodationDTO } from './dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('alojamiento')
export class AlojamientoController {
  constructor(private readonly alojamientoService: AlojamientoService) {}

  /**
   * Controlador para obtener todos los alojamientos
   * @returns Todos los alojamientos
   */
  @Get()
  findAll(): Promise<Alojamiento[]> {
    return this.alojamientoService.findAll();
  }

  /**
   * Controlador para obtener todos los tipos de alojamientos
   * @returns Todos los tipos de alojamientos
   */
  @Get('tipos')
  finAllTypes(): Promise<TipoAlojamiento[]> {
    return this.alojamientoService.findAllTypes();
  }

  /**
   * Controlador para obtener un alojamiento
   * @param idAlojamiento - identificador del alojamiento
   * @returns devuelve el alojamiento
   */
  @Get(':idAlojamiento')
  findClienteById(@Param('idAlojamiento') idAlojamiento: number): Promise<Alojamiento> {
    return this.alojamientoService.findAccommodationById(idAlojamiento);
  }

  /**
   * Controlador para obtener todos los alojamientos de un usuario
   * @param idUsuario - id del usuario al que pertenece el alojamiento
   * @param idTipoUsuario - id del tipo de usuario
   * @returns devuelve un arreglo de alojamientos
   */
  @Get(':idUsuario/:idTipoUsuario')
  findAllByUserId(
    @Param('idUsuario') idUsuario: number,
    @Param('idTipoUsuario') idTipoUsuario: number,
  ): Promise<Alojamiento[]> {
    return this.alojamientoService.findAllByUserId(idUsuario, idTipoUsuario);
  }

  /**
   * Controlador para crear un alojamiento
   * @param createAlojamientoDto - datos para crear el alojamiento
   * @returns devuelve el alojamiento creado
   */
  @Post()
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './public/images/',
        filename: (req, file, cb) => {
          const codigo =
            Math.random().toString(32).substring(2) + Date.now().toString(32);
          const extension =
            '.' +
            file.originalname.split('.')[
              file.originalname.split('.').length - 1
            ];
          const inicio = file.originalname.split('.')[0];
          const filtrada = inicio.replace(/[^\w]/gi, '');
          const nombre = filtrada + '_' + codigo + extension;

          cb(null, `${nombre}`);
        },
      }),
    }),
  )
  create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createAlojamientoDto: CreateAlojamientoDTO,
  ): Promise<Alojamiento> {
    return this.alojamientoService.create(createAlojamientoDto, image);
  }

  /**
   * Controlador para actualizar un alojamiento
   * @param image - imagen
   * @param updateAccommodationDto - datos para actualizar el alojamiento
   * @returns devuelve el alojamiento actualizado
   */
  @Patch()
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './public/images/', 
        filename: (req, file, cb) => {
          const codigo =
            Math.random().toString(32).substring(2) + Date.now().toString(32);
          const extension =
            '.' +
            file.originalname.split('.')[
              file.originalname.split('.').length - 1
            ];
          const inicio = file.originalname.split('.')[0];
          const filtrada = inicio.replace(/[^\w]/gi, '');
          const nombre = filtrada + '_' + codigo + extension;

          cb(null, `${nombre}`);
        },
      }),
    }),
  )
  updateAccommodation(
    @UploadedFile() image: Express.Multer.File,
    @Body() updateAccommodationDto: UpdateAccommodationDTO,
  ): Promise<Number> {
    return this.alojamientoService.updateAccommodation(
      updateAccommodationDto,
      image,
    );
  }

  /**
   * Controlador para eliminar un alojamiento
   * @param idAlojamiento - Id del alojamiento
   * @returns devuelve el alojamiento eliminado
   */
  @Delete(':id')
  removeAccommodation(@Param('id') idAlojamiento: number) {
    return this.alojamientoService.removeAccommodation(idAlojamiento);
  }
}
