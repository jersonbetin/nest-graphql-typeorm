import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { User } from './user.entity';
import { EntityBase } from 'src/common/class/base.entity';

export enum ROLES {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

@ObjectType()
@Entity({ name: 'roles' })
export class Role extends EntityBase {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ type: 'enum', unique: true, enum: ROLES })
  @Field()
  name: ROLES;

  @OneToMany(() => User, (user) => user.role)
  @Field(() => [User])
  users: User[];
}
