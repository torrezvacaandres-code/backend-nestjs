import { Module } from '@nestjs/common';
import { ItemsMenuService } from './items-menu.service';
import { ItemsMenuController } from './items-menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsMenu } from '../../entities/itemsMenu';

@Module({
  imports: [TypeOrmModule.forFeature([ItemsMenu])],
  controllers: [ItemsMenuController],
  providers: [ItemsMenuService],
})
export class ItemsMenuModule {}
