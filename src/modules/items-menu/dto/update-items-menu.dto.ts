import { PartialType } from '@nestjs/mapped-types';
import { CreateItemsMenuDto } from './create-items-menu.dto';

export class UpdateItemsMenuDto extends PartialType(CreateItemsMenuDto) {}
