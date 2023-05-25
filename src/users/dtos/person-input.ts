import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreatePersonInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  readonly firstName: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  readonly phone: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  readonly address: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  @Field({ nullable: true })
  readonly userId: string;
}
@InputType()
export class UpdatePersonInput extends PartialType(CreatePersonInput) {}
