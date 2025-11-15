import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ItemsCompra } from "./itemsCompra";
import { MovimientosStock } from "./movimientosStock";

@Index("insumos_pkey", ["id"], { unique: true })
@Index("insumos_sku_key", ["sku"], { unique: true })
@Entity("insumos", { schema: "public" })
export class Insumos {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("text", { name: "sku", nullable: true, unique: true })
  sku: string | null;

  @Column("text", { name: "nombre" })
  nombre: string;

  @Column("text", { name: "unidad" })
  unidad: string;

  @Column("integer", { name: "vida_util_dias", nullable: true })
  vidaUtilDias: number | null;

  @OneToMany(() => ItemsCompra, (itemsCompra) => itemsCompra.insumo)
  itemsCompras: ItemsCompra[];

  @OneToMany(
    () => MovimientosStock,
    (movimientosStock) => movimientosStock.insumo
  )
  movimientosStocks: MovimientosStock[];
}
