import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination-query.dto';

export class QueryTicketDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ['creadoEn', 'validoEl', 'estado'], default: 'creadoEn' })
  @IsOptional()
  @IsIn(['creadoEn', 'validoEl', 'estado'])
  sortBy?: 'creadoEn' | 'validoEl' | 'estado' = 'creadoEn';

  @ApiPropertyOptional({ enum: ['ASC', 'DESC'], default: 'DESC' })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortDir?: 'ASC' | 'DESC' = 'DESC';

  @ApiPropertyOptional({ description: 'Filtrar por persona (ID)' })
  @IsOptional()
  @IsString()
  personaId?: string;

  @ApiPropertyOptional({ enum: ['EMITIDO', 'UTILIZADO', 'CANCELADO', 'EXPIRADO'], description: 'Filtrar por estado' })
  @IsOptional()
  @IsIn(['EMITIDO', 'UTILIZADO', 'CANCELADO', 'EXPIRADO'])
  estado?: 'EMITIDO' | 'UTILIZADO' | 'CANCELADO' | 'EXPIRADO';

  @ApiPropertyOptional({ description: 'Filtrar por fecha válida (YYYY-MM-DD)', example: '2025-02-01' })
  @IsOptional()
  @IsDateString()
  validoEl?: string;

  @ApiPropertyOptional({ description: 'Búsqueda por código (contiene)' })
  @IsOptional()
  @IsString()
  codigo?: string;
}
