import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { QueryReservaDto } from './dto/query-reserva.dto';

@ApiTags('reservas')
@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una reserva' })
  @ApiCreatedResponse({ description: 'Reserva creada correctamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservasService.create(createReservaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar reservas con paginación y filtros' })
  @ApiOkResponse({ description: 'Listado paginado de reservas' })
  @ApiBadRequestResponse({ description: 'Parámetros de consulta inválidos' })
  findAll(@Query() query: QueryReservaDto) {
    return this.reservasService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una reserva por ID' })
  @ApiOkResponse({ description: 'Reserva encontrada' })
  @ApiNotFoundResponse({ description: 'Reserva no encontrada' })
  findOne(@Param('id') id: string) {
    return this.reservasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una reserva' })
  @ApiOkResponse({ description: 'Reserva actualizada correctamente' })
  @ApiNotFoundResponse({ description: 'Reserva no encontrada' })
  update(@Param('id') id: string, @Body() updateReservaDto: UpdateReservaDto) {
    return this.reservasService.update(id, updateReservaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una reserva' })
  @ApiOkResponse({ description: 'Reserva eliminada correctamente' })
  @ApiNotFoundResponse({ description: 'Reserva no encontrada' })
  remove(@Param('id') id: string) {
    return this.reservasService.remove(id);
  }
}
