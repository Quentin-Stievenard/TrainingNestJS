import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/createRole.dto';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  getAllRoles(): Promise<Role[]> {
    return this.roleService.getAllRoles();
  }

  @Get(':id')
  getRoleById(@Param('id') id: number): Promise<Role> {
    return this.roleService.getRoleById(id);
  }

  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.createRole(createRoleDto.name);
  }

  @Delete(':id')
  removeRole(@Param('id') id: number): string {
    const success = this.roleService.removeRole(id);

    if (!success) {
      throw new NotFoundException(`Role ${id} not found`);
    }
    return 'Role deleted successfully';
  }
}
