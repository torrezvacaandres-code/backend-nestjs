import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BecasService } from './becas.service';
import { CreateBecaDto } from './dto/create-beca.dto';
import { UpdateBecaDto } from './dto/update-beca.dto';
import { QueryBecaDto } from './dto/query-beca.dto';

@ApiTags('becas')
@Controller('becas')
export class BecasController {
  constructor(private readonly becasService: BecasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una beca' })
  @ApiCreatedResponse({ description: 'Beca creada correctamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  create(@Body() createBecaDto: CreateBecaDto) {
    return this.becasService.create(createBecaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar becas con paginación y filtros' })
  @ApiOkResponse({ description: 'Listado paginado de becas' })
  @ApiBadRequestResponse({ description: 'Parámetros de consulta inválidos' })
  findAll(@Query() query: QueryBecaDto) {
    return this.becasService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una beca por ID' })
  @ApiOkResponse({ description: 'Beca encontrada' })
  @ApiNotFoundResponse({ description: 'Beca no encontrada' })
  findOne(@Param('id') id: string) {
    return this.becasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una beca' })
  @ApiOkResponse({ description: 'Beca actualizada correctamente' })
  @ApiNotFoundResponse({ description: 'Beca no encontrada' })
  update(@Param('id') id: string, @Body() updateBecaDto: UpdateBecaDto) {
    return this.becasService.update(id, updateBecaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una beca' })
  @ApiOkResponse({ description: 'Beca eliminada correctamente' })
  @ApiNotFoundResponse({ description: 'Beca no encontrada' })
  remove(@Param('id') id: string) {
    return this.becasService.remove(id);
  }
}
