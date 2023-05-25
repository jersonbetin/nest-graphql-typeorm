import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { PersonalInformationInput } from '../dtos/user-input.dto';
import { Person } from '../entities/person.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ROLES } from '../entities/role.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@Resolver((of) => User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLES.ADMIN)
export class UserResolver {
  constructor(private _UserService: UsersService) {}

  @Query((returns) => [User])
  async getAllUsers(): Promise<User[] | null> {
    return this._UserService.findAll();
  }

  @Public()
  @Mutation((returns) => Person)
  async createUser(
    @Args('personalInformationInput') data: PersonalInformationInput,
  ): Promise<Person> {
    return this._UserService.createUserPersonalInformation(data);
  }
}
