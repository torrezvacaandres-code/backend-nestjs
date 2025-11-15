import { Injectable } from '@nestjs/common';
import { CreatePersonnaDto } from './dto/create-personna.dto';
import { UpdatePersonnaDto } from './dto/update-personna.dto';

@Injectable()
export class PersonnasService {
  create(createPersonnaDto: CreatePersonnaDto) {
    return 'This action adds a new personna';
  }

  findAll() {
    return `This action returns all personnas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personna`;
  }

  update(id: number, updatePersonnaDto: UpdatePersonnaDto) {
    return `This action updates a #${id} personna`;
  }

  remove(id: number) {
    return `This action removes a #${id} personna`;
  }
}
