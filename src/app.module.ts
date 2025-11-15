import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config';
import { InsumosModule } from './modules/insumos/insumos.module';
import { MenusModule } from './modules/menus/menus.module';
import { PlatosModule } from './modules/platos/platos.module';
import { ProveedoresModule } from './modules/proveedores/proveedores.module';
import { ComprasModule } from './modules/compras/compras.module';
import { ItemsCompraModule } from './modules/items-compra/items-compra.module';
import { MovimientosStockModule } from './modules/movimientos-stock/movimientos-stock.module';
import { ReservasModule } from './modules/reservas/reservas.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { PagosModule } from './modules/pagos/pagos.module';
import { BecasModule } from './modules/becas/becas.module';
import { DocumentosBecaModule } from './modules/documentos-beca/documentos-beca.module';
import { ItemsMenuModule } from './modules/items-menu/items-menu.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    // Feature modules
    InsumosModule,
    MenusModule,
    PlatosModule,
    ProveedoresModule,
    ComprasModule,
    ItemsCompraModule,
    MovimientosStockModule,
    ReservasModule,
    TicketsModule,
    PagosModule,
    BecasModule,
    DocumentosBecaModule,
    ItemsMenuModule
  ],
  
  
})
export class AppModule {}
