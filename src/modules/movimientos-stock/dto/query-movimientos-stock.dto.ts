import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination-query.dto';

export class QueryMovimientosStockDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ['creadoEn', 'cantidad', 'tipo'], default: 'creadoEn' })
  @IsOptional()
  @IsIn(['creadoEn', 'cantidad', 'tipo'])
  sortBy?: 'creadoEn' | 'cantidad' | 'tipo' = 'creadoEn';

  @ApiPropertyOptional({ enum: ['ASC', 'DESC'], default: 'DESC' })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortDir?: 'ASC' | 'DESC' = 'DESC';

  @ApiPropertyOptional({ description: 'Filtrar por insumo (ID)' })
  @IsOptional()
  @IsString()
  insumoId?: string;

  @ApiPropertyOptional({ enum: ['ENTRADA', 'SALIDA', 'AJUSTE'], description: 'Filtrar por tipo de movimiento' })
  @IsOptional()
  @IsIn(['ENTRADA', 'SALIDA', 'AJUSTE'])
  tipo?: 'ENTRADA' | 'SALIDA' | 'AJUSTE';

  @ApiPropertyOptional({ description: 'Filtrar por referencia de compra (ID)' })
  @IsOptional()
  @IsString()
  referenciaCompraId?: string;

  @ApiPropertyOptional({ description: 'Filtrar por referencia de ticket (ID)' })
  @IsOptional()
  @IsString()
  referenciaTicketId?: string;

  @ApiPropertyOptional({ description: 'Filtrar por fecha de creación (ISO date)', example: '2025-01-15T10:00:00Z' })
  @IsOptional()
  @IsDateString()
  creadoEn?: string;
}
