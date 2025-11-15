import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Becas } from "./becas";
import { Pagos } from "./pagos";
import { Reservas } from "./reservas";
import { Tickets } from "./tickets";

@Index("personas_pkey", ["id"], { unique: true })
@Entity("personas", { schema: "public" })
export class Personas {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("text", { name: "nombre_completo" })
  nombreCompleto: string;

  @Column("text", { name: "documento", nullable: true })
  documento: string | null;

  @Column("boolean", {
    name: "es_becado",
    nullable: true,
    default: () => "false",
  })
  esBecado: boolean | null;

  @Column("timestamp with time zone", {
    name: "creado_en",
    nullable: true,
    default: () => "now()",
  })
  creadoEn: Date | null;

  @OneToMany(() => Becas, (becas) => becas.persona)
  becas: Becas[];

  @OneToMany(() => Pagos, (pagos) => pagos.persona)
  pagos: Pagos[];

  @OneToMany(() => Reservas, (reservas) => reservas.persona)
  reservas: Reservas[];

  @OneToMany(() => Tickets, (tickets) => tickets.persona)
  tickets: Tickets[];
}
