import { PartialType } from '@nestjs/mapped-types';
import { CreateItemsCompraDto } from './create-items-compra.dto';

export class UpdateItemsCompraDto extends PartialType(CreateItemsCompraDto) {}
