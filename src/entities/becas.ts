import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Personas } from "./personas";
import { DocumentosBeca } from "./documentosBeca";

@Index("becas_pkey", ["id"], { unique: true })
@Entity("becas", { schema: "public" })
export class Becas {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("text", { name: "tipo" })
  tipo: string;

  @Column("text", { name: "estado" })
  estado: string;

  @Column("date", { name: "vigente_desde" })
  vigenteDesde: string;

  @Column("date", { name: "vigente_hasta", nullable: true })
  vigenteHasta: string | null;

  @Column("integer", { name: "cuota_diaria", default: () => "1" })
  cuotaDiaria: number;

  @Column("timestamp with time zone", {
    name: "creado_en",
    nullable: true,
    default: () => "now()",
  })
  creadoEn: Date | null;

  @ManyToOne(() => Personas, (personas) => personas.becas)
  @JoinColumn([{ name: "persona_id", referencedColumnName: "id" }])
  persona: Personas;

  @OneToMany(() => DocumentosBeca, (documentosBeca) => documentosBeca.beca)
  documentosBecas: DocumentosBeca[];
}
