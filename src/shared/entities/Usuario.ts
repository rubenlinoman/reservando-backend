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

@Index("id_tipo_usuario", ["idTipoUsuario"], {})
@Entity("usuario", { schema: "ReservAndo" })
export class Usuario {
  @PrimaryGeneratedColumn({ type: "int", name: "id_usuario" })
  idUsuario: number;

  @Column("varchar", { name: "usuario", length: 255 })
  usuario: string;

  @Column("varchar", { name: "nombre", nullable: true, length: 255 })
  nombre: string | null;

  @Column("varchar", { name: "apellidos", nullable: true, length: 255 })
  apellidos: string | null;

  @Column("varchar", { name: "email", length: 255 })
  email: string;

  @Column("varchar", { name: "password", length: 255 })
  password?: string;

  @Column("varchar", { name: "imagen", nullable: true, length: 255 })
  imagen: string | null;

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
}
