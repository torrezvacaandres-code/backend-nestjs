import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from 'class-validator';

export class CreatePlatoDto {
    @ApiPropertyOptional({
        description: 'Nombre del plato',
        example: 'Lomo saltado',
    })
    @IsOptional()
    @IsString()
    nombre: string;

    @ApiPropertyOptional({
        description: 'Descripción del plato',
        example: 'Clásico plato peruano con carne y verduras',
    })
    @IsOptional()
    @IsString()
    descripcion: string;

    @ApiPropertyOptional({
        description: 'Categoría del plato',
        example: 'Fondo',
    })
    @IsOptional()
    @IsString()
    categoria: string;
}
