import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsOptional } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination-query.dto';

export class QueryMenuDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ['fecha', 'comida'], default: 'fecha' })
  @IsOptional()
  @IsIn(['fecha', 'comida'])
  sortBy?: 'fecha' | 'comida' = 'fecha';

  @ApiPropertyOptional({ enum: ['ASC', 'DESC'], default: 'ASC' })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortDir?: 'ASC' | 'DESC' = 'ASC';

  @ApiPropertyOptional({ description: 'Filtrar por fecha (YYYY-MM-DD)', example: '2025-01-15' })
  @IsOptional()
  @IsDateString()
  fecha?: string;

  @ApiPropertyOptional({ enum: ['DESAYUNO', 'ALMUERZO', 'CENA'], description: 'Filtrar por tipo de comida' })
  @IsOptional()
  @IsIn(['DESAYUNO', 'ALMUERZO', 'CENA'])
  comida?: 'DESAYUNO' | 'ALMUERZO' | 'CENA';
}
