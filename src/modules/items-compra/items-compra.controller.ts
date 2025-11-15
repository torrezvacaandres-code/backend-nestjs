import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ItemsCompraService } from './items-compra.service';
import { CreateItemsCompraDto } from './dto/create-items-compra.dto';
import { UpdateItemsCompraDto } from './dto/update-items-compra.dto';
import { QueryItemsCompraDto } from './dto/query-items-compra.dto';

@ApiTags('items-compra')
@Controller('items-compra')
export class ItemsCompraController {
  constructor(private readonly itemsCompraService: ItemsCompraService) {}

  @Post()
  @ApiOperation({ summary: 'Crear item de compra' })
  @ApiCreatedResponse({ description: 'Item de compra creado correctamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  create(@Body() createItemsCompraDto: CreateItemsCompraDto) {
    return this.itemsCompraService.create(createItemsCompraDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar items de compra con paginación y filtros' })
  @ApiOkResponse({ description: 'Listado paginado de items de compra' })
  @ApiBadRequestResponse({ description: 'Parámetros de consulta inválidos' })
  findAll(@Query() query: QueryItemsCompraDto) {
    return this.itemsCompraService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener item de compra por ID' })
  @ApiOkResponse({ description: 'Item de compra encontrado' })
  @ApiNotFoundResponse({ description: 'Item de compra no encontrado' })
  findOne(@Param('id') id: string) {
    return this.itemsCompraService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar item de compra' })
  @ApiOkResponse({ description: 'Item de compra actualizado correctamente' })
  @ApiNotFoundResponse({ description: 'Item de compra no encontrado' })
  update(@Param('id') id: string, @Body() updateItemsCompraDto: UpdateItemsCompraDto) {
    return this.itemsCompraService.update(id, updateItemsCompraDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar item de compra' })
  @ApiOkResponse({ description: 'Item de compra eliminado correctamente' })
  @ApiNotFoundResponse({ description: 'Item de compra no encontrado' })
  remove(@Param('id') id: string) {
    return this.itemsCompraService.remove(id);
  }
}
