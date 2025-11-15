import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemsMenuDto } from './dto/create-items-menu.dto';
import { UpdateItemsMenuDto } from './dto/update-items-menu.dto';
import { ItemsMenu } from '../../entities/itemsMenu';
import { QueryItemsMenuDto } from './dto/query-items-menu.dto';
import { PaginationHelper } from '../../common/helper/pagination.helper';

@Injectable()
export class ItemsMenuService {
  constructor(
    @InjectRepository(ItemsMenu)
    private readonly itemsMenuRepo: Repository<ItemsMenu>,
  ) {}

  async create(dto: CreateItemsMenuDto): Promise<ItemsMenu> {
    const { racionesPlaneadas, racionesDisponibles, precio } = dto as any;
    if (racionesPlaneadas != null && Number(racionesPlaneadas) < 0) {
      throw new BadRequestException('Las raciones planeadas no pueden ser negativas');
    }
    if (racionesDisponibles != null && Number(racionesDisponibles) < 0) {
      throw new BadRequestException('Las raciones disponibles no pueden ser negativas');
    }
    if (
      racionesPlaneadas != null &&
      racionesDisponibles != null &&
      Number(racionesDisponibles) > Number(racionesPlaneadas)
    ) {
      throw new BadRequestException('Las raciones disponibles no pueden superar las planeadas');
    }
    if (precio != null && Number(precio) < 0) {
      throw new BadRequestException('El precio no puede ser negativo');
    }
    const entity = this.itemsMenuRepo.create(dto as Partial<ItemsMenu>);
    try {
      return await this.itemsMenuRepo.save(entity);
    } catch (err: any) {
      if (err?.code === '23505' && (err?.constraint ?? '').includes('items_menu_pkey')) {
        await this.syncIdSequence();
        return await this.itemsMenuRepo.save(entity);
      }
      throw err;
    }
  }

  async findAll(query: QueryItemsMenuDto) {
    const { menuId, platoId, sortBy = 'precio', sortDir = 'ASC' } = query;

    const where: any = {};
    if (menuId) where.menu = { id: String(menuId) };
    if (platoId) where.plato = { id: String(platoId) };

    return PaginationHelper.paginate(this.itemsMenuRepo, query, {
      where: Object.keys(where).length ? where : undefined,
      order: { [sortBy]: sortDir },
      relations: ['menu', 'plato'],
    });
  }

  async findOne(id: number | string): Promise<ItemsMenu> {
    const entity = await this.itemsMenuRepo.findOne({ where: { id: String(id) }, relations: ['menu', 'plato'] });
    if (!entity) throw new NotFoundException('Item de menú no encontrado');
    return entity;
  }

  async update(id: number | string, dto: UpdateItemsMenuDto): Promise<ItemsMenu> {
    const { racionesPlaneadas, racionesDisponibles, precio } = dto as any;
    if (racionesPlaneadas != null && Number(racionesPlaneadas) < 0) {
      throw new BadRequestException('Las raciones planeadas no pueden ser negativas');
    }
    if (racionesDisponibles != null && Number(racionesDisponibles) < 0) {
      throw new BadRequestException('Las raciones disponibles no pueden ser negativas');
    }
    if (
      racionesPlaneadas != null &&
      racionesDisponibles != null &&
      Number(racionesDisponibles) > Number(racionesPlaneadas)
    ) {
      throw new BadRequestException('Las raciones disponibles no pueden superar las planeadas');
    }
    if (precio != null && Number(precio) < 0) {
      throw new BadRequestException('El precio no puede ser negativo');
    }
    const preload = await this.itemsMenuRepo.preload({ id: String(id), ...(dto as any) });
    if (!preload) throw new NotFoundException('Item de menú no encontrado');
    return this.itemsMenuRepo.save(preload);
  }

  async remove(id: number | string): Promise<void> {
    const result = await this.itemsMenuRepo.delete(String(id));
    if (!result.affected) throw new NotFoundException('Item de menú no encontrado');
  }

  private async syncIdSequence(): Promise<void> {
    const seqRes = await this.itemsMenuRepo.query("SELECT pg_get_serial_sequence('public.items_menu', 'id') AS seq_name");
    const seq = seqRes?.[0]?.seq_name;
    if (!seq) return;
    await this.itemsMenuRepo.query(
      `SELECT setval($1, (SELECT COALESCE(MAX(id), 0) + 1 FROM public.items_menu), false)`,
      [seq],
    );
  }
}
