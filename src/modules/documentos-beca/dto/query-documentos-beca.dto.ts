import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination-query.dto';

export class QueryDocumentosBecaDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ['subidoEn', 'nombreArchivo', 'tipoMime'], default: 'subidoEn' })
  @IsOptional()
  @IsIn(['subidoEn', 'nombreArchivo', 'tipoMime'])
  sortBy?: 'subidoEn' | 'nombreArchivo' | 'tipoMime' = 'subidoEn';

  @ApiPropertyOptional({ enum: ['ASC', 'DESC'], default: 'DESC' })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortDir?: 'ASC' | 'DESC' = 'DESC';

  @ApiPropertyOptional({ description: 'Filtrar por beca (ID)' })
  @IsOptional()
  @IsString()
  becaId?: string;

  @ApiPropertyOptional({ description: 'Filtrar por tipo MIME (contiene)' })
  @IsOptional()
  @IsString()
  tipoMime?: string;

  @ApiPropertyOptional({ description: 'Filtrar por fecha de subida (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  subidoEn?: string;
}
