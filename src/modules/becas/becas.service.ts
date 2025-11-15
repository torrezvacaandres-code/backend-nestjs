import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateBecaDto } from './dto/create-beca.dto';
import { UpdateBecaDto } from './dto/update-beca.dto';
import { Becas } from '../../entities/becas';
import { QueryBecaDto } from './dto/query-beca.dto';
import { PaginationHelper } from '../../common/helper/pagination.helper';

@Injectable()
export class BecasService {
  constructor(
    @InjectRepository(Becas)
    private readonly becasRepo: Repository<Becas>,
  ) {}

  async create(dto: CreateBecaDto): Promise<Becas> {
    const entity = this.becasRepo.create(dto as Partial<Becas>);
    try {
      return await this.becasRepo.save(entity);
    } catch (err: any) {
      if (err?.code === '23505' && (err?.constraint ?? '').includes('becas_pkey')) {
        await this.syncIdSequence();
        return await this.becasRepo.save(entity);
      }
      throw err;
    }
  }

  async findAll(query: QueryBecaDto) {
    const { personaId, estado, tipo, vigenteDesde, vigenteHasta, search, sortBy = 'creadoEn', sortDir = 'DESC' } = query as any;

    const baseFilter: any = {};
    if (personaId) baseFilter.persona = { id: String(personaId) };
    if (estado) baseFilter.estado = estado;
    if (tipo) baseFilter.tipo = tipo;
    if (vigenteDesde) baseFilter.vigenteDesde = vigenteDesde;
    if (vigenteHasta) baseFilter.vigenteHasta = vigenteHasta;

    let where: any = undefined;
    const fuzzy: any[] = [];
    if (search) fuzzy.push({ tipo: ILike(`%${search}%`) }, { estado: ILike(`%${search}%`) });

    if (fuzzy.length > 0) {
      where = fuzzy.map((f) => ({ ...baseFilter, ...f }));
    } else if (Object.keys(baseFilter).length > 0) {
      where = baseFilter;
    }

    return PaginationHelper.paginate(this.becasRepo, query, {
      where,
      order: { [sortBy]: sortDir },
      relations: ['persona', 'documentosBecas'],
    });
  }

  async findOne(id: number | string): Promise<Becas> {
    const entity = await this.becasRepo.findOne({ where: { id: String(id) }, relations: ['persona', 'documentosBecas'] });
    if (!entity) throw new NotFoundException('Beca no encontrada');
    return entity;
  }

  async update(id: number | string, dto: UpdateBecaDto): Promise<Becas> {
    const preload = await this.becasRepo.preload({ id: String(id), ...(dto as any) });
    if (!preload) throw new NotFoundException('Beca no encontrada');
    return this.becasRepo.save(preload);
  }

  async remove(id: number | string): Promise<void> {
    const result = await this.becasRepo.delete(String(id));
    if (!result.affected) throw new NotFoundException('Beca no encontrada');
  }

  private async syncIdSequence(): Promise<void> {
    const seqRes = await this.becasRepo.query("SELECT pg_get_serial_sequence('public.becas', 'id') AS seq_name");
    const seq = seqRes?.[0]?.seq_name;
    if (!seq) return;
    await this.becasRepo.query(
      `SELECT setval($1, (SELECT COALESCE(MAX(id), 0) + 1 FROM public.becas), false)`,
      [seq],
    );
  }
}
