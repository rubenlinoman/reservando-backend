import { Usuario } from '../../shared/entities/Usuario';
export interface ForgotPasswordMail {
  email: string;
  nombre: string;
  apellidos: string;
  baseUrl: string;
}