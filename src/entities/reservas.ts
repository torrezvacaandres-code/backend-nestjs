import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ItemsMenu } from "./itemsMenu";
import { Personas } from "./personas";
import { Tickets } from "./tickets";

@Index("reservas_pkey", ["id"], { unique: true })
@Entity("reservas", { schema: "public" })
export class Reservas {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "estado", default: () => "'RESERVADA'" })
  estado: string;

  @Column("timestamp with time zone", {
    name: "creado_en",
    nullable: true,
    default: () => "now()",
  })
  creadoEn: Date | null;

  @ManyToOne(() => ItemsMenu, (itemsMenu) => itemsMenu.reservas)
  @JoinColumn([{ name: "item_menu_id", referencedColumnName: "id" }])
  itemMenu: ItemsMenu;

  @ManyToOne(() => Personas, (personas) => personas.reservas)
  @JoinColumn([{ name: "persona_id", referencedColumnName: "id" }])
  persona: Personas;

  @OneToMany(() => Tickets, (tickets) => tickets.reserva)
  tickets: Tickets[];
}
