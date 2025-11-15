import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Becas } from "./becas";

@Index("documentos_beca_pkey", ["id"], { unique: true })
@Entity("documentos_beca", { schema: "public" })
export class DocumentosBeca {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("text", { name: "nombre_archivo" })
  nombreArchivo: string;

  @Column("text", { name: "tipo_mime" })
  tipoMime: string;

  @Column("text", { name: "url_almacenamiento" })
  urlAlmacenamiento: string;

  @Column("bytea", { name: "hash_archivo" })
  hashArchivo: Buffer;

  @Column("timestamp with time zone", {
    name: "subido_en",
    nullable: true,
    default: () => "now()",
  })
  subidoEn: Date | null;

  @ManyToOne(() => Becas, (becas) => becas.documentosBecas, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "beca_id", referencedColumnName: "id" }])
  beca: Becas;
}
