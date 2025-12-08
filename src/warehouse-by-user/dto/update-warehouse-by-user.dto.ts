import { PartialType } from '@nestjs/mapped-types';
import { CreateWarehouseByUserDto } from './create-warehouse-by-user.dto';

export class UpdateWarehouseByUserDto extends PartialType(CreateWarehouseByUserDto) {}
