import {
  Field,
  InputType,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsPositive, IsString } from 'class-validator';

import { CreatePersonInput } from './person-input';
@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  readonly password: string;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  readonly email: string;

  @IsNotEmpty()
  @IsPositive()
  @Field()
  readonly roleId: number;
}
@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {}
@InputType()
export class PersonalInformationInput extends IntersectionType(
  CreateUserInput,
  CreatePersonInput,
) {}
