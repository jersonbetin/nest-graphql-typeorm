import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './services/roles.service';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { Person } from './entities/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User, Person])],
  providers: [UsersService, RolesService],
  exports: [UsersService],
})
export class UsersModule {}
