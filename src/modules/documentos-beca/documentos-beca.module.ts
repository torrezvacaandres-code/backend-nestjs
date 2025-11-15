import { Module } from '@nestjs/common';
import { DocumentosBecaService } from './documentos-beca.service';
import { DocumentosBecaController } from './documentos-beca.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentosBeca } from '../../entities/documentosBeca';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentosBeca])],
  controllers: [DocumentosBecaController],
  providers: [DocumentosBecaService],
})
export class DocumentosBecaModule {}
