import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Proveedores } from "./proveedores";
import { ItemsCompra } from "./itemsCompra";
import { MovimientosStock } from "./movimientosStock";

@Index("compras_pkey", ["id"], { unique: true })
@Entity("compras", { schema: "public" })
export class Compras {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("text", { name: "nro_factura", nullable: true })
  nroFactura: string | null;

  @Column("numeric", {
    name: "total",
    precision: 12,
    scale: 2,
    default: () => "0",
  })
  total: string;

  @Column("date", { name: "fecha_compra", default: () => "CURRENT_DATE" })
  fechaCompra: string;

  @Column("timestamp with time zone", {
    name: "creado_en",
    nullable: true,
    default: () => "now()",
  })
  creadoEn: Date | null;

  @ManyToOne(() => Proveedores, (proveedores) => proveedores.compras)
  @JoinColumn([{ name: "proveedor_id", referencedColumnName: "id" }])
  proveedor: Proveedores;

  @OneToMany(() => ItemsCompra, (itemsCompra) => itemsCompra.compra)
  itemsCompras: ItemsCompra[];

  @OneToMany(
    () => MovimientosStock,
    (movimientosStock) => movimientosStock.referenciaCompra
  )
  movimientosStocks: MovimientosStock[];
}
