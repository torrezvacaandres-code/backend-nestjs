import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateItemsCompraDto {
  @ApiProperty({ description: 'ID de la compra', example: '5' })
  @IsString()
  compraId: string;

  @ApiProperty({ description: 'ID del insumo', example: '12' })
  @IsString()
  insumoId: string;

  @ApiProperty({ description: 'Cantidad comprada', example: 10.5 })
  @IsNumber()
  @Min(0.0001)
  cantidad: number;

  @ApiProperty({ description: 'Costo unitario', example: 3.25 })
  @IsNumber()
  @Min(0)
  costoUnitario: number;

  @ApiProperty({ required: false, description: 'Fecha de vencimiento (YYYY-MM-DD)', example: '2025-03-01' })
  @IsOptional()
  @IsDateString()
  venceEl?: string;
}
