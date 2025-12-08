import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto, @Req() req: Request) {
    return this.inventoryService.create(createInventoryDto, req);
  }

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.inventoryService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateInventoryDto: UpdateInventoryDto,
  // ) {
  //   return this.inventoryService.update(+id, updateInventoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.inventoryService.remove(+id);
  // }
}
