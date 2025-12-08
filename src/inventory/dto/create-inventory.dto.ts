import { IsNotEmpty, IsNumber, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductInventoryDto {
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @IsNumber()
  @IsNotEmpty()
  quantity_in_packaging_units: number;

  @IsNumber()
  @IsNotEmpty()
  quantity_in_units: number;
}

export class CreateInventoryDto {
  @IsNumber()
  @IsNotEmpty()
  warehouse_id: number;

  @IsString()
  @IsNotEmpty()
  cutoff_date: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductInventoryDto)
  products: ProductInventoryDto[];
}