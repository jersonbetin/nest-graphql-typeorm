import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, FindOptionsWhere } from 'typeorm';
import { hashSync } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { GenericService } from 'src/common/class/generic.service';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { Person } from '../entities/person.entity';
import {
  CreateUserInput,
  PersonalInformationInput,
  UpdateUserInput,
} from '../dtos/user-input.dto';

@Injectable()
export class UsersService
  implements GenericService<User, string, CreateUserInput, UpdateUserInput>
{
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Person) private personRepo: Repository<Person>,
  ) {}

  async create(data: CreateUserInput): Promise<User> {
    const { username, email, password, roleId } = data;
    const user = await this.userRepo.find({ where: [{ username }, { email }] });

    if (user.length > 0) {
      throw new ConflictException(
        `User with username ${username} or email ${email} already exist!`,
      );
    }
    const role = await this.roleRepo.findOneBy({ id: roleId });

    if (!role) {
      throw new ConflictException(`Role with id ${roleId} not found!`);
    }

    const newUser = await this.userRepo.create(data);

    const passwordHash = await hashSync(password, 10);
    newUser.password = passwordHash;
    newUser.id = uuidv4();
    newUser.role = role;

    return this.userRepo.save(newUser);
  }

  async update(id: string, data: UpdateUserInput): Promise<User> {
    const { username, email } = data;
    const where: FindOptionsWhere<User> = { id: Not(id) };

    if (username) where.username = username;
    if (email) where.email = email;

    const users = await this.userRepo.find({ where });
    if (!users.length) {
      throw new ConflictException(
        `User with username ${username} or email ${email} already exist!`,
      );
    }

    const user = await this.userRepo.findOneBy({ id });
    await this.userRepo.merge(user, data);

    return this.userRepo.save(user);
  }

  async delete(id: string): Promise<boolean> {
    await this.findOne(id);

    try {
      await this.userRepo.delete(id);

      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find({ relations: ['person', 'role'] });
  }

  async findOne(id: string): Promise<User> {
    const role = await this.userRepo.findOneBy({ id });

    if (!role) throw new NotFoundException(`Role with id ${id} not found`);

    return role;
  }

  async createUserPersonalInformation(
    data: PersonalInformationInput,
  ): Promise<Person> {
    const userSave = await this.create(data);
    const newPerson = new Person();
    newPerson.firstName = data.firstName;
    newPerson.lastName = data.lastName;
    newPerson.phone = data.phone;
    newPerson.address = data.address;

    const person = await this.personRepo.create(newPerson);
    person.user = userSave;

    return this.personRepo.save(person);
  }

  async findByUsername(username: string) {
    return this.userRepo.findOne({ where: { username }, relations: ['role'] });
  }
}
