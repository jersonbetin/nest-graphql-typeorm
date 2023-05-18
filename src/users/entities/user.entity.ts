import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

import { EntityBase } from 'src/common/class/base.entity';
import { Role } from './role.entity';
import { Person } from './person.entity';

@Entity({ name: 'users' })
@ObjectType()
export class User extends EntityBase {
  @PrimaryColumn()
  @Field()
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Field()
  username: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  @Field()
  password: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Field()
  email: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  @Field(() => Role)
  role: Role;

  @OneToOne(() => Person, (person) => person.user)
  @Field(() => Person)
  person: Person;
}
