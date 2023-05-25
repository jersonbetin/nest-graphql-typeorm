import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesService } from './services/roles.service';
import { UsersService } from './services/users.service';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { Person } from './entities/person.entity';
import { RoleResolver } from './resolvers/role.resolver';
import { UserResolver } from './resolvers/user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Person])],
  providers: [UsersService, RolesService, RoleResolver, UserResolver],
  exports: [UsersService, RolesService, RoleResolver],
})
export class UsersModule {}
