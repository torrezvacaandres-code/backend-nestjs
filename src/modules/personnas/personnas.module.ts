import { Module } from '@nestjs/common';
import { PersonnasService } from './personnas.service';
import { PersonnasController } from './personnas.controller';

@Module({
  controllers: [PersonnasController],
  providers: [PersonnasService],
})
export class PersonnasModule {}
