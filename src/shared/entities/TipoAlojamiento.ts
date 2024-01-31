import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Alojamiento } from "./Alojamiento";

@Entity("tipo_alojamiento", { schema: "ReservAndo" })
export class TipoAlojamiento {
  @PrimaryGeneratedColumn({ type: "int", name: "id_tipo_alojamiento" })
  idTipoAlojamiento: number;

  @Column("varchar", { name: "nombre_tipo_alojamiento", length: 255 })
  nombreTipoAlojamiento: string;

  @OneToMany(() => Alojamiento, (alojamiento) => alojamiento.idTipoAlojamiento2)
  alojamientos: Alojamiento[];
}
