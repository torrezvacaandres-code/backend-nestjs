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
      return await this.menusRepo.save(entity);
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
}
