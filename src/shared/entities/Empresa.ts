import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuario } from "./Usuario";

@Index("id_propietario", ["idPropietario"], {})
@Entity("empresa", { schema: "ReservAndo" })
export class Empresa {
  @PrimaryGeneratedColumn({ type: "int", name: "id_empresa" })
  idEmpresa: number;

  @Column("int", { name: "id_propietario" })
  idPropietario: number;

  @Column("varchar", { name: "nombre_empresa", length: 255 })
  nombreEmpresa: string;

  @Column("text", { name: "descripcion_empresa", nullable: true })
  descripcionEmpresa: string | null;

  @ManyToOne(() => Usuario, (usuario) => usuario.empresas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_propietario", referencedColumnName: "idUsuario" }])
  idPropietario2: Usuario;
}
