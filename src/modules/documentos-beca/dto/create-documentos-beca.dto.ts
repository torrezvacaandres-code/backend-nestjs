import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateDocumentosBecaDto {
  @ApiProperty({ description: 'ID de la beca', example: '21' })
  @IsString()
  becaId: string;

  @ApiProperty({ description: 'Nombre del archivo', example: 'carnet_frente.pdf' })
  @IsString()
  nombreArchivo: string;

  @ApiProperty({ description: 'Tipo MIME del archivo', example: 'application/pdf' })
  @IsString()
  tipoMime: string;

  @ApiProperty({ description: 'URL de almacenamiento del archivo', example: 'https://files.example.com/abc123.pdf' })
  @IsString()
  urlAlmacenamiento: string;

  @ApiPropertyOptional({ description: 'Fecha de subida (ISO 8601)', example: '2025-02-01T10:00:00Z' })
  @IsOptional()
  @IsDateString()
  subidoEn?: string;
}
