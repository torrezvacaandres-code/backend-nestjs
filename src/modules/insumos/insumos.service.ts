import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';
import { Insumos } from '../../entities/insumos';
import { PaginationHelper } from '../../common/helper/pagination.helper';
import { QueryInsumoDto } from './dto/query-insumo.dto';

@Injectable()
export class InsumosService {
  constructor(
    @InjectRepository(Insumos)
    private readonly insumosRepo: Repository<Insumos>,
  ) {}

  async create(createInsumoDto: CreateInsumoDto): Promise<Insumos> {
    const entity: Insumos = this.insumosRepo.create(createInsumoDto as Partial<Insumos>);
    try {
      return await this.insumosRepo.save(entity);
    } catch (err: any) {
      if (err?.code === '23505') {
        throw new BadRequestException('El SKU ya existe');
      }
      throw err;
    }
  }

  async findAll(query: QueryInsumoDto) {
    const { search, unidad, vidaUtilDias, sortBy = 'nombre', sortDir = 'ASC' } = query;

    const baseFilter: Partial<Insumos> = {};
    if (unidad) baseFilter.unidad = unidad as any;
    if (typeof vidaUtilDias === 'number') (baseFilter as any).vidaUtilDias = vidaUtilDias;

    let where: any = undefined;
    if (search) {
      where = [
        { ...baseFilter, nombre: ILike(`%${search}%`) },
        { ...baseFilter, sku: ILike(`%${search}%`) },
        { ...baseFilter, unidad: ILike(`%${search}%`) },
      ];
    } else if (Object.keys(baseFilter).length > 0) {
      where = baseFilter;
    }

    return PaginationHelper.paginate(this.insumosRepo, query, {
      where,
      order: { [sortBy]: sortDir },
    });
  }

  async findOne(id: number | string): Promise<Insumos> {
    const entity = await this.insumosRepo.findOne({ where: { id: String(id) } });
    if (!entity) throw new NotFoundException('Insumo no encontrado');
    return entity;
  }

  async update(id: number | string, updateInsumoDto: UpdateInsumoDto): Promise<Insumos> {
    const preload = await this.insumosRepo.preload({ id: String(id), ...(updateInsumoDto as any) });
    if (!preload) throw new NotFoundException('Insumo no encontrado');
    try {
      return await this.insumosRepo.save(preload);
    } catch (err: any) {
      if (err?.code === '23505') {
        throw new BadRequestException('El SKU ya existe');
      }
      throw err;
    }
  }

  async remove(id: number | string): Promise<void> {
    try {
      const result = await this.insumosRepo.delete(String(id));
      if (!result.affected) throw new NotFoundException('Insumo no encontrado');
    } catch (err) {
      throw err;
    }
  }
}
