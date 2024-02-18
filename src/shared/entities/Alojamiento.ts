import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TipoAlojamiento } from "./TipoAlojamiento";
import { Usuario } from "./Usuario";
import { Reserva } from "./Reserva";
import { Habitacion } from "./Habitacion";

@Index("id_tipo_alojamiento", ["idTipoAlojamiento"], {})
@Index("id_propietario", ["idPropietario"], {})
@Entity("alojamiento", { schema: "ReservAndo" })
export class Alojamiento {
  @PrimaryGeneratedColumn({ type: "int", name: "id_alojamiento" })
  idAlojamiento: number;

  @Column("varchar", { name: "nombre_alojamiento", length: 255 })
  nombreAlojamiento: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("int", { name: "capacidad" })
  capacidad: number;

  @Column("varchar", { name: "ciudad", nullable: true, length: 255 })
  ciudad: string | null;

  @Column("varchar", { name: "imagen", nullable: true, length: 255 })
  imagen: string | null;

  @Column("int", { name: "id_tipo_alojamiento", nullable: true })
  idTipoAlojamiento: number | null;

  @Column("int", { name: "id_propietario" })
  idPropietario: number;

  @ManyToOne(
    () => TipoAlojamiento,
    (tipoAlojamiento) => tipoAlojamiento.alojamientos,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "id_tipo_alojamiento", referencedColumnName: "idTipoAlojamiento" },
  ])
  idTipoAlojamiento2: TipoAlojamiento;

  @ManyToOne(() => Usuario, (usuario) => usuario.alojamientos, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_propietario", referencedColumnName: "idUsuario" }])
  idPropietario2: Usuario;

  @OneToMany(() => Reserva, (reserva) => reserva.idAlojamiento2)
  reservas: Reserva[];

  @OneToMany(() => Habitacion, (habitacion) => habitacion.idAlojamiento2)
  habitacions: Habitacion[];
}
