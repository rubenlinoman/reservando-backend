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

  @Column('varchar', { name: 'usuario', length: 255 })
  usuario: string;

  @Column('varchar', { name: 'nombre', length: 255, nullable: true })
  nombre: string | null;

  @Column('varchar', { name: 'apellidos', length: 255, nullable: true })
  apellidos: string | null;

  @Column('varchar', { name: 'email', length: 255 })
  email: string;

  @Column('varchar', { name: 'password', length: 255 })
  password?: string;

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
