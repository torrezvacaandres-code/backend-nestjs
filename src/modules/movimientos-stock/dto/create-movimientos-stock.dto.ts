import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateMovimientosStockDto {
  @ApiProperty({ description: 'ID del insumo', example: '12' })
  @IsString()
  insumoId: string;

  @ApiProperty({ description: 'Tipo de movimiento', enum: ['ENTRADA','SALIDA','AJUSTE'], example: 'ENTRADA' })
  @IsIn(['ENTRADA','SALIDA','AJUSTE'])
  tipo: 'ENTRADA' | 'SALIDA' | 'AJUSTE';

  @ApiProperty({ description: 'Cantidad del movimiento', example: 5.75 })
  @IsNumber()
  @Min(0.0001)
  cantidad: number;

  @ApiPropertyOptional({ description: 'Motivo del movimiento', example: 'Ingreso por compra' })
  @IsOptional()
  @IsString()
  motivo?: string;

  @ApiPropertyOptional({ description: 'ID de compra referenciada', example: '7' })
  @IsOptional()
  @IsString()
  referenciaCompraId?: string;

  @ApiPropertyOptional({ description: 'ID de ticket referenciado', example: 'c0a8012b-...uuid' })
  @IsOptional()
  @IsString()
  referenciaTicketId?: string;

  @ApiPropertyOptional({ description: 'Fecha de creación (ISO 8601)', example: '2025-02-01T10:00:00Z' })
  @IsOptional()
  @IsDateString()
  creadoEn?: string;
}
