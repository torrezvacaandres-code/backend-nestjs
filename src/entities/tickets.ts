import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { MovimientosStock } from "./movimientosStock";
import { Pagos } from "./pagos";
import { ItemsMenu } from "./itemsMenu";
import { Personas } from "./personas";
import { Reservas } from "./reservas";

@Index("tickets_codigo_key", ["codigo"], { unique: true })
@Index("idx_tickets_estado", ["estado"], {})
@Index("tickets_pkey", ["id"], { unique: true })
@Index("idx_tickets_persona", ["personaId"], {})
@Entity("tickets", { schema: "public" })
export class Tickets {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("bigint", { name: "persona_id" })
  personaId: string;

  @Column("enum", {
    name: "estado",
    enum: ["EMITIDO", "UTILIZADO", "CANCELADO", "EXPIRADO"],
    default: () => "'EMITIDO'",
  })
  estado: "EMITIDO" | "UTILIZADO" | "CANCELADO" | "EXPIRADO";

  @Column("text", { name: "codigo", nullable: true, unique: true })
  codigo: string | null;

  @Column("date", { name: "valido_el" })
  validoEl: string;

  @Column("timestamp with time zone", { name: "utilizado_en", nullable: true })
  utilizadoEn: Date | null;

  @Column("timestamp with time zone", {
    name: "creado_en",
    nullable: true,
    default: () => "now()",
  })
  creadoEn: Date | null;

  @OneToMany(
    () => MovimientosStock,
    (movimientosStock) => movimientosStock.referenciaTicket
  )
  movimientosStocks: MovimientosStock[];

  @OneToMany(() => Pagos, (pagos) => pagos.ticket)
  pagos: Pagos[];

  @ManyToOne(() => ItemsMenu, (itemsMenu) => itemsMenu.tickets)
  @JoinColumn([{ name: "item_menu_id", referencedColumnName: "id" }])
  itemMenu: ItemsMenu;

  @ManyToOne(() => Personas, (personas) => personas.tickets)
  @JoinColumn([{ name: "persona_id", referencedColumnName: "id" }])
  persona: Personas;

  @ManyToOne(() => Reservas, (reservas) => reservas.tickets)
  @JoinColumn([{ name: "reserva_id", referencedColumnName: "id" }])
  reserva: Reservas;
}
