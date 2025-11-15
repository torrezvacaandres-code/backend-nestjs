import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({ description: 'ID de la persona', example: '15' })
  @IsString()
  personaId: string;

  @ApiPropertyOptional({ description: 'ID del item de menú (opcional si hay reserva)', example: '22' })
  @IsOptional()
  @IsString()
  itemMenuId?: string;

  @ApiPropertyOptional({ description: 'ID de la reserva (opcional)', example: 'd3b07384-...uuid' })
  @IsOptional()
  @IsString()
  reservaId?: string;

  @ApiPropertyOptional({ description: 'Estado del ticket', enum: ['EMITIDO','UTILIZADO','CANCELADO','EXPIRADO'], example: 'EMITIDO' })
  @IsOptional()
  @IsIn(['EMITIDO','UTILIZADO','CANCELADO','EXPIRADO'])
  estado?: 'EMITIDO' | 'UTILIZADO' | 'CANCELADO' | 'EXPIRADO';

  @ApiProperty({ description: 'Fecha válida (YYYY-MM-DD)', example: '2025-02-01' })
  @IsDateString()
  validoEl: string;

  @ApiPropertyOptional({ description: 'Código del ticket', example: 'ABC-123-XYZ' })
  @IsOptional()
  @IsString()
  codigo?: string;
}
