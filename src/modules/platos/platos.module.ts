import { Module } from '@nestjs/common';
import { PlatosService } from './platos.service';
import { PlatosController } from './platos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Platos } from '../../entities/platos';

@Module({
  imports: [TypeOrmModule.forFeature([Platos])],
  controllers: [PlatosController],
  providers: [PlatosService],
})
export class PlatosModule {}
