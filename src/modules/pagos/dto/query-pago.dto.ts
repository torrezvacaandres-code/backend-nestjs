import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination-query.dto';

export class QueryPagoDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ['creadoEn', 'monto', 'estado'], default: 'creadoEn' })
  @IsOptional()
  @IsIn(['creadoEn', 'monto', 'estado'])
  sortBy?: 'creadoEn' | 'monto' | 'estado' = 'creadoEn';

  @ApiPropertyOptional({ enum: ['ASC', 'DESC'], default: 'DESC' })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortDir?: 'ASC' | 'DESC' = 'DESC';

  @ApiPropertyOptional({ description: 'Filtrar por persona (ID)' })
  @IsOptional()
  @IsString()
  personaId?: string;

  @ApiPropertyOptional({ enum: ['PENDIENTE', 'APROBADO', 'RECHAZADO', 'ANULADO'], description: 'Filtrar por estado' })
  @IsOptional()
  @IsIn(['PENDIENTE', 'APROBADO', 'RECHAZADO', 'ANULADO'])
  estado?: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO' | 'ANULADO';

  @ApiPropertyOptional({ description: 'Filtrar por proveedor de pago (contiene)' })
  @IsOptional()
  @IsString()
  proveedor?: string;

  @ApiPropertyOptional({ description: 'Filtrar por referencia de pago (contiene)' })
  @IsOptional()
  @IsString()
  referencia?: string;

  @ApiPropertyOptional({ description: 'Filtrar por moneda', example: 'BOB' })
  @IsOptional()
  @IsString()
  moneda?: string;
}
