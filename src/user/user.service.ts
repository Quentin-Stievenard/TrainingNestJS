import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/role/role.entity';
import { User } from './user.entity';
import { Repository } from 'typeorm';

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

  getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }
}
