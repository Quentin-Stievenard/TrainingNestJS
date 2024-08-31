import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/role/role.entity';
import { User } from './user.entity';
import { In, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getAllUser(): Promise<User[]> {
    return this.userRepository.find({ relations: ['roles'] });
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(createUserDto);

    return this.userRepository.save(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }

    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    if (updateUserDto.roles) {
      const roles = await this.roleRepository.findByIds(updateUserDto.roles);
      user.roles = roles;
    }

    return this.userRepository.save(user);
  }

  async removeUser(id: number): Promise<void> {
    const user = await this.getUserById(id);

    await this.userRepository.remove(user);
  }
}
