import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { QueryPagoDto } from './dto/query-pago.dto';

@ApiTags('pagos')
@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un pago' })
  @ApiCreatedResponse({ description: 'Pago creado correctamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  create(@Body() createPagoDto: CreatePagoDto) {
    return this.pagosService.create(createPagoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar pagos con paginación, búsqueda y filtros' })
  @ApiOkResponse({ description: 'Listado paginado de pagos' })
  @ApiBadRequestResponse({ description: 'Parámetros de consulta inválidos' })
  findAll(@Query() query: QueryPagoDto) {
    return this.pagosService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pago por ID' })
  @ApiOkResponse({ description: 'Pago encontrado' })
  @ApiNotFoundResponse({ description: 'Pago no encontrado' })
  findOne(@Param('id') id: string) {
    return this.pagosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un pago' })
  @ApiOkResponse({ description: 'Pago actualizado correctamente' })
  @ApiNotFoundResponse({ description: 'Pago no encontrado' })
  update(@Param('id') id: string, @Body() updatePagoDto: UpdatePagoDto) {
    return this.pagosService.update(id, updatePagoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un pago' })
  @ApiOkResponse({ description: 'Pago eliminado correctamente' })
  @ApiNotFoundResponse({ description: 'Pago no encontrado' })
  remove(@Param('id') id: string) {
    return this.pagosService.remove(id);
  }
}
