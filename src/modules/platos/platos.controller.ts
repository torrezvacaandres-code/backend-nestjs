import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlatosService } from './platos.service';
import { CreatePlatoDto } from './dto/create-plato.dto';
import { UpdatePlatoDto } from './dto/update-plato.dto';
import { QueryPlatoDto } from './dto/query-plato.dto';

@ApiTags('platos')
@Controller('platos')
export class PlatosController {
  constructor(private readonly platosService: PlatosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un plato' })
  @ApiCreatedResponse({ description: 'Plato creado correctamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  create(@Body() createPlatoDto: CreatePlatoDto) {
    return this.platosService.create(createPlatoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar platos con paginación, búsqueda, filtros y orden' })
  @ApiOkResponse({ description: 'Listado paginado de platos' })
  @ApiBadRequestResponse({ description: 'Parámetros de consulta inválidos' })
  findAll(@Query() query: QueryPlatoDto) {
    return this.platosService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un plato por ID' })
  @ApiOkResponse({ description: 'Plato encontrado' })
  @ApiNotFoundResponse({ description: 'Plato no encontrado' })
  findOne(@Param('id') id: string) {
    return this.platosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un plato' })
  @ApiOkResponse({ description: 'Plato actualizado correctamente' })
  @ApiNotFoundResponse({ description: 'Plato no encontrado' })
  update(@Param('id') id: string, @Body() updatePlatoDto: UpdatePlatoDto) {
    return this.platosService.update(id, updatePlatoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un plato' })
  @ApiOkResponse({ description: 'Plato eliminado correctamente' })
  @ApiNotFoundResponse({ description: 'Plato no encontrado' })
  remove(@Param('id') id: string) {
    return this.platosService.remove(id);
  }
}
