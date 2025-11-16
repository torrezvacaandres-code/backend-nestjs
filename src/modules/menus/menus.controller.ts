import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { QueryMenuDto } from './dto/query-menu.dto';

@ApiTags('menus')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un menú' })
  @ApiCreatedResponse({ description: 'Menú creado correctamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos o violación de unicidad' })
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar menús con paginación y filtros' })
  @ApiOkResponse({ description: 'Listado paginado de menús' })
  @ApiBadRequestResponse({ description: 'Parámetros de consulta inválidos' })
  findAll(@Query() query: QueryMenuDto) {
    return this.menusService.findAll(query);
  }

  @Get('semanal')
  @ApiOperation({ summary: 'Listar menús de la semana actual' })
  @ApiOkResponse({ description: 'Listado de menús de la semana' })
  findWeekly() {
    return this.menusService.findWeekly();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un menú por ID' })
  @ApiOkResponse({ description: 'Menú encontrado' })
  @ApiNotFoundResponse({ description: 'Menú no encontrado' })
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un menú' })
  @ApiOkResponse({ description: 'Menú actualizado correctamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos o violación de unicidad' })
  @ApiNotFoundResponse({ description: 'Menú no encontrado' })
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un menú' })
  @ApiOkResponse({ description: 'Menú eliminado correctamente' })
  @ApiNotFoundResponse({ description: 'Menú no encontrado' })
  remove(@Param('id') id: string) {
    return this.menusService.remove(id);
  }
}
