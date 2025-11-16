import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Reservas } from '../../entities/reservas';
import { QueryReservaDto } from './dto/query-reserva.dto';
import { PaginationHelper } from '../../common/helper/pagination.helper';
import { Personas } from '../../entities/personas';
import { ItemsMenu } from '../../entities/itemsMenu';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reservas)
    private readonly reservasRepo: Repository<Reservas>,
    @InjectRepository(Personas)
    private readonly personasRepo: Repository<Personas>,
    @InjectRepository(ItemsMenu)
    private readonly itemsMenuRepo: Repository<ItemsMenu>,
  ) {}

  async create(dto: CreateReservaDto): Promise<Reservas> {
    const { personaId, itemMenuId } = dto as any;
    const persona = await this.personasRepo.findOne({ where: { id: String(personaId) } });
    if (!persona) throw new NotFoundException('Persona no encontrada');

    const itemMenu = await this.itemsMenuRepo.findOne({ where: { id: String(itemMenuId) } });
    if (!itemMenu) throw new NotFoundException('Item de menú no encontrado');

    const entity = this.reservasRepo.create({
      ...(dto as any),
      persona,
      itemMenu,
    } as Partial<Reservas>);
    return this.reservasRepo.save(entity);
  }

  async findAll(query: QueryReservaDto) {
    const { personaId, itemMenuId, estado, creadoEn, sortBy = 'creadoEn', sortDir = 'DESC' } = query;

    const where: any = {};
    if (personaId) where.persona = { id: String(personaId) };
    if (itemMenuId) where.itemMenu = { id: String(itemMenuId) };
    if (estado) where.estado = estado;
    if (creadoEn) where.creadoEn = creadoEn as any;

    return PaginationHelper.paginate(this.reservasRepo, query, {
      where: Object.keys(where).length ? where : undefined,
      order: { [sortBy]: sortDir },
      relations: ['persona', 'itemMenu'],
    });
  }

  async findOne(id: number | string): Promise<Reservas> {
    const entity = await this.reservasRepo.findOne({ where: { id: String(id) }, relations: ['persona', 'itemMenu'] });
    if (!entity) throw new NotFoundException('Reserva no encontrada');
    return entity;
  }

  async findByUsuario(personaId: number | string, query: QueryReservaDto) {
    const where: any = { persona: { id: String(personaId) } };
    const { sortBy = 'creadoEn', sortDir = 'DESC' } = query;
    return PaginationHelper.paginate(this.reservasRepo, query, {
      where,
      order: { [sortBy]: sortDir },
      relations: ['persona', 'itemMenu'],
    });
  }

  async update(id: number | string, dto: UpdateReservaDto): Promise<Reservas> {
    const preload = await this.reservasRepo.preload({ id: String(id), ...(dto as any) });
    if (!preload) throw new NotFoundException('Reserva no encontrada');
    return this.reservasRepo.save(preload);
  }

  async remove(id: number | string): Promise<void> {
    const result = await this.reservasRepo.delete(String(id));
    if (!result.affected) throw new NotFoundException('Reserva no encontrada');
  }
}
