import { Usuario } from "src/shared/entities";


export interface LoginResponse {

    user: Usuario;
    token: string;

}