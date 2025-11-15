import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { Compras } from '../../entities/compras';
import { QueryCompraDto } from './dto/query-compra.dto';
import { PaginationHelper } from '../../common/helper/pagination.helper';

@Injectable()
export class ComprasService {
  constructor(
    @InjectRepository(Compras)
    private readonly comprasRepo: Repository<Compras>,
  ) {}

  async create(dto: CreateCompraDto): Promise<Compras> {
    const entity = this.comprasRepo.create(dto as Partial<Compras>);
    return this.comprasRepo.save(entity);
  }

  async findAll(query: QueryCompraDto) {
    const { proveedorId, fechaCompra, nroFactura, search, sortBy = 'fechaCompra', sortDir = 'ASC' } = query as any;

    const baseFilter: any = {};
    if (proveedorId) baseFilter.proveedor = { id: String(proveedorId) };
    if (fechaCompra) baseFilter.fechaCompra = fechaCompra;

    let where: any = undefined;
    const fuzzy: any[] = [];
    if (search) fuzzy.push({ nroFactura: ILike(`%${search}%`) });
    if (nroFactura) fuzzy.push({ nroFactura: ILike(`%${nroFactura}%`) });

    if (fuzzy.length > 0) {
      where = fuzzy.map((f) => ({ ...baseFilter, ...f }));
    } else if (Object.keys(baseFilter).length > 0) {
      where = baseFilter;
    }

    return PaginationHelper.paginate(this.comprasRepo, query, {
      where,
      order: { [sortBy]: sortDir },
      relations: ['proveedor'],
    });
  }

  async findOne(id: number | string): Promise<Compras> {
    const entity = await this.comprasRepo.findOne({ where: { id: String(id) }, relations: ['proveedor'] });
    if (!entity) throw new NotFoundException('Compra no encontrada');
    return entity;
  }

  async update(id: number | string, dto: UpdateCompraDto): Promise<Compras> {
    const preload = await this.comprasRepo.preload({ id: String(id), ...(dto as any) });
    if (!preload) throw new NotFoundException('Compra no encontrada');
    return this.comprasRepo.save(preload);
  }

  async remove(id: number | string): Promise<void> {
    const result = await this.comprasRepo.delete(String(id));
    if (!result.affected) throw new NotFoundException('Compra no encontrada');
  }
}
