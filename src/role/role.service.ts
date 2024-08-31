import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/createRole.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  getAllRoles(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  getRoleById(id: number): Promise<Role> {
    return this.roleRepository.findOne({ where: { id } });
  }

  async createRole(name: string): Promise<Role> {
    const role = await this.roleRepository.create({ name });

    return this.roleRepository.save(role);
  }

  async removeRole(id: number): Promise<void> {
    const role = await this.getRoleById(id);

    await this.roleRepository.remove(role);
  }
}
