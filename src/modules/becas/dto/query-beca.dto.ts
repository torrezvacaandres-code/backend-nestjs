import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination-query.dto';

export class QueryBecaDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ['creadoEn', 'vigenteDesde', 'vigenteHasta', 'estado'], default: 'creadoEn' })
  @IsOptional()
  @IsIn(['creadoEn', 'vigenteDesde', 'vigenteHasta', 'estado'])
  sortBy?: 'creadoEn' | 'vigenteDesde' | 'vigenteHasta' | 'estado' = 'creadoEn';

  @ApiPropertyOptional({ enum: ['ASC', 'DESC'], default: 'DESC' })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortDir?: 'ASC' | 'DESC' = 'DESC';

  @ApiPropertyOptional({ description: 'Filtrar por persona (ID)' })
  @IsOptional()
  @IsString()
  personaId?: string;

  @ApiPropertyOptional({ description: 'Filtrar por estado', example: 'ACTIVA' })
  @IsOptional()
  @IsString()
  estado?: string;

  @ApiPropertyOptional({ description: 'Filtrar por tipo', example: 'ALIMENTACION' })
  @IsOptional()
  @IsString()
  tipo?: string;

  @ApiPropertyOptional({ description: 'Filtrar por vigencia desde (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  vigenteDesde?: string;

  @ApiPropertyOptional({ description: 'Filtrar por vigencia hasta (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  vigenteHasta?: string;
}
