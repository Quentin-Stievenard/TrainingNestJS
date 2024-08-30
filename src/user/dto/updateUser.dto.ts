import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { Role } from 'src/role/role.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEmail()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  roles?: Role[];
}
