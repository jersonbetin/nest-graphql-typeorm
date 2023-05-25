import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { EntityBase } from 'src/common/class/base.entity';
import { User } from './user.entity';

@Entity({ name: 'persons' })
@ObjectType()
export class Person extends EntityBase {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Field({ nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Field({ nullable: true })
  address?: string;

  @OneToOne(() => User, (user) => user.person, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  @Field(() => User)
  user: User;
}
