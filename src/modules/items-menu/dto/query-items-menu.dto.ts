import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination-query.dto';

export class QueryItemsMenuDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ['precio', 'racionesPlaneadas', 'racionesDisponibles'], default: 'precio' })
  @IsOptional()
  @IsIn(['precio', 'racionesPlaneadas', 'racionesDisponibles'])
  sortBy?: 'precio' | 'racionesPlaneadas' | 'racionesDisponibles' = 'precio';

  @ApiPropertyOptional({ enum: ['ASC', 'DESC'], default: 'ASC' })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortDir?: 'ASC' | 'DESC' = 'ASC';

  @ApiPropertyOptional({ description: 'Filtrar por menú (ID)' })
  @IsOptional()
  @IsString()
  menuId?: string;

  @ApiPropertyOptional({ description: 'Filtrar por plato (ID)' })
  @IsOptional()
  @IsString()
  platoId?: string;
}
