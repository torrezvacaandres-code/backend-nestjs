import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateReservaDto {
  @ApiProperty({ description: 'ID de la persona', example: '15' })
  @IsString()
  personaId: string;

  @ApiProperty({ description: 'ID del item de menú', example: '22' })
  @IsString()
  itemMenuId: string;

  @ApiPropertyOptional({ description: 'Estado de la reserva', example: 'RESERVADA' })
  @IsOptional()
  @IsString()
  estado?: string;
}
