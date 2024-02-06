import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reserva } from "./Reserva";

@Entity("estado_reserva", { schema: "ReservAndo" })
export class EstadoReserva {
  @PrimaryGeneratedColumn({ type: "int", name: "id_estado_reserva" })
  idEstadoReserva: number;

  @Column("varchar", { name: "nombre_estado_reserva", length: 255 })
  nombreEstadoReserva: string;

  @OneToMany(() => Reserva, (reserva) => reserva.idEstadoReserva2)
  reservas: Reserva[];
}
