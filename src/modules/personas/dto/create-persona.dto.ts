import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsISO8601, IsOptional, IsString } from 'class-validator';

export class CreatePersonaDto {
    @ApiPropertyOptional({
        description: 'Nombre completo de la persona',
        example: 'Juan Perez',
    })
    @IsOptional()
    @IsString()
    nombreCompleto: string;

    @ApiPropertyOptional({
        description: 'Documento de identidad',
        example: '12345678',
    })
    @IsOptional()
    @IsString()
    documento: string;

    @ApiPropertyOptional({
        description: 'Indica si la persona es becada',
        example: false,
    })
    @IsOptional()
    @IsBoolean()
    esBecado: boolean;

    @ApiPropertyOptional({
        description: 'Fecha de creación (ISO 8601)',
        example: '2025-01-15T10:00:00Z',
    })
    @IsOptional()
    @IsISO8601()
    creadoEn: string;
}
