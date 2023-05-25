import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class LoginResult {
  @Field(() => User)
  user: User;

  @Field(() => String)
  token: string;
}

@InputType()
export class LoginUserInput {
  @Field(() => String)
  @IsString()
  username: string;

  @Field(() => String)
  @IsString()
  password: string;
}
