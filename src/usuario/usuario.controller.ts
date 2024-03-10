import { Body, Controller, Get, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Get()
    findAll() {
      return this.usuarioService.findAll();
    }

    @UseGuards( AuthGuard )
    @Patch()
    actualizar( 
      @Body() updateDto: any
    ) {
      return this.usuarioService.update(updateDto);
    }

    @UseGuards( AuthGuard )
    @Post('imagen')
    @UseInterceptors(FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './public/profile/',
        filename: (req, file, cb) => {
          const codigo = Math.random().toString(32).substring(2) + Date.now().toString(32);
          const extension = '.' + file.originalname.split('.')[file.originalname.split('.').length-1];
          const inicio = file.originalname.split('.')[0];
          const filtrada = inicio.replace(/[^\w]/gi, '');
          const nombre = filtrada + "_" + codigo + extension;
  
          cb(null, `${ nombre }`);
        },
      })
    }))
    subirImagen(@UploadedFile() imagen: Express.Multer.File) {
      return imagen;
    }
}
