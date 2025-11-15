import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ItemsMenuService } from './items-menu.service';
import { CreateItemsMenuDto } from './dto/create-items-menu.dto';
import { UpdateItemsMenuDto } from './dto/update-items-menu.dto';
import { QueryItemsMenuDto } from './dto/query-items-menu.dto';

@ApiTags('items-menu')
@Controller('items-menu')
export class ItemsMenuController {
  constructor(private readonly itemsMenuService: ItemsMenuService) {}

  @Post()
  @ApiOperation({ summary: 'Crear item de menú' })
  @ApiCreatedResponse({ description: 'Item de menú creado correctamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  create(@Body() createItemsMenuDto: CreateItemsMenuDto) {
    return this.itemsMenuService.create(createItemsMenuDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar items de menú con paginación y filtros' })
  @ApiOkResponse({ description: 'Listado paginado de items de menú' })
  @ApiBadRequestResponse({ description: 'Parámetros de consulta inválidos' })
  findAll(@Query() query: QueryItemsMenuDto) {
    return this.itemsMenuService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener item de menú por ID' })
  @ApiOkResponse({ description: 'Item de menú encontrado' })
  @ApiNotFoundResponse({ description: 'Item de menú no encontrado' })
  findOne(@Param('id') id: string) {
    return this.itemsMenuService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar item de menú' })
  @ApiOkResponse({ description: 'Item de menú actualizado correctamente' })
  @ApiNotFoundResponse({ description: 'Item de menú no encontrado' })
  update(@Param('id') id: string, @Body() updateItemsMenuDto: UpdateItemsMenuDto) {
    return this.itemsMenuService.update(id, updateItemsMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar item de menú' })
  @ApiOkResponse({ description: 'Item de menú eliminado correctamente' })
  @ApiNotFoundResponse({ description: 'Item de menú no encontrado' })
  remove(@Param('id') id: string) {
    return this.itemsMenuService.remove(id);
  }
}
