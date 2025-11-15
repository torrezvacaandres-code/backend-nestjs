import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination-query.dto';

export class QueryReservaDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ['creadoEn', 'estado'], default: 'creadoEn' })
  @IsOptional()
  @IsIn(['creadoEn', 'estado'])
  sortBy?: 'creadoEn' | 'estado' = 'creadoEn';

  @ApiPropertyOptional({ enum: ['ASC', 'DESC'], default: 'DESC' })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortDir?: 'ASC' | 'DESC' = 'DESC';

  @ApiPropertyOptional({ description: 'Filtrar por persona (ID)' })
  @IsOptional()
  @IsString()
  personaId?: string;

  @ApiPropertyOptional({ description: 'Filtrar por item de menú (ID)' })
  @IsOptional()
  @IsString()
  itemMenuId?: string;

  @ApiPropertyOptional({ description: 'Filtrar por estado', example: 'RESERVADA' })
  @IsOptional()
  @IsString()
  estado?: string;

  @ApiPropertyOptional({ description: 'Filtrar por fecha de creación (ISO 8601)', example: '2025-01-15T10:00:00Z' })
  @IsOptional()
  @IsDateString()
  creadoEn?: string;
}
