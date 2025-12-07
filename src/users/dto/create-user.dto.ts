import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
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
  warehouses: number[];
}
