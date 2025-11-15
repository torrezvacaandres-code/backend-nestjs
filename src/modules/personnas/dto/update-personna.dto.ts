import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonnaDto } from './create-personna.dto';

export class UpdatePersonnaDto extends PartialType(CreatePersonnaDto) {}
