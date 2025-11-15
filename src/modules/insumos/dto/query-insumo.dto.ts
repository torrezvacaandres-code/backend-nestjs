import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination-query.dto';

export class QueryInsumoDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ['nombre', 'sku', 'unidad', 'vidaUtilDias'], default: 'nombre' })
  @IsOptional()
  @IsIn(['nombre', 'sku', 'unidad', 'vidaUtilDias'])
  sortBy?: 'nombre' | 'sku' | 'unidad' | 'vidaUtilDias' = 'nombre';

  @ApiPropertyOptional({ enum: ['ASC', 'DESC'], default: 'ASC' })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortDir?: 'ASC' | 'DESC' = 'ASC';

  @ApiPropertyOptional({ description: 'Filtrar por unidad exacta', example: 'Unidad' })
  @IsOptional()
  @IsString()
  unidad?: string;

  @ApiPropertyOptional({ description: 'Filtrar por vida útil (días) exacta', example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  vidaUtilDias?: number;
}
