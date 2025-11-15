import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tickets } from '../../entities/tickets';
import { Personas } from '../../entities/personas';
import { ItemsMenu } from '../../entities/itemsMenu';
import { Reservas } from '../../entities/reservas';

@Module({
  imports: [TypeOrmModule.forFeature([Tickets, Personas, ItemsMenu, Reservas])],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
