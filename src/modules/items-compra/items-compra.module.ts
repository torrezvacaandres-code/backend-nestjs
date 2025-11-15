import { Module } from '@nestjs/common';
import { ItemsCompraService } from './items-compra.service';
import { ItemsCompraController } from './items-compra.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsCompra } from '../../entities/itemsCompra';
import { Compras } from '../../entities/compras';
import { Insumos } from '../../entities/insumos';

@Module({
  imports: [TypeOrmModule.forFeature([ItemsCompra, Compras, Insumos])],
  controllers: [ItemsCompraController],
  providers: [ItemsCompraService],
})
export class ItemsCompraModule {}
