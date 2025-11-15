import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InsumosService } from './insumos.service';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';
import { QueryInsumoDto } from './dto/query-insumo.dto';

@ApiTags('insumos')
@Controller('insumos')
export class InsumosController {
  constructor(private readonly insumosService: InsumosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un insumo' })
  @ApiCreatedResponse({ description: 'Insumo creado correctamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos o SKU duplicado' })
  create(@Body() createInsumoDto: CreateInsumoDto) {
    return this.insumosService.create(createInsumoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar insumos con paginación, búsqueda, filtros y orden' })
  @ApiOkResponse({ description: 'Listado paginado de insumos' })
  @ApiBadRequestResponse({ description: 'Parámetros de consulta inválidos' })
  findAll(@Query() query: QueryInsumoDto) {
    return this.insumosService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un insumo por ID' })
  @ApiOkResponse({ description: 'Insumo encontrado' })
  @ApiNotFoundResponse({ description: 'Insumo no encontrado' })
  findOne(@Param('id') id: string) {
    return this.insumosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un insumo' })
  @ApiOkResponse({ description: 'Insumo actualizado correctamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos o SKU duplicado' })
  @ApiNotFoundResponse({ description: 'Insumo no encontrado' })
  update(@Param('id') id: string, @Body() updateInsumoDto: UpdateInsumoDto) {
    return this.insumosService.update(id, updateInsumoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un insumo' })
  @ApiOkResponse({ description: 'Insumo eliminado correctamente' })
  @ApiNotFoundResponse({ description: 'Insumo no encontrado' })
  remove(@Param('id') id: string) {
    return this.insumosService.remove(id);
  }
}
