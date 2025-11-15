import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreatePlatoDto } from './dto/create-plato.dto';
import { UpdatePlatoDto } from './dto/update-plato.dto';
import { Platos } from '../../entities/platos';
import { QueryPlatoDto } from './dto/query-plato.dto';
import { PaginationHelper } from '../../common/helper/pagination.helper';

@Injectable()
export class PlatosService {
  constructor(
    @InjectRepository(Platos)
    private readonly platosRepo: Repository<Platos>,
  ) {}

  async create(dto: CreatePlatoDto): Promise<Platos> {
    const entity = this.platosRepo.create(dto as Partial<Platos>);
    try {
      return await this.platosRepo.save(entity);
    } catch (err: any) {
      if (err?.code === '23505' && (err?.constraint ?? '').includes('platos_pkey')) {
        await this.syncIdSequence();
        return await this.platosRepo.save(entity);
      }
      throw err;
    }
  }

  async findAll(query: QueryPlatoDto) {
    const { search, categoria, sortBy = 'nombre', sortDir = 'ASC' } = query;

    const baseFilter: Partial<Platos> = {};
    if (categoria) baseFilter.categoria = categoria as any;

    let where: any = undefined;
    if (search) {
      where = [
        { ...baseFilter, nombre: ILike(`%${search}%`) },
        { ...baseFilter, descripcion: ILike(`%${search}%`) },
      ];
    } else if (Object.keys(baseFilter).length > 0) {
      where = baseFilter;
    }

    return PaginationHelper.paginate(this.platosRepo, query, {
      where,
      order: { [sortBy]: sortDir },
    });
  }

  async findOne(id: number | string): Promise<Platos> {
    const entity = await this.platosRepo.findOne({ where: { id: String(id) } });
    if (!entity) throw new NotFoundException('Plato no encontrado');
    return entity;
  }

  async update(id: number | string, dto: UpdatePlatoDto): Promise<Platos> {
    const preload = await this.platosRepo.preload({ id: String(id), ...(dto as any) });
    if (!preload) throw new NotFoundException('Plato no encontrado');
    return this.platosRepo.save(preload);
  }

  async remove(id: number | string): Promise<void> {
    const result = await this.platosRepo.delete(String(id));
    if (!result.affected) throw new NotFoundException('Plato no encontrado');
  }

  private async syncIdSequence(): Promise<void> {
    const seqRes = await this.platosRepo.query("SELECT pg_get_serial_sequence('public.platos', 'id') AS seq_name");
    const seq = seqRes?.[0]?.seq_name;
    if (!seq) return;
    await this.platosRepo.query(
      `SELECT setval($1, (SELECT COALESCE(MAX(id), 0) + 1 FROM public.platos), false)`,
      [seq],
    );
  }
}
