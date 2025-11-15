import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsIn, IsOptional } from 'class-validator';

export class CreateMenuDto {
    @ApiPropertyOptional({
        description: 'Fecha del menú (YYYY-MM-DD)',
        example: '2025-01-15',
    })
    @IsOptional()
    @IsDateString()
    fecha: string;

    @ApiPropertyOptional({
        description: 'Tipo de comida',
        example: 'ALMUERZO',
        enum: ['DESAYUNO', 'ALMUERZO', 'CENA'],
    })
    @IsOptional()
    @IsIn(['DESAYUNO', 'ALMUERZO', 'CENA'])
    comida: 'DESAYUNO' | 'ALMUERZO' | 'CENA';
}
