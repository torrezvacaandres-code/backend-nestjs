import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateBecaDto {
  @ApiProperty({ description: 'ID de la persona beneficiaria', example: '15' })
  @IsString()
  personaId: string;

  @ApiProperty({ description: 'Tipo de beca', example: 'ALIMENTACION' })
  @IsString()
  tipo: string;

  @ApiProperty({ description: 'Estado de la beca', example: 'ACTIVA' })
  @IsString()
  estado: string;

  @ApiProperty({ description: 'Vigente desde (YYYY-MM-DD)', example: '2025-02-01' })
  @IsDateString()
  vigenteDesde: string;

  @ApiPropertyOptional({ description: 'Vigente hasta (YYYY-MM-DD)', example: '2025-06-30' })
  @IsOptional()
  @IsDateString()
  vigenteHasta?: string;

  @ApiProperty({ description: 'Cuota diaria', example: 1 })
  @IsNumber()
  @Min(1)
  cuotaDiaria: number;
}
