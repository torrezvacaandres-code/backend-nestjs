import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Pagos } from '../../entities/pagos';
import { PaginationHelper } from '../../common/helper/pagination.helper';
import { QueryPagoDto } from './dto/query-pago.dto';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pagos)
    private readonly pagosRepo: Repository<Pagos>,
  ) {}

  async create(dto: CreatePagoDto): Promise<Pagos> {
    const entity = this.pagosRepo.create({
      ...(dto as any),
      monto: dto.monto != null ? String(dto.monto) : undefined,
    } as Partial<Pagos>);
    try {
      return await this.pagosRepo.save(entity);
    } catch (err: any) {
      if (err?.code === '23505' && (err?.constraint ?? '').includes('pagos_pkey')) {
        await this.syncIdSequence();
        return await this.pagosRepo.save(entity);
      }
      throw err;
    }
  }

  async findAll(query: QueryPagoDto) {
    const { personaId, estado, proveedor, referencia, moneda, search, sortBy = 'creadoEn', sortDir = 'DESC' } = query as any;

    const baseFilter: any = {};
    if (personaId) baseFilter.persona = { id: String(personaId) };
    if (estado) baseFilter.estado = estado;
    if (moneda) baseFilter.moneda = moneda;

    let where: any = undefined;
    const fuzzy: any[] = [];
    if (search) fuzzy.push({ referencia: ILike(`%${search}%`) }, { proveedor: ILike(`%${search}%`) });
    if (referencia) fuzzy.push({ referencia: ILike(`%${referencia}%`) });
    if (proveedor) fuzzy.push({ proveedor: ILike(`%${proveedor}%`) });

    if (fuzzy.length > 0) {
      where = fuzzy.map((f) => ({ ...baseFilter, ...f }));
    } else if (Object.keys(baseFilter).length > 0) {
      where = baseFilter;
    }

    return PaginationHelper.paginate(this.pagosRepo, query, {
      where,
      order: { [sortBy]: sortDir },
      relations: ['persona', 'ticket'],
    });
  }

  async findOne(id: number | string): Promise<Pagos> {
    const entity = await this.pagosRepo.findOne({ where: { id: String(id) }, relations: ['persona', 'ticket'] });
    if (!entity) throw new NotFoundException('Pago no encontrado');
    return entity;
  }

  async update(id: number | string, dto: UpdatePagoDto): Promise<Pagos> {
    const preload = await this.pagosRepo.preload({
      id: String(id),
      ...(dto as any),
      monto: (dto as any).monto != null ? String((dto as any).monto) : undefined,
    });
    if (!preload) throw new NotFoundException('Pago no encontrado');
    return this.pagosRepo.save(preload);
  }

  async remove(id: number | string): Promise<void> {
    const result = await this.pagosRepo.delete(String(id));
    if (!result.affected) throw new NotFoundException('Pago no encontrado');
  }

  private async syncIdSequence(): Promise<void> {
    const seqRes = await this.pagosRepo.query("SELECT pg_get_serial_sequence('public.pagos', 'id') AS seq_name");
    const seq = seqRes?.[0]?.seq_name;
    if (!seq) return;
    await this.pagosRepo.query(
      `SELECT setval($1, (SELECT COALESCE(MAX(id), 0) + 1 FROM public.pagos), false)`,
      [seq],
    );
  }
}
