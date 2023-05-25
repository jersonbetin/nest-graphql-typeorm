import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { PersonalInformationInput } from '../dtos/user-input.dto';
import { Person } from '../entities/person.entity';

@Resolver((of) => User)
export class UserResolver {
  constructor(private _UserService: UsersService) {}

  @Query((returns) => [User])
  async getAllUsers(): Promise<User[] | null> {
    return this._UserService.findAll();
  }

  @Mutation((returns) => Person)
  async createUser(
    @Args('personalInformationInput') data: PersonalInformationInput,
  ): Promise<Person> {
    console.log(data);
    return this._UserService.createUserPersonalInformation(data);
  }
}
