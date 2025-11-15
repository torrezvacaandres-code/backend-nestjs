import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MovimientosStockService } from './movimientos-stock.service';
import { CreateMovimientosStockDto } from './dto/create-movimientos-stock.dto';
import { UpdateMovimientosStockDto } from './dto/update-movimientos-stock.dto';
import { QueryMovimientosStockDto } from './dto/query-movimientos-stock.dto';

@ApiTags('movimientos-stock')
@Controller('movimientos-stock')
export class MovimientosStockController {
  constructor(private readonly movimientosStockService: MovimientosStockService) {}

  @Post()
  @ApiOperation({ summary: 'Crear movimiento de stock' })
  @ApiCreatedResponse({ description: 'Movimiento de stock creado correctamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  create(@Body() createMovimientosStockDto: CreateMovimientosStockDto) {
    return this.movimientosStockService.create(createMovimientosStockDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar movimientos de stock con paginación y filtros' })
  @ApiOkResponse({ description: 'Listado paginado de movimientos de stock' })
  @ApiBadRequestResponse({ description: 'Parámetros de consulta inválidos' })
  findAll(@Query() query: QueryMovimientosStockDto) {
    return this.movimientosStockService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener movimiento de stock por ID' })
  @ApiOkResponse({ description: 'Movimiento de stock encontrado' })
  @ApiNotFoundResponse({ description: 'Movimiento de stock no encontrado' })
  findOne(@Param('id') id: string) {
    return this.movimientosStockService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar movimiento de stock' })
  @ApiOkResponse({ description: 'Movimiento de stock actualizado correctamente' })
  @ApiNotFoundResponse({ description: 'Movimiento de stock no encontrado' })
  update(@Param('id') id: string, @Body() updateMovimientosStockDto: UpdateMovimientosStockDto) {
    return this.movimientosStockService.update(id, updateMovimientosStockDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar movimiento de stock' })
  @ApiOkResponse({ description: 'Movimiento de stock eliminado correctamente' })
  @ApiNotFoundResponse({ description: 'Movimiento de stock no encontrado' })
  remove(@Param('id') id: string) {
    return this.movimientosStockService.remove(id);
  }
}
