import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menus } from '../../entities/menus';
import { QueryMenuDto } from './dto/query-menu.dto';
import { PaginationHelper } from '../../common/helper/pagination.helper';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menus)
    private readonly menusRepo: Repository<Menus>,
  ) {}

  async create(dto: CreateMenuDto): Promise<Menus> {
    const entity = this.menusRepo.create(dto as Partial<Menus>);
    try {
      // Pre-validación de unicidad fecha+comida
      const exists = await this.menusRepo.exist({ where: { fecha: entity.fecha as any, comida: entity.comida } });
      if (exists) {
        throw new BadRequestException('Ya existe un menú para esa fecha y comida');
      }
      try {
        return await this.menusRepo.save(entity);
      } catch (err: any) {
        if (err?.code === '23505' && (err?.constraint ?? '').includes('menus_pkey')) {
          await this.syncIdSequence();
          return await this.menusRepo.save(entity);
        }
        throw err;
      }
    } catch (err: any) {
      if (err?.code === '23505') {
        throw new BadRequestException('Ya existe un menú para esa fecha y comida');
      }
      throw err;
    }
  }

  async findAll(query: QueryMenuDto) {
    const { fecha, comida, sortBy = 'fecha', sortDir = 'ASC' } = query;
    const where: any = {};
    if (fecha) where.fecha = fecha as any;
    if (comida) where.comida = comida as any;

    return PaginationHelper.paginate(this.menusRepo, query, {
      where: Object.keys(where).length ? where : undefined,
      order: { [sortBy]: sortDir },
    });
  }

  async findOne(id: number | string): Promise<Menus> {
    const entity = await this.menusRepo.findOne({ where: { id: String(id) } });
    if (!entity) throw new NotFoundException('Menú no encontrado');
    return entity;
  }

  async findWeekly(): Promise<Menus[]> {
    const today = new Date();
    // Obtener lunes de la semana actual
    const day = today.getDay(); // 0=Domingo, 1=Lunes, ...
    const diffToMonday = (day === 0 ? -6 : 1 - day);
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const toISODate = (d: Date) => d.toISOString().slice(0, 10);

    return this.menusRepo.find({
      where: { fecha: (value: any) => value >= toISODate(monday) && value <= toISODate(sunday) } as any,
      order: { fecha: 'ASC', comida: 'ASC' },
    });
  }

  async update(id: number | string, dto: UpdateMenuDto): Promise<Menus> {
    const preload = await this.menusRepo.preload({ id: String(id), ...(dto as any) });
    if (!preload) throw new NotFoundException('Menú no encontrado');
    try {
      // Pre-validación de unicidad fecha+comida cuando cambian
      if (preload.fecha && preload.comida) {
        const exists = await this.menusRepo.exist({
          where: { fecha: preload.fecha as any, comida: preload.comida, id: (value: any) => value !== String(id) } as any,
        });
        if (exists) {
          throw new BadRequestException('Ya existe un menú para esa fecha y comida');
        }
      }
      return await this.menusRepo.save(preload);
    } catch (err: any) {
      if (err?.code === '23505') {
        throw new BadRequestException('Ya existe un menú para esa fecha y comida');
      }
      throw err;
    }
  }

  async remove(id: number | string): Promise<void> {
    const result = await this.menusRepo.delete(String(id));
    if (!result.affected) throw new NotFoundException('Menú no encontrado');
  }

  private async syncIdSequence(): Promise<void> {
    const seqRes = await this.menusRepo.query("SELECT pg_get_serial_sequence('public.menus', 'id') AS seq_name");
    const seq = seqRes?.[0]?.seq_name;
    if (!seq) return;
    await this.menusRepo.query(
      `SELECT setval($1, (SELECT COALESCE(MAX(id), 0) + 1 FROM public.menus), false)`,
      [seq],
    );
  }
}
