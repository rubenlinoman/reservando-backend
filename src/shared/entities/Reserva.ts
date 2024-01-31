import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuario } from "./Usuario";
import { Habitacion } from "./Habitacion";
import { EstadoAlojamiento } from "./EstadoAlojamiento";

@Index("id_usuario", ["idUsuario"], {})
@Index("id_habitacion", ["idHabitacion"], {})
@Index("id_estado_alojamiento", ["idEstadoAlojamiento"], {})
@Entity("reserva", { schema: "ReservAndo" })
export class Reserva {
  @PrimaryGeneratedColumn({ type: "int", name: "id_reserva" })
  idReserva: number;

  @Column("int", { name: "id_usuario", nullable: true })
  idUsuario: number | null;

  @Column("int", { name: "id_habitacion", nullable: true })
  idHabitacion: number | null;

  @Column("date", { name: "fecha_inicio" })
  fechaInicio: string;

  @Column("date", { name: "fecha_fin" })
  fechaFin: string;

  @Column("int", { name: "id_estado_alojamiento" })
  idEstadoAlojamiento: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.reservas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "idUsuario" }])
  idUsuario2: Usuario;

  @ManyToOne(() => Habitacion, (habitacion) => habitacion.reservas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_habitacion", referencedColumnName: "idHabitacion" }])
  idHabitacion2: Habitacion;

  @ManyToOne(
    () => EstadoAlojamiento,
    (estadoAlojamiento) => estadoAlojamiento.reservas,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    {
      name: "id_estado_alojamiento",
      referencedColumnName: "idEstadoAlojamiento",
    },
  ])
  idEstadoAlojamiento2: EstadoAlojamiento;
}
