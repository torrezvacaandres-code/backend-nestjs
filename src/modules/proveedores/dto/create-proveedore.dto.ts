import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from 'class-validator';

export class CreateProveedoreDto {
    @ApiPropertyOptional({
        description: 'Nombre del proveedor',
        example: 'Proveedor S.A.',
    })
    @IsOptional()
    @IsString()
    nombre: string;

    @ApiPropertyOptional({
        description: 'NIT del proveedor',
        example: '900123456-7',
    })
    @IsOptional()
    @IsString()
    nit: string;

    @ApiPropertyOptional({
        description: 'Información de contacto',
        example: '+57 300 123 4567',
    })
    @IsOptional()
    @IsString()
    contacto: string;
}
