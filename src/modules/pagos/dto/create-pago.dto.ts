import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreatePagoDto {
  @ApiProperty({ description: 'ID de la persona', example: '15' })
  @IsString()
  personaId: string;

  @ApiPropertyOptional({ description: 'ID del ticket asociado', example: 'c0a8012b-...uuid' })
  @IsOptional()
  @IsString()
  ticketId?: string;

  @ApiProperty({ description: 'Monto del pago', example: 25.5 })
  @IsNumber()
  @Min(0.01)
  monto: number;

  @ApiPropertyOptional({ description: 'Moneda', example: 'BOB', default: 'BOB' })
  @IsOptional()
  @IsString()
  moneda?: string;

  @ApiPropertyOptional({ description: 'Proveedor de cobro', example: 'QR-Banco' })
  @IsOptional()
  @IsString()
  proveedor?: string;

  @ApiPropertyOptional({ description: 'Referencia del pago', example: 'TX-123456' })
  @IsOptional()
  @IsString()
  referencia?: string;

  @ApiPropertyOptional({ description: 'Estado del pago', enum: ['PENDIENTE','APROBADO','RECHAZADO','ANULADO'], example: 'PENDIENTE' })
  @IsOptional()
  @IsIn(['PENDIENTE','APROBADO','RECHAZADO','ANULADO'])
  estado?: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO' | 'ANULADO';
}
