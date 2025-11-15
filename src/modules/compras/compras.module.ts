import { Module } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { ComprasController } from './compras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compras } from '../../entities/compras';

@Module({
  imports: [TypeOrmModule.forFeature([Compras])],
  controllers: [ComprasController],
  providers: [ComprasService],
})
export class ComprasModule {}
