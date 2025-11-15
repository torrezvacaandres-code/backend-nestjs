import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateInsumoDto {
    @ApiPropertyOptional({
        description: 'SKU del insumo',
        example: '1234567890',
    })
    @IsOptional()
    @IsString()
    sku: string;

    @ApiPropertyOptional({
        description: 'Nombre del insumo',
        example: 'Insumo 1',
    })
    @IsOptional()
    @IsString()
    nombre: string;

    @ApiPropertyOptional({
        description: 'Unidad del insumo',
        example: 'Unidad',
    })
    @IsOptional()
    @IsString()
    unidad: string;

    @ApiPropertyOptional({
        description: 'Vida útil del insumo',
        example: 10,
    })
    @IsOptional()
    @IsNumber()
    vidaUtilDias: number;
}
