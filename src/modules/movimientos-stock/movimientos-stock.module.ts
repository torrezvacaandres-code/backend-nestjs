import { Module } from '@nestjs/common';
import { MovimientosStockService } from './movimientos-stock.service';
import { MovimientosStockController } from './movimientos-stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientosStock } from '../../entities/movimientosStock';
import { Insumos } from '../../entities/insumos';
import { Compras } from '../../entities/compras';
import { Tickets } from '../../entities/tickets';

@Module({
  imports: [TypeOrmModule.forFeature([MovimientosStock, Insumos, Compras, Tickets])],
  controllers: [MovimientosStockController],
  providers: [MovimientosStockService],
})
export class MovimientosStockModule {}
