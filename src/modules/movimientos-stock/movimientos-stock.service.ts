import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovimientosStockDto } from './dto/create-movimientos-stock.dto';
import { UpdateMovimientosStockDto } from './dto/update-movimientos-stock.dto';
import { MovimientosStock } from '../../entities/movimientosStock';
import { QueryMovimientosStockDto } from './dto/query-movimientos-stock.dto';
import { PaginationHelper } from '../../common/helper/pagination.helper';
import { Insumos } from '../../entities/insumos';
import { Compras } from '../../entities/compras';
import { Tickets } from '../../entities/tickets';

@Injectable()
export class MovimientosStockService {
  constructor(
    @InjectRepository(MovimientosStock)
    private readonly movRepo: Repository<MovimientosStock>,
    @InjectRepository(Insumos)
    private readonly insumosRepo: Repository<Insumos>,
    @InjectRepository(Compras)
    private readonly comprasRepo: Repository<Compras>,
    @InjectRepository(Tickets)
    private readonly ticketsRepo: Repository<Tickets>,
  ) {}

  async create(dto: CreateMovimientosStockDto): Promise<MovimientosStock> {
    const { insumoId, referenciaCompraId, referenciaTicketId, cantidad, tipo, motivo, creadoEn } = dto as any;

    if (Number(cantidad) <= 0) throw new BadRequestException('La cantidad debe ser mayor a 0');

    const insumo = await this.insumosRepo.findOne({ where: { id: String(insumoId) } });
    if (!insumo) throw new NotFoundException('Insumo no encontrado');

    let referenciaCompra: Compras | undefined;
    if (referenciaCompraId) {
      const compra = await this.comprasRepo.findOne({ where: { id: String(referenciaCompraId) } });
      if (!compra) throw new NotFoundException('Referencia de compra no encontrada');
      referenciaCompra = compra;
    }

    let referenciaTicket: Tickets | undefined;
    if (referenciaTicketId) {
      const ticket = await this.ticketsRepo.findOne({ where: { id: String(referenciaTicketId) } });
      if (!ticket) throw new NotFoundException('Referencia de ticket no encontrada');
      referenciaTicket = ticket;
    }

    const entity = this.movRepo.create({
      tipo,
      motivo,
      creadoEn,
      cantidad: String(cantidad),
      insumo,
      referenciaCompra,
      referenciaTicket,
    } as Partial<MovimientosStock>);
    return this.movRepo.save(entity);
  }

  async findAll(query: QueryMovimientosStockDto) {
    const { insumoId, tipo, referenciaCompraId, referenciaTicketId, creadoEn, sortBy = 'creadoEn', sortDir = 'DESC' } = query;

    const where: any = {};
    if (insumoId) where.insumo = { id: String(insumoId) };
    if (tipo) where.tipo = tipo;
    if (referenciaCompraId) where.referenciaCompra = { id: String(referenciaCompraId) };
    if (referenciaTicketId) where.referenciaTicket = { id: String(referenciaTicketId) };
    if (creadoEn) where.creadoEn = creadoEn as any;

    return PaginationHelper.paginate(this.movRepo, query, {
      where: Object.keys(where).length ? where : undefined,
      order: { [sortBy]: sortDir },
      relations: ['insumo', 'referenciaCompra', 'referenciaTicket'],
    });
  }

  async findOne(id: number | string): Promise<MovimientosStock> {
    const entity = await this.movRepo.findOne({ where: { id: String(id) }, relations: ['insumo', 'referenciaCompra', 'referenciaTicket'] });
    if (!entity) throw new NotFoundException('Movimiento de stock no encontrado');
    return entity;
  }

  async update(id: number | string, dto: UpdateMovimientosStockDto): Promise<MovimientosStock> {
    const { insumoId, referenciaCompraId, referenciaTicketId } = dto as any;

    let insumo: Insumos | undefined;
    if (insumoId) {
      const found = await this.insumosRepo.findOne({ where: { id: String(insumoId) } });
      if (!found) throw new NotFoundException('Insumo no encontrado');
      insumo = found;
    }

    let referenciaCompra: Compras | undefined;
    if (referenciaCompraId) {
      const compra = await this.comprasRepo.findOne({ where: { id: String(referenciaCompraId) } });
      if (!compra) throw new NotFoundException('Referencia de compra no encontrada');
      referenciaCompra = compra;
    }

    let referenciaTicket: Tickets | undefined;
    if (referenciaTicketId) {
      const ticket = await this.ticketsRepo.findOne({ where: { id: String(referenciaTicketId) } });
      if (!ticket) throw new NotFoundException('Referencia de ticket no encontrada');
      referenciaTicket = ticket;
    }

    const preload = await this.movRepo.preload({
      id: String(id),
      ...(dto as any),
      cantidad: (dto as any).cantidad != null ? String((dto as any).cantidad) : undefined,
      insumo,
      referenciaCompra,
      referenciaTicket,
    });
    if (!preload) throw new NotFoundException('Movimiento de stock no encontrado');
    return this.movRepo.save(preload);
  }

  async remove(id: number | string): Promise<void> {
    const result = await this.movRepo.delete(String(id));
    if (!result.affected) throw new NotFoundException('Movimiento de stock no encontrado');
  }
}
