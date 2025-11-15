import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateDocumentosBecaDto } from './dto/create-documentos-beca.dto';
import { UpdateDocumentosBecaDto } from './dto/update-documentos-beca.dto';
import { DocumentosBeca } from '../../entities/documentosBeca';
import { QueryDocumentosBecaDto } from './dto/query-documentos-beca.dto';
import { PaginationHelper } from '../../common/helper/pagination.helper';

@Injectable()
export class DocumentosBecaService {
  constructor(
    @InjectRepository(DocumentosBeca)
    private readonly docsRepo: Repository<DocumentosBeca>,
  ) {}

  async create(dto: CreateDocumentosBecaDto): Promise<DocumentosBeca> {
    const entity = this.docsRepo.create(dto as Partial<DocumentosBeca>);
    return this.docsRepo.save(entity);
  }

  async findAll(query: QueryDocumentosBecaDto) {
    const { becaId, tipoMime, subidoEn, sortBy = 'subidoEn', sortDir = 'DESC', search } = query as any;

    const baseFilter: any = {};
    if (becaId) baseFilter.beca = { id: String(becaId) };
    if (subidoEn) baseFilter.subidoEn = subidoEn;

    let where: any = undefined;
    const fuzzy: any[] = [];
    if (search) fuzzy.push({ nombreArchivo: ILike(`%${search}%`) }, { tipoMime: ILike(`%${search}%`) });
    if (tipoMime) fuzzy.push({ tipoMime: ILike(`%${tipoMime}%`) });

    if (fuzzy.length > 0) where = fuzzy.map((f) => ({ ...baseFilter, ...f }));
    else if (Object.keys(baseFilter).length > 0) where = baseFilter;

    return PaginationHelper.paginate(this.docsRepo, query, {
      where,
      order: { [sortBy]: sortDir },
      relations: ['beca'],
    });
  }

  async findOne(id: number | string): Promise<DocumentosBeca> {
    const entity = await this.docsRepo.findOne({ where: { id: String(id) }, relations: ['beca'] });
    if (!entity) throw new NotFoundException('Documento de beca no encontrado');
    return entity;
  }

  async update(id: number | string, dto: UpdateDocumentosBecaDto): Promise<DocumentosBeca> {
    const preload = await this.docsRepo.preload({ id: String(id), ...(dto as any) });
    if (!preload) throw new NotFoundException('Documento de beca no encontrado');
    return this.docsRepo.save(preload);
  }

  async remove(id: number | string): Promise<void> {
    const result = await this.docsRepo.delete(String(id));
    if (!result.affected) throw new NotFoundException('Documento de beca no encontrado');
  }
}
