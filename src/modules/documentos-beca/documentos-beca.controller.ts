import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DocumentosBecaService } from './documentos-beca.service';
import { CreateDocumentosBecaDto } from './dto/create-documentos-beca.dto';
import { UpdateDocumentosBecaDto } from './dto/update-documentos-beca.dto';
import { QueryDocumentosBecaDto } from './dto/query-documentos-beca.dto';

@ApiTags('documentos-beca')
@Controller('documentos-beca')
export class DocumentosBecaController {
  constructor(private readonly documentosBecaService: DocumentosBecaService) {}

  @Post()
  @ApiOperation({ summary: 'Subir documento de beca' })
  @ApiCreatedResponse({ description: 'Documento de beca creado correctamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  create(@Body() createDocumentosBecaDto: CreateDocumentosBecaDto) {
    return this.documentosBecaService.create(createDocumentosBecaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar documentos de beca con paginación y filtros' })
  @ApiOkResponse({ description: 'Listado paginado de documentos de beca' })
  @ApiBadRequestResponse({ description: 'Parámetros de consulta inválidos' })
  findAll(@Query() query: QueryDocumentosBecaDto) {
    return this.documentosBecaService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener documento de beca por ID' })
  @ApiOkResponse({ description: 'Documento de beca encontrado' })
  @ApiNotFoundResponse({ description: 'Documento de beca no encontrado' })
  findOne(@Param('id') id: string) {
    return this.documentosBecaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar documento de beca' })
  @ApiOkResponse({ description: 'Documento de beca actualizado correctamente' })
  @ApiNotFoundResponse({ description: 'Documento de beca no encontrado' })
  update(@Param('id') id: string, @Body() updateDocumentosBecaDto: UpdateDocumentosBecaDto) {
    return this.documentosBecaService.update(id, updateDocumentosBecaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar documento de beca' })
  @ApiOkResponse({ description: 'Documento de beca eliminado correctamente' })
  @ApiNotFoundResponse({ description: 'Documento de beca no encontrado' })
  remove(@Param('id') id: string) {
    return this.documentosBecaService.remove(id);
  }
}
