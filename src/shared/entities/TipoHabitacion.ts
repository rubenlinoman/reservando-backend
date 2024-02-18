import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Habitacion } from "./Habitacion";

@Entity("tipo_habitacion", { schema: "ReservAndo" })
export class TipoHabitacion {
  @PrimaryGeneratedColumn({ type: "int", name: "id_tipo_habitacion" })
  idTipoHabitacion: number;

  @Column("varchar", { name: "nombre_tipo_habitacion", length: 255 })
  nombreTipoHabitacion: string;

  @OneToMany(() => Habitacion, (habitacion) => habitacion.idTipoHabitacion2)
  habitacions: Habitacion[];
}
