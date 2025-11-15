import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination-query.dto';

export class QueryCompraDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ['fechaCompra', 'total', 'nroFactura', 'creadoEn'], default: 'fechaCompra' })
  @IsOptional()
  @IsIn(['fechaCompra', 'total', 'nroFactura', 'creadoEn'])
  sortBy?: 'fechaCompra' | 'total' | 'nroFactura' | 'creadoEn' = 'fechaCompra';

  @ApiPropertyOptional({ enum: ['ASC', 'DESC'], default: 'ASC' })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortDir?: 'ASC' | 'DESC' = 'ASC';

  @ApiPropertyOptional({ description: 'Filtrar por proveedor (ID)' })
  @IsOptional()
  @IsString()
  proveedorId?: string;

  @ApiPropertyOptional({ description: 'Filtrar por fecha de compra (YYYY-MM-DD)', example: '2025-01-15' })
  @IsOptional()
  @IsDateString()
  fechaCompra?: string;

  @ApiPropertyOptional({ description: 'Búsqueda por número de factura (contiene)' })
  @IsOptional()
  @IsString()
  nroFactura?: string;
}
