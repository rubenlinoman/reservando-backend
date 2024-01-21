import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity("tipo_usuario", { schema: "ReservAndo" })
export class TipoUsuario {
  @PrimaryGeneratedColumn({ type: "int", name: "id_tipo_usuario" })
  idTipoUsuario: number;

  @Column("varchar", { name: "nombre_tipo_usuario", length: 255 })
  nombreTipoUsuario: string;

  @OneToMany(() => Usuario, (usuario) => usuario.idTipoUsuario2)
  usuarios: Usuario[];
}
