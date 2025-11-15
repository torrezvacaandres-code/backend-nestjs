import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Menus } from "./menus";
import { Platos } from "./platos";
import { Reservas } from "./reservas";
import { Tickets } from "./tickets";

@Index("items_menu_pkey", ["id"], { unique: true })
@Index("idx_items_menu_menu", ["menuId"], {})
@Entity("items_menu", { schema: "public" })
export class ItemsMenu {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "menu_id" })
  menuId: string;

  @Column("numeric", {
    name: "precio",
    precision: 10,
    scale: 2,
    default: () => "0",
  })
  precio: string;

  @Column("integer", { name: "raciones_planeadas", default: () => "0" })
  racionesPlaneadas: number;

  @Column("integer", { name: "raciones_disponibles", default: () => "0" })
  racionesDisponibles: number;

  @ManyToOne(() => Menus, (menus) => menus.itemsMenus, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "menu_id", referencedColumnName: "id" }])
  menu: Menus;

  @ManyToOne(() => Platos, (platos) => platos.itemsMenus)
  @JoinColumn([{ name: "plato_id", referencedColumnName: "id" }])
  plato: Platos;

  @OneToMany(() => Reservas, (reservas) => reservas.itemMenu)
  reservas: Reservas[];

  @OneToMany(() => Tickets, (tickets) => tickets.itemMenu)
  tickets: Tickets[];
}
