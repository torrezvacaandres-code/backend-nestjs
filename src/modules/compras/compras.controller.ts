import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ComprasService } from './compras.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { QueryCompraDto } from './dto/query-compra.dto';

@ApiTags('compras')
@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una compra' })
  @ApiCreatedResponse({ description: 'Compra creada correctamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  create(@Body() createCompraDto: CreateCompraDto) {
    return this.comprasService.create(createCompraDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar compras con paginación, búsqueda y filtros' })
  @ApiOkResponse({ description: 'Listado paginado de compras' })
  @ApiBadRequestResponse({ description: 'Parámetros de consulta inválidos' })
  findAll(@Query() query: QueryCompraDto) {
    return this.comprasService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una compra por ID' })
  @ApiOkResponse({ description: 'Compra encontrada' })
  @ApiNotFoundResponse({ description: 'Compra no encontrada' })
  findOne(@Param('id') id: string) {
    return this.comprasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una compra' })
  @ApiOkResponse({ description: 'Compra actualizada correctamente' })
  @ApiNotFoundResponse({ description: 'Compra no encontrada' })
  update(@Param('id') id: string, @Body() updateCompraDto: UpdateCompraDto) {
    return this.comprasService.update(id, updateCompraDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una compra' })
  @ApiOkResponse({ description: 'Compra eliminada correctamente' })
  @ApiNotFoundResponse({ description: 'Compra no encontrada' })
  remove(@Param('id') id: string) {
    return this.comprasService.remove(id);
  }
}
