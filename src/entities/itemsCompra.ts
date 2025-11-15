import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Compras } from "./compras";
import { Insumos } from "./insumos";

@Index("idx_items_compra_compra", ["compraId"], {})
@Index("items_compra_pkey", ["id"], { unique: true })
@Index("idx_items_compra_insumo", ["insumoId"], {})
@Entity("items_compra", { schema: "public" })
export class ItemsCompra {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "compra_id" })
  compraId: string;

  @Column("bigint", { name: "insumo_id" })
  insumoId: string;

  @Column("numeric", { name: "cantidad", precision: 14, scale: 3 })
  cantidad: string;

  @Column("numeric", { name: "costo_unitario", precision: 12, scale: 4 })
  costoUnitario: string;

  @Column("date", { name: "vence_el", nullable: true })
  venceEl: string | null;

  @ManyToOne(() => Compras, (compras) => compras.itemsCompras, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "compra_id", referencedColumnName: "id" }])
  compra: Compras;

  @ManyToOne(() => Insumos, (insumos) => insumos.itemsCompras)
  @JoinColumn([{ name: "insumo_id", referencedColumnName: "id" }])
  insumo: Insumos;
}
