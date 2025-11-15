import { Module } from '@nestjs/common';
import { BecasService } from './becas.service';
import { BecasController } from './becas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Becas } from '../../entities/becas';

@Module({
  imports: [TypeOrmModule.forFeature([Becas])],
  controllers: [BecasController],
  providers: [BecasService],
})
export class BecasModule {}
