import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Alojamiento } from "./Alojamiento";
import { TipoUsuario } from "./TipoUsuario";
import { Reserva } from "./Reserva";
import { Empresa } from "./Empresa";

@Index("id_tipo_usuario", ["idTipoUsuario"], {})
@Entity("usuario", { schema: "ReservAndo" })
export class Usuario {
  @PrimaryGeneratedColumn({ type: "int", name: "id_usuario" })
  idUsuario: number;

  @Column("varchar", { name: "nombre_usuario", length: 255 })
  nombreUsuario: string;

  @Column("varchar", { name: "correo_electronico", length: 255 })
  correoElectronico: string;

  @Column("varchar", { name: "contrasena", length: 255 })
  contrasena: string;

  @Column("int", { name: "id_tipo_usuario" })
  idTipoUsuario: number;

  @OneToMany(() => Alojamiento, (alojamiento) => alojamiento.idPropietario2)
  alojamientos: Alojamiento[];

  @ManyToOne(() => TipoUsuario, (tipoUsuario) => tipoUsuario.usuarios, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([
    { name: "id_tipo_usuario", referencedColumnName: "idTipoUsuario" },
  ])
  idTipoUsuario2: TipoUsuario;

  @OneToMany(() => Reserva, (reserva) => reserva.idUsuario2)
  reservas: Reserva[];

  @OneToMany(() => Empresa, (empresa) => empresa.idPropietario2)
  empresas: Empresa[];
}
