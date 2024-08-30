import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/user.entity';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
