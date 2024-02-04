import { ForgotPasswordDto } from 'src/auth/dto/forgot-password.dto';
// import { Usuario } from 'src/shared/entities';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ForgotPasswordMail } from 'src/auth/interfaces';
import { Usuario } from 'src/shared/entities/Usuario';
import { join } from 'path';

@Injectable()
export class MailService {
  private urlWeb = process.env.URL_WEB;

  constructor(private mailerService: MailerService) {}

  //async sendUserConfirmation(user: Usuario, token: string) {
  async sendRegisterMail(user: Usuario, token: string) {
    const url = `${this.urlWeb}/auth/confirm?token=${token}`;
    const template = 'registro';
    let subject = 'Bienvenido a ReservAndo';

    try {
      const respuesta = await this.mailerService.sendMail({
        to: user.email,
        from: '"Support Team" <support@reservando.com>', // override default from
        subject: subject,
        template: template,
        context: {
          name: user.nombre + ' ' + user.apellidos,
          Mail: user.email,
        },
      });

      return respuesta;
    } catch (error) {
      return false;
    }
  }

  /**
   * Método para enviar correo de restablecimiento de contraseña
   * @param forgotPassword - parametros de correo
   * @returns devuelve la respuesta
   */
  async sendForgotPasswordMail(forgotPassword: ForgotPasswordMail) {
    const url = `${forgotPassword.baseUrl}`;

    // Usar el nombre del archivo de la plantilla
    const template = 'forgot-password';

    let subject = 'Petición de cambio de contraseña en ReservAndo';

    try {
      // Código que envía el correo electrónico
      const respuesta = await this.mailerService.sendMail({
        to: forgotPassword.email,
        from: '"Support Team" <support@reservando.com>',
        subject: subject,
        template: template, // Usar el nombre del archivo de la plantilla
        context: {
          name: forgotPassword.nombre + ' ' + forgotPassword.apellidos,
          url: url,
          Mail: forgotPassword.email,
        },
      });
      console.log('respuesta', respuesta);

      return respuesta;
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      throw new InternalServerErrorException('Error al enviar el correo electrónico');
    }
  }
}
