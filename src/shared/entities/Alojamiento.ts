import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuario } from "./Usuario";
import { EstadoAlojamiento } from "./EstadoAlojamiento";
import { Reserva } from "./Reserva";

@Index("id_propietario", ["idPropietario"], {})
@Index("id_estado_alojamiento", ["idEstadoAlojamiento"], {})
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

  @Column("int", { name: "id_propietario" })
  idPropietario: number;

  @Column("int", { name: "id_estado_alojamiento" })
  idEstadoAlojamiento: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.alojamientos, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_propietario", referencedColumnName: "idUsuario" }])
  idPropietario2: Usuario;

  @ManyToOne(
    () => EstadoAlojamiento,
    (estadoAlojamiento) => estadoAlojamiento.alojamientos,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    {
      name: "id_estado_alojamiento",
      referencedColumnName: "idEstadoAlojamiento",
    },
  ])
  idEstadoAlojamiento2: EstadoAlojamiento;

  @OneToMany(() => Reserva, (reserva) => reserva.idAlojamiento2)
  reservas: Reserva[];
}
