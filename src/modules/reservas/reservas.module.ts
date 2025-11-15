import { Module } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservas } from '../../entities/reservas';
 
import { ItemsMenu } from '../../entities/itemsMenu';
import { Personas } from 'src/entities/personas';

@Module({
  imports: [TypeOrmModule.forFeature([Reservas, Personas, ItemsMenu])],
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}
