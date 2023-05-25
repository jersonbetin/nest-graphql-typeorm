import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../entities/role.entity';
import { GenericService } from 'src/common/class/generic.service';
import { CreateRoleInput, UpdateRoleInput } from '../dtos/role-input.dto';

@Injectable()
export class RolesService
  implements GenericService<Role, number, CreateRoleInput, UpdateRoleInput>
{
  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) {}

  async create(data: CreateRoleInput): Promise<Role> {
    const { name } = data;
    const role = await this.roleRepo.findOneBy({ name });

    if (role)
      throw new ConflictException(`Role with name ${name} already exist!`);

    const newRole = await this.roleRepo.create(data);

    return this.roleRepo.save(newRole);
  }

  async update(id: number, data: UpdateRoleInput): Promise<Role> {
    const role = await this.findOne(id);

    await this.roleRepo.merge(role, data);

    return this.roleRepo.save(role);
  }

  async delete(id: number): Promise<boolean> {
    await this.findOne(id);

    try {
      await this.roleRepo.delete(id);

      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findAll(): Promise<Role[]> {
    Logger.error('aqui 22222');
    const a = await this.roleRepo.find();

    Logger.error('===>', a);
    return a;
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepo.findOneBy({ id });

    if (!role) throw new NotFoundException(`Role with id ${id} not found`);

    return role;
  }
}
