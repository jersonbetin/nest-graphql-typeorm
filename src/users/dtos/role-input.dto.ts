import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ROLES } from '../entities/role.entity';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @IsString()
  @IsNotEmpty()
  @IsEnum(ROLES)
  @Field()
  readonly name: ROLES;
}
@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {}
