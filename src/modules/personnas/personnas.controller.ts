import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonnasService } from './personnas.service';
import { CreatePersonnaDto } from './dto/create-personna.dto';
import { UpdatePersonnaDto } from './dto/update-personna.dto';

@Controller('personnas')
export class PersonnasController {
  constructor(private readonly personnasService: PersonnasService) {}

  @Post()
  create(@Body() createPersonnaDto: CreatePersonnaDto) {
    return this.personnasService.create(createPersonnaDto);
  }

  @Get()
  findAll() {
    return this.personnasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personnasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonnaDto: UpdatePersonnaDto) {
    return this.personnasService.update(+id, updatePersonnaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personnasService.remove(+id);
  }
}
