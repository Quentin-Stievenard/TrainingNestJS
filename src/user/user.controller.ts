import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RoleService } from 'src/role/role.service';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
  ) {}

  @Get()
  getAllUser(): Promise<User[]> {
    return this.userService.getAllUser();
  }

  @Get(':id')
  getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  removeUser(@Param('id') id: number): string {
    const success = this.userService.removeUser(id);
    if (!success) {
      throw new NotFoundException('User not found');
    }

    return 'User deleted successfully';
  }
}
