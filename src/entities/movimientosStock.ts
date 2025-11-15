import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Insumos } from "./insumos";
import { Compras } from "./compras";
import { Tickets } from "./tickets";

@Index("movimientos_stock_pkey", ["id"], { unique: true })
@Index("idx_mov_stock_insumo", ["insumoId"], {})
@Index("idx_mov_stock_tipo", ["tipo"], {})
@Entity("movimientos_stock", { schema: "public" })
export class MovimientosStock {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "insumo_id" })
  insumoId: string;

  @Column("enum", { name: "tipo", enum: ["ENTRADA", "SALIDA", "AJUSTE"] })
  tipo: "ENTRADA" | "SALIDA" | "AJUSTE";

  @Column("numeric", { name: "cantidad", precision: 14, scale: 3 })
  cantidad: string;

  @Column("text", { name: "motivo", nullable: true })
  motivo: string | null;

  @Column("timestamp with time zone", {
    name: "creado_en",
    nullable: true,
    default: () => "now()",
  })
  creadoEn: Date | null;

  @ManyToOne(() => Insumos, (insumos) => insumos.movimientosStocks)
  @JoinColumn([{ name: "insumo_id", referencedColumnName: "id" }])
  insumo: Insumos;

  @ManyToOne(() => Compras, (compras) => compras.movimientosStocks)
  @JoinColumn([{ name: "referencia_compra", referencedColumnName: "id" }])
  referenciaCompra: Compras;

  @ManyToOne(() => Tickets, (tickets) => tickets.movimientosStocks)
  @JoinColumn([{ name: "referencia_ticket", referencedColumnName: "id" }])
  referenciaTicket: Tickets;
}
