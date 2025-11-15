import { Module } from '@nestjs/common';
import { InsumosService } from './insumos.service';
import { InsumosController } from './insumos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insumos } from '../../entities/insumos';

@Module({
  imports: [TypeOrmModule.forFeature([Insumos])],
  controllers: [InsumosController],
  providers: [InsumosService],
})
export class InsumosModule {}
