import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ItemsMenu } from "./itemsMenu";

@Index("platos_pkey", ["id"], { unique: true })
@Entity("platos", { schema: "public" })
export class Platos {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("text", { name: "nombre" })
  nombre: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("text", { name: "categoria", nullable: true })
  categoria: string | null;

  @OneToMany(() => ItemsMenu, (itemsMenu) => itemsMenu.plato)
  itemsMenus: ItemsMenu[];
}
