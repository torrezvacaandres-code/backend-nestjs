import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { QueryTicketDto } from './dto/query-ticket.dto';

@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un ticket' })
  @ApiCreatedResponse({ description: 'Ticket creado correctamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar tickets con paginación, búsqueda y filtros' })
  @ApiOkResponse({ description: 'Listado paginado de tickets' })
  @ApiBadRequestResponse({ description: 'Parámetros de consulta inválidos' })
  findAll(@Query() query: QueryTicketDto) {
    return this.ticketsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un ticket por ID' })
  @ApiOkResponse({ description: 'Ticket encontrado' })
  @ApiNotFoundResponse({ description: 'Ticket no encontrado' })
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un ticket' })
  @ApiOkResponse({ description: 'Ticket actualizado correctamente' })
  @ApiNotFoundResponse({ description: 'Ticket no encontrado' })
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un ticket' })
  @ApiOkResponse({ description: 'Ticket eliminado correctamente' })
  @ApiNotFoundResponse({ description: 'Ticket no encontrado' })
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(id);
  }
}
