import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagos } from '../../entities/pagos';

@Module({
  imports: [TypeOrmModule.forFeature([Pagos])],
  controllers: [PagosController],
  providers: [PagosService],
})
export class PagosModule {}
