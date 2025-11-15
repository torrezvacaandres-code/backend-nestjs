import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination-query.dto';

export class QueryItemsCompraDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ['venceEl', 'cantidad', 'costoUnitario'], default: 'venceEl' })
  @IsOptional()
  @IsIn(['venceEl', 'cantidad', 'costoUnitario'])
  sortBy?: 'venceEl' | 'cantidad' | 'costoUnitario' = 'venceEl';

  @ApiPropertyOptional({ enum: ['ASC', 'DESC'], default: 'ASC' })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortDir?: 'ASC' | 'DESC' = 'ASC';

  @ApiPropertyOptional({ description: 'Filtrar por compra (ID)' })
  @IsOptional()
  @IsString()
  compraId?: string;

  @ApiPropertyOptional({ description: 'Filtrar por insumo (ID)' })
  @IsOptional()
  @IsString()
  insumoId?: string;

  @ApiPropertyOptional({ description: 'Filtrar por fecha de vencimiento (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  venceEl?: string;
}
