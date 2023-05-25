import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { RolesService } from '../services/roles.service';
import { ROLES, Role } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleInput } from '../dtos/role-input.dto';
import { ResponseMessage } from 'src/common/commons.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Resolver((of) => Role)
@Roles(ROLES.ADMIN)
@UseGuards(RolesGuard)
export class RoleResolver {
  constructor(
    private roleService: RolesService,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
  ) {}

  @ResponseMessage('Roles consultados con exito')
  @Query((returns) => [Role])
  async getAllRoles(): Promise<Role[] | null> {
    return await this.roleRepo.find();
  }
  @Query((returns) => Role)
  async getRoleById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Role | null> {
    return await this.roleService.findOne(id);
  }

  @Mutation((returns) => Role)
  async createRole(
    @Args('roleInput') roleInput: CreateRoleInput,
  ): Promise<Role> {
    return await this.roleService.create(roleInput);
  }
}
