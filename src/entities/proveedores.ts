import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Compras } from "./compras";

@Index("proveedores_pkey", ["id"], { unique: true })
@Entity("proveedores", { schema: "public" })
export class Proveedores {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("text", { name: "nombre" })
  nombre: string;

  @Column("text", { name: "nit", nullable: true })
  nit: string | null;

  @Column("text", { name: "contacto", nullable: true })
  contacto: string | null;

  @OneToMany(() => Compras, (compras) => compras.proveedor)
  compras: Compras[];
}
