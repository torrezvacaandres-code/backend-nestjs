import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemsCompraDto } from './dto/create-items-compra.dto';
import { UpdateItemsCompraDto } from './dto/update-items-compra.dto';
import { ItemsCompra } from '../../entities/itemsCompra';
import { QueryItemsCompraDto } from './dto/query-items-compra.dto';
import { PaginationHelper } from '../../common/helper/pagination.helper';
import { Compras } from '../../entities/compras';
import { Insumos } from '../../entities/insumos';

@Injectable()
export class ItemsCompraService {
  constructor(
    @InjectRepository(ItemsCompra)
    private readonly itemsCompraRepo: Repository<ItemsCompra>,
    @InjectRepository(Compras)
    private readonly comprasRepo: Repository<Compras>,
    @InjectRepository(Insumos)
    private readonly insumosRepo: Repository<Insumos>,
  ) {}

  async create(dto: CreateItemsCompraDto): Promise<ItemsCompra> {
    const { compraId, insumoId, cantidad, costoUnitario, venceEl } = dto as any;

    if (Number(cantidad) <= 0) {
      throw new NotFoundException('La cantidad debe ser mayor a 0');
    }
    if (Number(costoUnitario) < 0) {
      throw new NotFoundException('El costo unitario no puede ser negativo');
    }

    const compra = await this.comprasRepo.findOne({ where: { id: String(compraId) } });
    if (!compra) throw new NotFoundException('Compra no encontrada');

    const insumo = await this.insumosRepo.findOne({ where: { id: String(insumoId) } });
    if (!insumo) throw new NotFoundException('Insumo no encontrado');

    if (venceEl && compra.fechaCompra && new Date(venceEl) < new Date(compra.fechaCompra)) {
      throw new NotFoundException('La fecha de vencimiento no puede ser anterior a la fecha de compra');
    }

    const entity = this.itemsCompraRepo.create({
      ...(dto as any),
      compra,
      insumo,
    } as Partial<ItemsCompra>);
    try {
      return await this.itemsCompraRepo.save(entity);
    } catch (err: any) {
      if (err?.code === '23505' && (err?.constraint ?? '').includes('items_compra_pkey')) {
        await this.syncIdSequence();
        return await this.itemsCompraRepo.save(entity);
      }
      throw err;
    }
  }

  async findAll(query: QueryItemsCompraDto) {
    const { compraId, insumoId, venceEl, sortBy = 'venceEl', sortDir = 'ASC' } = query;

    const where: any = {};
    if (compraId) where.compra = { id: String(compraId) };
    if (insumoId) where.insumo = { id: String(insumoId) };
    if (venceEl) where.venceEl = venceEl;

    return PaginationHelper.paginate(this.itemsCompraRepo, query, {
      where: Object.keys(where).length ? where : undefined,
      order: { [sortBy]: sortDir },
      relations: ['compra', 'insumo'],
    });
  }

  async findOne(id: number | string): Promise<ItemsCompra> {
    const entity = await this.itemsCompraRepo.findOne({ where: { id: String(id) }, relations: ['compra', 'insumo'] });
    if (!entity) throw new NotFoundException('Item de compra no encontrado');
    return entity;
  }

  async update(id: number | string, dto: UpdateItemsCompraDto): Promise<ItemsCompra> {
    const preload = await this.itemsCompraRepo.preload({ id: String(id), ...(dto as any) });
    if (!preload) throw new NotFoundException('Item de compra no encontrado');
    return this.itemsCompraRepo.save(preload);
  }

  async remove(id: number | string): Promise<void> {
    const result = await this.itemsCompraRepo.delete(String(id));
    if (!result.affected) throw new NotFoundException('Item de compra no encontrado');
  }

  private async syncIdSequence(): Promise<void> {
    const seqRes = await this.itemsCompraRepo.query("SELECT pg_get_serial_sequence('public.items_compra', 'id') AS seq_name");
    const seq = seqRes?.[0]?.seq_name;
    if (!seq) return;
    await this.itemsCompraRepo.query(
      `SELECT setval($1, (SELECT COALESCE(MAX(id), 0) + 1 FROM public.items_compra), false)`,
      [seq],
    );
  }
}
