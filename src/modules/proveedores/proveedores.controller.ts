import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { QueryProveedoreDto } from './dto/query-proveedore.dto';

@ApiTags('proveedores')
@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un proveedor' })
  @ApiCreatedResponse({ description: 'Proveedor creado correctamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  create(@Body() createProveedoreDto: CreateProveedoreDto) {
    return this.proveedoresService.create(createProveedoreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar proveedores con paginación, búsqueda, filtros y orden' })
  @ApiOkResponse({ description: 'Listado paginado de proveedores' })
  @ApiBadRequestResponse({ description: 'Parámetros de consulta inválidos' })
  findAll(@Query() query: QueryProveedoreDto) {
    return this.proveedoresService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un proveedor por ID' })
  @ApiOkResponse({ description: 'Proveedor encontrado' })
  @ApiNotFoundResponse({ description: 'Proveedor no encontrado' })
  findOne(@Param('id') id: string) {
    return this.proveedoresService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un proveedor' })
  @ApiOkResponse({ description: 'Proveedor actualizado correctamente' })
  @ApiNotFoundResponse({ description: 'Proveedor no encontrado' })
  update(@Param('id') id: string, @Body() updateProveedoreDto: UpdateProveedoreDto) {
    return this.proveedoresService.update(id, updateProveedoreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un proveedor' })
  @ApiOkResponse({ description: 'Proveedor eliminado correctamente' })
  @ApiNotFoundResponse({ description: 'Proveedor no encontrado' })
  remove(@Param('id') id: string) {
    return this.proveedoresService.remove(id);
  }
}
