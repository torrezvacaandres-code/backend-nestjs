import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateItemsMenuDto {
  @ApiProperty({ description: 'ID del menú', example: '10' })
  @IsString()
  menuId: string;

  @ApiProperty({ description: 'ID del plato', example: '5' })
  @IsString()
  platoId: string;

  @ApiPropertyOptional({ description: 'Precio del item', example: 20.5 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  precio?: number;

  @ApiPropertyOptional({ description: 'Raciones planeadas', example: 50 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  racionesPlaneadas?: number;

  @ApiPropertyOptional({ description: 'Raciones disponibles', example: 50 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  racionesDisponibles?: number;
}
