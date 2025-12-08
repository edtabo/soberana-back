import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { WarehouseByUserService } from './warehouse-by-user.service';

@Controller('warehouse-by-user')
export class WarehouseByUserController {
  constructor(private readonly warehouseByUserService: WarehouseByUserService) {}

  @Get()
  findAll(@Req() req: Request) {
    return this.warehouseByUserService.findAll(req);
  }
}
