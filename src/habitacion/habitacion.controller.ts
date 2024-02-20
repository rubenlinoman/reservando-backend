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
import { Habitacion } from 'src/shared/entities';
import { HabitacionService } from './habitacion.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateHabitacionDTO, UpdateRoomDTO } from './dto';

@Controller('habitacion')
export class HabitacionController {
  constructor(private readonly habitacionService: HabitacionService) {}

  /**
   * Controlador para obtener todas las habitaciones
   * @returns devuelve un arreglo de habitaciones
   */
  @Get()
  findAll(): Promise<Habitacion[]> {
    return this.habitacionService.findAll();
  }

  /**
   * Controlador para obtener una habitacion
   * @param idHabitacion - identificador de la habitacion
   * @returns devuelve la habitacion
   */
  @Get(':idHabitacion')
  findRoomById(
    @Param('idHabitacion') idHabitacion: number,
  ): Promise<Habitacion> {
    return this.habitacionService.findRoomById(idHabitacion);
  }

  /**
   * Controlador para obtener todos los tipos de habitaciones
   * @returns devuelve un arreglo de tipos de habitaciones
   */
  @Get('tipos/todos')
  findAllRoomTypes() {
    return this.habitacionService.findAllRoomTypes();
  }

  /**
   * Controlador para obtener todas las habitaciones de un alojamiento
   * @param idAlojamiento - id del alojamiento (number)
   * @returns devuelve un arreglo de habitaciones
   */
  @Get('alojamiento/:idAlojamiento')
  findAllByAccommodationId(
    @Param('idAlojamiento') idAlojamiento: number,
  ): Promise<Habitacion[]> {
    return this.habitacionService.findAllByAccommodationId(idAlojamiento);
  }

  /**
   * Controlador para crear una habitacion
   * @param createHabitacionDto - datos para crear la habitacion
   * @returns devuelve la habitacion creada
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
    @Body() createAlojamientoDto: CreateHabitacionDTO,
  ): Promise<Habitacion> {
    return this.habitacionService.create(createAlojamientoDto, image);
  }

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
    @Body() updateRoomDto: UpdateRoomDTO,
  ): Promise<Number> {
    return this.habitacionService.updateRoom(
      updateRoomDto,
      image,
    );
  }

  /**
   * Controlador para eliminar una habitacion
   * @param idHabitacion - Id de la habitacion
   * @returns devuelve la habitacion eliminada
   */
  @Delete(':id')
  removeRoom(@Param('id') idHabitacion: number) {
    return this.habitacionService.removeRoom(idHabitacion);
  }
}
