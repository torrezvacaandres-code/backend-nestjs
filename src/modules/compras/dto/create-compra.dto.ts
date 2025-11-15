import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCompraDto {
  @ApiPropertyOptional({ description: 'Número de factura', example: 'F-2025-001' })
  @IsOptional()
  @IsString()
  nroFactura?: string;

  @ApiPropertyOptional({ description: 'Total de la compra', example: 1250.5 })
  @IsOptional()
  @IsNumber()
  total?: number;

  @ApiPropertyOptional({ description: 'Fecha de la compra (YYYY-MM-DD)', example: '2025-02-01' })
  @IsOptional()
  @IsDateString()
  fechaCompra?: string;

  @ApiPropertyOptional({ description: 'ID del proveedor', example: '12' })
  @IsOptional()
  @IsString()
  proveedorId?: string;
}
