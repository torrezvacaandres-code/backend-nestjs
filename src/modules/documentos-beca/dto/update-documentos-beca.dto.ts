import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentosBecaDto } from './create-documentos-beca.dto';

export class UpdateDocumentosBecaDto extends PartialType(CreateDocumentosBecaDto) {}
