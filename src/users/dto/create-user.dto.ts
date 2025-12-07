import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { Roles } from 'src/utils/enums/commons';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @Transform(({ value }) => {
    if (value === null || value === undefined) return value;
    return Array.isArray(value) ? value : [value];
  })
  warehouses?: number[];
}
