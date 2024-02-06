import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reserva } from "./Reserva";
import { Alojamiento } from "./Alojamiento";

@Index("id_alojamiento", ["idAlojamiento"], {})
@Entity("habitacion", { schema: "ReservAndo" })
export class Habitacion {
  @PrimaryGeneratedColumn({ type: "int", name: "id_habitacion" })
  idHabitacion: number;

  @Column("varchar", { name: "nombre_habitacion", length: 255 })
  nombreHabitacion: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("int", { name: "capacidad" })
  capacidad: number;

  @Column("decimal", { name: "precio", precision: 10, scale: 2 })
  precio: string;

  @Column("tinyint", {
    name: "en_oferta",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  enOferta: boolean | null;

  @Column("decimal", {
    name: "descuento",
    nullable: true,
    precision: 5,
    scale: 2,
    default: () => "'0.00'",
  })
  descuento: string | null;

  @Column("varchar", { name: "imagen", nullable: true, length: 255 })
  imagen: string | null;

  @Column("int", { name: "id_alojamiento", nullable: true })
  idAlojamiento: number | null;

  @OneToMany(() => Reserva, (reserva) => reserva.idHabitacion2)
  reservas: Reserva[];

  @ManyToOne(() => Alojamiento, (alojamiento) => alojamiento.habitacions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([
    { name: "id_alojamiento", referencedColumnName: "idAlojamiento" },
  ])
  idAlojamiento2: Alojamiento;
}
