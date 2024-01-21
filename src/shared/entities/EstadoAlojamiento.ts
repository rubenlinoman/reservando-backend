import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Alojamiento } from "./Alojamiento";
import { Reserva } from "./Reserva";

@Entity("estado_alojamiento", { schema: "ReservAndo" })
export class EstadoAlojamiento {
  @PrimaryGeneratedColumn({ type: "int", name: "id_estado_alojamiento" })
  idEstadoAlojamiento: number;

  @Column("varchar", { name: "nombre_estado_alojamiento", length: 255 })
  nombreEstadoAlojamiento: string;

  @OneToMany(
    () => Alojamiento,
    (alojamiento) => alojamiento.idEstadoAlojamiento2
  )
  alojamientos: Alojamiento[];

  @OneToMany(() => Reserva, (reserva) => reserva.idEstadoAlojamiento2)
  reservas: Reserva[];
}
