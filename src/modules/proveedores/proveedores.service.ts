import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { Proveedores } from '../../entities/proveedores';
import { QueryProveedoreDto } from './dto/query-proveedore.dto';
import { PaginationHelper } from '../../common/helper/pagination.helper';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedores)
    private readonly proveedoresRepo: Repository<Proveedores>,
  ) {}

  async create(dto: CreateProveedoreDto): Promise<Proveedores> {
    const entity = this.proveedoresRepo.create(dto as Partial<Proveedores>);
    return this.proveedoresRepo.save(entity);
  }

  async findAll(query: QueryProveedoreDto) {
    const { search, nombre, nit, contacto, sortBy = 'nombre', sortDir = 'ASC' } = query;

    const baseFilter: Partial<Proveedores> = {};
    if (nit) baseFilter.nit = nit as any;

    let where: any = undefined;
    const fuzzy: any[] = [];
    if (search) {
      fuzzy.push({ nombre: ILike(`%${search}%`) }, { nit: ILike(`%${search}%`) }, { contacto: ILike(`%${search}%`) });
    }
    if (nombre) fuzzy.push({ nombre: ILike(`%${nombre}%`) });
    if (contacto) fuzzy.push({ contacto: ILike(`%${contacto}%`) });

    if (fuzzy.length > 0) {
      where = fuzzy.map((f) => ({ ...baseFilter, ...f }));
    } else if (Object.keys(baseFilter).length > 0) {
      where = baseFilter;
    }

    return PaginationHelper.paginate(this.proveedoresRepo, query, {
      where,
      order: { [sortBy]: sortDir },
    });
  }

  async findOne(id: number | string): Promise<Proveedores> {
    const entity = await this.proveedoresRepo.findOne({ where: { id: String(id) } });
    if (!entity) throw new NotFoundException('Proveedor no encontrado');
    return entity;
  }

  async update(id: number | string, dto: UpdateProveedoreDto): Promise<Proveedores> {
    const preload = await this.proveedoresRepo.preload({ id: String(id), ...(dto as any) });
    if (!preload) throw new NotFoundException('Proveedor no encontrado');
    return this.proveedoresRepo.save(preload);
  }

  async remove(id: number | string): Promise<void> {
    const result = await this.proveedoresRepo.delete(String(id));
    if (!result.affected) throw new NotFoundException('Proveedor no encontrado');
  }
}
