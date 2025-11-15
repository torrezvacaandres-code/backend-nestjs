import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Tickets } from '../../entities/tickets';
import { QueryTicketDto } from './dto/query-ticket.dto';
import { PaginationHelper } from '../../common/helper/pagination.helper';
import { Personas } from '../../entities/personas';
import { ItemsMenu } from '../../entities/itemsMenu';
import { Reservas } from '../../entities/reservas';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Tickets)
    private readonly ticketsRepo: Repository<Tickets>,
    @InjectRepository(Personas)
    private readonly personasRepo: Repository<Personas>,
    @InjectRepository(ItemsMenu)
    private readonly itemsMenuRepo: Repository<ItemsMenu>,
    @InjectRepository(Reservas)
    private readonly reservasRepo: Repository<Reservas>,
  ) {}

  async create(dto: CreateTicketDto): Promise<Tickets> {
    const { personaId, itemMenuId, reservaId } = dto as any;

    const persona = await this.personasRepo.findOne({ where: { id: String(personaId) } });
    if (!persona) throw new NotFoundException('Persona no encontrada');

    let itemMenuEntity: ItemsMenu | undefined;
    if (itemMenuId) {
      const itemMenu = await this.itemsMenuRepo.findOne({ where: { id: String(itemMenuId) } });
      if (!itemMenu) throw new NotFoundException('Item de menú no encontrado');
      itemMenuEntity = itemMenu as ItemsMenu;
    }

    let reservaEntity: Reservas | undefined;
    if (reservaId) {
      const reserva = await this.reservasRepo.findOne({ where: { id: String(reservaId) } });
      if (!reserva) throw new NotFoundException('Reserva no encontrada');
      reservaEntity = reserva as Reservas;
    }

    const entity = this.ticketsRepo.create({
      ...(dto as any),
      persona,
      itemMenu: itemMenuEntity,
      reserva: reservaEntity,
    } as Partial<Tickets>);
    return this.ticketsRepo.save(entity);
  }

  async findAll(query: QueryTicketDto) {
    const { personaId, estado, validoEl, codigo, search, sortBy = 'creadoEn', sortDir = 'DESC' } = query as any;

    const baseFilter: any = {};
    if (personaId) baseFilter.persona = { id: String(personaId) };
    if (estado) baseFilter.estado = estado;
    if (validoEl) baseFilter.validoEl = validoEl;

    let where: any = undefined;
    const fuzzy: any[] = [];
    if (search) fuzzy.push({ codigo: ILike(`%${search}%`) });
    if (codigo) fuzzy.push({ codigo: ILike(`%${codigo}%`) });

    if (fuzzy.length > 0) {
      where = fuzzy.map((f) => ({ ...baseFilter, ...f }));
    } else if (Object.keys(baseFilter).length > 0) {
      where = baseFilter;
    }

    return PaginationHelper.paginate(this.ticketsRepo, query, {
      where,
      order: { [sortBy]: sortDir },
      relations: ['persona', 'itemMenu', 'reserva'],
    });
  }

  async findOne(id: number | string): Promise<Tickets> {
    const entity = await this.ticketsRepo.findOne({ where: { id: String(id) }, relations: ['persona', 'itemMenu', 'reserva'] });
    if (!entity) throw new NotFoundException('Ticket no encontrado');
    return entity;
  }

  async update(id: number | string, dto: UpdateTicketDto): Promise<Tickets> {
    const preload = await this.ticketsRepo.preload({ id: String(id), ...(dto as any) });
    if (!preload) throw new NotFoundException('Ticket no encontrado');
    return this.ticketsRepo.save(preload);
  }

  async remove(id: number | string): Promise<void> {
    const result = await this.ticketsRepo.delete(String(id));
    if (!result.affected) throw new NotFoundException('Ticket no encontrado');
  }
}
