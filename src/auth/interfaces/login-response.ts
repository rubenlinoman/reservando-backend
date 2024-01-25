import { Usuario } from "src/shared/entities";


export interface LoginResponse {

    usuario: Usuario;
    token: string;

}