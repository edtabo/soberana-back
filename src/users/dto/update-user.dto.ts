import { IsString, IsNotEmpty, IsNumber, IsEnum, IsArray, IsOptional } from "class-validator";
import { Roles } from 'src/utils/enums/commons';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsNumber({}, { each: true })
  warehouses: number[];
}