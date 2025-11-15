import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination-query.dto';

export class QueryProveedoreDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ['nombre', 'nit', 'contacto'], default: 'nombre' })
  @IsOptional()
  @IsIn(['nombre', 'nit', 'contacto'])
  sortBy?: 'nombre' | 'nit' | 'contacto' = 'nombre';

  @ApiPropertyOptional({ enum: ['ASC', 'DESC'], default: 'ASC' })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortDir?: 'ASC' | 'DESC' = 'ASC';

  @ApiPropertyOptional({ description: 'Filtrar por nombre (contiene)' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ description: 'Filtrar por NIT exacto' })
  @IsOptional()
  @IsString()
  nit?: string;

  @ApiPropertyOptional({ description: 'Filtrar por contacto (contiene)' })
  @IsOptional()
  @IsString()
  contacto?: string;
}
