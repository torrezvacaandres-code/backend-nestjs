import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination-query.dto';

export class QueryPlatoDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ['nombre', 'categoria', 'descripcion'], default: 'nombre' })
  @IsOptional()
  @IsIn(['nombre', 'categoria', 'descripcion'])
  sortBy?: 'nombre' | 'categoria' | 'descripcion' = 'nombre';

  @ApiPropertyOptional({ enum: ['ASC', 'DESC'], default: 'ASC' })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortDir?: 'ASC' | 'DESC' = 'ASC';

  @ApiPropertyOptional({ description: 'Filtrar por categoría exacta', example: 'Fondo' })
  @IsOptional()
  @IsString()
  categoria?: string;
}
