import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Personas } from "./personas";
import { Tickets } from "./tickets";

@Index("idx_pagos_estado", ["estado"], {})
@Index("pagos_pkey", ["id"], { unique: true })
@Index("idx_pagos_persona", ["personaId"], {})
@Entity("pagos", { schema: "public" })
export class Pagos {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "persona_id" })
  personaId: string;

  @Column("numeric", { name: "monto", precision: 12, scale: 2 })
  monto: string;

  @Column("text", { name: "moneda", default: () => "'BOB'" })
  moneda: string;

  @Column("text", { name: "proveedor", nullable: true })
  proveedor: string | null;

  @Column("text", { name: "referencia", nullable: true })
  referencia: string | null;

  @Column("enum", {
    name: "estado",
    enum: ["PENDIENTE", "APROBADO", "RECHAZADO", "ANULADO"],
    default: () => "'PENDIENTE'",
  })
  estado: "PENDIENTE" | "APROBADO" | "RECHAZADO" | "ANULADO";

  @Column("timestamp with time zone", {
    name: "creado_en",
    nullable: true,
    default: () => "now()",
  })
  creadoEn: Date | null;

  @Column("timestamp with time zone", { name: "aprobado_en", nullable: true })
  aprobadoEn: Date | null;

  @ManyToOne(() => Personas, (personas) => personas.pagos)
  @JoinColumn([{ name: "persona_id", referencedColumnName: "id" }])
  persona: Personas;

  @ManyToOne(() => Tickets, (tickets) => tickets.pagos)
  @JoinColumn([{ name: "ticket_id", referencedColumnName: "id" }])
  ticket: Tickets;
}
