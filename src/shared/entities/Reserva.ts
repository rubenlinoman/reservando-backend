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
import { EstadoReserva } from "./EstadoReserva";
import { Alojamiento } from "./Alojamiento"; // Importa la entidad Alojamiento si aún no lo has hecho

@Index("id_usuario", ["idUsuario"], {})
@Index("id_habitacion", ["idHabitacion"], {})
@Index("id_estado_reserva", ["idEstadoReserva"], {})
@Entity("reserva", { schema: "ReservAndo" })
export class Reserva {
  @PrimaryGeneratedColumn({ type: "int", name: "id_reserva" })
  idReserva: number;

  @Column("int", { name: "id_usuario", nullable: true })
  idUsuario: number | null;

  @Column("int", { name: "id_alojamiento", nullable: true }) // Agregado id_alojamiento
  idAlojamiento: number | null; // Agregado id_alojamiento

  @Column("int", { name: "id_habitacion", nullable: true })
  idHabitacion: number | null;

  @Column("date", { name: "fecha_inicio" })
  fechaInicio: string;

  @Column("date", { name: "fecha_fin" })
  fechaFin: string;

  @Column("int", { name: "id_estado_reserva" })
  idEstadoReserva: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.reservas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "idUsuario" }])
  idUsuario2: Usuario;

  @ManyToOne(() => Alojamiento, (alojamiento) => alojamiento.reservas, { // Relación con Alojamiento
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_alojamiento", referencedColumnName: "idAlojamiento" }]) // Relación con Alojamiento
  idAlojamiento2: Alojamiento; // Relación con Alojamiento

  @ManyToOne(() => Habitacion, (habitacion) => habitacion.reservas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_habitacion", referencedColumnName: "idHabitacion" }])
  idHabitacion2: Habitacion;

  @ManyToOne(() => EstadoReserva, (estadoReserva) => estadoReserva.reservas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([
    { name: "id_estado_reserva", referencedColumnName: "idEstadoReserva" },
  ])
  idEstadoReserva2: EstadoReserva;
}
