import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ItemsMenu } from "./itemsMenu";

@Index("menus_fecha_comida_key", ["comida", "fecha"], { unique: true })
@Index("menus_pkey", ["id"], { unique: true })
@Entity("menus", { schema: "public" })
export class Menus {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("date", { name: "fecha", unique: true })
  fecha: string;

  @Column("enum", {
    name: "comida",
    unique: true,
    enum: ["DESAYUNO", "ALMUERZO", "CENA"],
  })
  comida: "DESAYUNO" | "ALMUERZO" | "CENA";

  @OneToMany(() => ItemsMenu, (itemsMenu) => itemsMenu.menu)
  itemsMenus: ItemsMenu[];
}
